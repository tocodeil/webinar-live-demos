var amqp = require('amqplib');
const { RabbitMQ } = require('./reconnecting_rabbit');
const { RABBITMQ_URL } = process.env;
const { userBuysBook } = require('./lib/inventory');


exports.start = async function start() {
  const rabbit = new RabbitMQ(RABBITMQ_URL);
  rabbit.addMessageHandler('inventory', (channel, msg) => {
    console.log(`Received message: "${msg.content.toString()}"`);
    const data = JSON.parse(msg.content.toString());
    const { type, payload } = data;
    // console.log(data);
    userBuysBook(payload.user);
    channel.ack(msg);
  });

  await rabbit.init();
}
