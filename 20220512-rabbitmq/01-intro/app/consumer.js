const amqp = require('amqplib');

// here amqp is the protocol, and rabbitmq is the service name
// (as defined in docker-compose.yml)
async function main() {
  // Connect and start a session
  const connection = await amqp.connect('amqp://rabbitmq');
  const channel = await connection.createChannel();

  // Verify exchange and queue exist
  const { queue } = await channel.assertQueue('q1', { durable: false });

  // Consumer tag is the subscription id, and is used to cancel the subscription
  const { consumerTag } = await channel.consume(queue, function(message) {
    const messageText = message.content.toString('utf-8');
    console.log(messageText);
    channel.ack(message);
  });

  console.log(`Listening with ${consumerTag}`);
}


main();

