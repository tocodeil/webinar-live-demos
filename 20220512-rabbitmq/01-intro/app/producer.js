const amqp = require('amqplib');
const process = require('process');
const bindingKey = 'message';

// here amqp is the protocol, and rabbitmq is the service name
// (as defined in docker-compose.yml)
async function main(messageText) {
  // 1. Connect
  const connection = await amqp.connect('amqp://rabbitmq');

  // 2. Create a channel
  const channel = await connection.createChannel();

  // 3. Verify exchange and queue exist
  const { exchange } = await channel.assertExchange('notifications', 'direct');
  const { queue } = await channel.assertQueue('q1', { durable: false });

  // 4. Bind the queue with a binding key "message",
  //    So every message with this key will end up on this queue
  console.log(`Binding queue ${queue} in exchange ${exchange} to key ${bindingKey}`);
  await channel.bindQueue(queue, exchange, bindingKey);

  // 5. And finally send you message to the exchange
  console.log(`Sending: ${messageText} to ${exchange}`);
  channel.publish(exchange, bindingKey, Buffer.from(messageText, "utf-8"));

  // 6. We can't exit immediately, because that would be too soon and our message
  //    won't reach the queue, so I set a timeout to exit 0.2 second after sending the message
  setTimeout(function() {
    connection.close();
  }, 200);
}

const messageText = process.argv.slice(2).join(' ');

if (messageText.length > 0) {
  main(messageText);
}
