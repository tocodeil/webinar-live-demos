# Events Example - User Buys A Book

[ ] Architecture
  - Payments Gateway (external): https://secure.cardcom.solutions/e/xwC8
  - Payments Service
  - Inventory Service
  - Customers Service
  - Message Queue
  - Gateway

[ ] Create queue definitions
  - a queue per consumer
  - one fanout exchange

[ ] Fix PaymentService
  - rabbitmq channel middleware
  - publish message when IPN is received

[ ] Fix CustomersService
  - new file `incoming.js` that listens to its queue
  - add user details to customers DB on incoming messages

[ ] Fix InventoryService
  - new file `incoming.js` that listens to its queue
  - send the book on incoming messages






















## Useful Snippets

1. incoming.js (for CustomerService and InventoryService)

```
// incoming.js

var amqp = require('amqplib');
const { RabbitMQ } = require('./reconnecting_rabbit');
const { RABBITMQ_URL } = process.env;

exports.start = async function start() {
  const rabbit = new RabbitMQ(RABBITMQ_URL);
  rabbit.addMessageHandler('QUEUE_NAME', (channel, msg) => {
    console.log(`Received message: "${msg.content.toString()}"`);
    const data = JSON.parse(msg.content.toString());
    const { type, payload } = data;
    console.log(data);
    
    // HANDLE INCOMING MESSAGE
    channel.ack(msg);
  });

  await rabbit.init();
}

```

2. RabbitMQ Middleware (for Payments Service)

```
  app.use(async function(req, _res, next) {
    try {
      // Fetches the active connection or re-connect
      const connection = rabbit.connection;
      const channel = await connection.createChannel();
      req.locals = req.locals || {};
      req.locals.channel = channel;
      return next();
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });
```


3. Payments Service /ipn route:

```
const { channel } = req.locals;
const data = { type: 'PaymentReceived', payload: req.query };
channel.publish(
    'payments',
    'payment-received',
     Buffer.from(JSON.stringify(data), 'utf8'));
```
