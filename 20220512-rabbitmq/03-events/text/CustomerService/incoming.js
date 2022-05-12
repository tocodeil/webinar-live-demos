var amqp = require('amqplib');
const { RabbitMQ } = require('./reconnecting_rabbit');
const { RABBITMQ_URL } = process.env;
const { createCustomerCard } = require('./lib/users');

exports.start = async function start() {
  const rabbit = new RabbitMQ(RABBITMQ_URL);
  rabbit.addMessageHandler('customers', (channel, msg) => {
    console.log(`Received message: "${msg.content.toString()}"`);
    const data = JSON.parse(msg.content.toString());
    const { type, payload } = data;
    console.log(data);
    createCustomerCard(payload.user);
    channel.ack(msg);
  });

  await rabbit.init();
}
