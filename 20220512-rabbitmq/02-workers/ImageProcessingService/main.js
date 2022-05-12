var amqp = require('amqplib');
var hostname = process.env.HOSTNAME;
var Jimp = require('jimp');

const { RabbitMQ } = require('./reconnecting_rabbit');
const { RABBITMQ_URL } = process.env;

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function handleImage(channel, imageInfo) {
  if (Math.random() < 0.4) {
    throw new Error('Boom');
  }
  
  channel.publish(
    '',
    'images-updates', 
    Buffer.from(JSON.stringify({ status: 'PROCESSING', worker: hostname, name: imageInfo.name }), 'utf8'),
    { correlationId: imageInfo.id }
  );

  await sleep(Math.floor(Math.random() * 5000));


  Jimp.read(imageInfo.sourceFile, (err, image) => {
    if (err) throw err;
    image
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write(`./images/${imageInfo.name}`); // save
  });

  channel.publish(
    '',
    'images-updates', 
    Buffer.from(JSON.stringify({ status: 'READY', worker: hostname }), 'utf8'),
    { correlationId: imageInfo.id }
  );
}

async function start() {
  const rabbit = new RabbitMQ(RABBITMQ_URL);
  rabbit.addMessageHandler('new-image', async (channel, msg) => {
    console.log(`Received message: "${msg.content.toString()}"`);
    const imageInfo = JSON.parse(msg.content.toString());
    await handleImage(channel, imageInfo);
    channel.ack(msg);
  });

  await rabbit.init();
}

start();
