var amqp = require('amqplib');
var waitOn = require('wait-on');

function convertRabbitMQUrlToWaitOnUrl(url) {
  // rabbitmq has a url that looks like:
  // amqp://tocode:10203040@rabbit
  // But waitOn expects a more explicit url for the form "tcp:host:port"

  const match = url.match(/amqp:\/\/\w+:\w+@([\w.]+)/);
  if (!match) {
    throw new Error(`Invalid RabbitMQ URL ${url}`);
  }
  
  return `tcp:${match[1]}:5672`;
}

function sleep(ms) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

exports.RabbitMQ = class RabbitMQ {
  constructor(url) {
    this.url = url;
    this.messageHandlers = [];
  }

  async init() {
    while (true) {
      try {
        await waitOn({
          resources: [convertRabbitMQUrlToWaitOnUrl(this.url)],
        });
        this.connection = await amqp.connect(this.url);
        this.connection.on('close', () => {
          console.log('Connection closed, reconnecting in 1 second');
          this.init();
        });
        break;
      } catch (err) {
        console.log('Connection failed, retrying in 1 second');
        console.log(err);
        await sleep(1000);
      }
    }
    console.log('Connected!');
    const channel = await this.connection.createChannel();
    this.messageHandlers.forEach(({ queue, callback }) => {
      console.log(`Consuming ${queue}`);
      channel.consume(queue, callback.bind(null, channel));
    });

    return this.connection;
  }

  addMessageHandler(queue, callback) {
    this.messageHandlers.push({ queue, callback });
  }
};


