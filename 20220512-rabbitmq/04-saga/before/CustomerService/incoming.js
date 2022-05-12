var amqp = require('amqplib');
const { RabbitMQ } = require('./reconnecting_rabbit');
const { RABBITMQ_URL } = process.env;

exports.start = async function start() {
  const rabbit = new RabbitMQ(RABBITMQ_URL);
  rabbit.addMessageHandler('payments->customers', (channel, msg) => {
    console.log(`Received message: "${msg.content.toString()}"`);
    handleInvoiceIssued(channel, msg);
    channel.ack(msg);
  });

  rabbit.addMessageHandler('customers-abort', (channel, msg) => {
    console.log(`Received Error message: "${msg.content.toString()}"`);
    abort(msg);
    channel.ack(msg);
  });

  await rabbit.init();
}

function handleInvoiceIssued(channel, msg) {
  console.log(`Creating customer card for the buyer`);
  const correlationId = msg.properties.correlationId;

  // Try to create a new Customer Card for the buyer

  if (Math.random() > 0.5) {
    // Success
    console.log('Success. Transaction done');
  } else {
    // Error - cancel the transaction
    channel.publish('payments', 'abort', msg.content, { correlationId });
  }
}

function abort(message) {
  const { correlationId } = message.properties;
  console.log(`Deleting customer card for ${correlationId}`);
}
