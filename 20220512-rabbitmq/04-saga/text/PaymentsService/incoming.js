var amqp = require('amqplib');
const { RabbitMQ } = require('./reconnecting_rabbit');
const { RABBITMQ_URL } = process.env;

exports.start = async function start() {
  const rabbit = new RabbitMQ(RABBITMQ_URL);
  rabbit.addMessageHandler('inventory->payments', (channel, msg) => {
    console.log(`Received message: "${msg.content.toString()}"`);
    handleItemShipped(channel, msg);
    channel.ack(msg);
  });

  rabbit.addMessageHandler('payments-abort', (channel, msg) => {
    console.log(`Received Error message: "${msg.content.toString()}"`);
    abort(msg);
    channel.ack(msg);
  });

  await rabbit.init();
}

function handleItemShipped(channel, msg) {
  console.log(`Creating invoice for payment`);
  const correlationId = msg.properties.correlationId;

  // Try to pull the money from the Payments Provider and issue an invoice

  if (Math.random() > 0.5) {
    // Success
    channel.publish('payments', 'payments->customers', msg.content, { correlationId });
  } else {
    // Error - cancel the transaction
    channel.publish('payments', 'abort', msg.content, { correlationId });
  }
}

function abort(message) {
  const { correlationId } = message.properties;
  console.log(`Refunding payment ${correlationId}`);
}
