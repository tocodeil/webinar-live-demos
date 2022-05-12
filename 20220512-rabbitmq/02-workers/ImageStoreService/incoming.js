var amqp = require('amqplib');

const { RabbitMQ } = require('./reconnecting_rabbit');
const { RABBITMQ_URL } = process.env;
const images = require('./lib/images');

exports.start = async function start() {
  const rabbit = new RabbitMQ(RABBITMQ_URL);
  rabbit.addMessageHandler('images-updates', (channel, msg) => {
    console.log(`Received message: "${msg.content.toString()}"`);
    const message = JSON.parse(msg.content.toString());
    const correlationId = msg.properties.correlationId;

    images.update(
      correlationId,
      {
        status: `${message.status} by ${message.worker}`,
        ...(message.name && { url: `/images/${message.name}` }),
      });
    channel.ack(msg);
  });

  await rabbit.init();
}

