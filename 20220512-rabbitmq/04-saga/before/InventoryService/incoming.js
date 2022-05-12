var amqp = require('amqplib');
const { RabbitMQ } = require('./reconnecting_rabbit');
const { RABBITMQ_URL } = process.env;

exports.start = async function start() {
  const rabbit = new RabbitMQ(RABBITMQ_URL);
  rabbit.addMessageHandler('payments->inventory', (channel, msg) => {
    console.log(`Received message: "${msg.content.toString()}"`);
    handlePaymentReceived(channel, msg);
    channel.ack(msg);
  });

  rabbit.addMessageHandler('inventory-abort', (channel, msg) => {
    console.log(`Received Error message: "${msg.content.toString()}"`);
    abort(msg);
    channel.ack(msg);
  });

  await rabbit.init();
}

function handlePaymentReceived(channel, msg) {
  console.log(`Creating invoice for payment`);
  console.log(msg.properties);
  const correlationId = msg.properties.correlationId;
  // Try to send book to client and save [shipment_id, correlation_id] in database

  if (Math.random() > 0.5) {
    // Success
    channel.publish('payments', 'inventory->payments', msg.content, { correlationId });
  } else {
    // Error - cancel the transaction
    channel.publish('payments', 'abort', msg.content, { correlationId });
  }
}

function abort(message) {
  const { correlationId } = message.properties;
  console.log(`Aborting shipment ${correlationId}`);
}
