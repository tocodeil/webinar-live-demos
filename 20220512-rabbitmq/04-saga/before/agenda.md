# Distributed Transaction Example - User Buys A Book

[ ] Architecture
  - What Is Distributed Transaction
  - Queues:
    1. `payments->inventory`
    2. `inventory->payments`
    3. `payments->customers`
    4. `payments-abort`
    5. `inventory-abort`
    6. `customers-abort`

[ ] RabbitMQ and Sagas
  - each service has 2 queues
  - abort message is sent to all abort queues
  - normal flow message is sent to its "next" queue
  - correlation id

[ ] Saga Walk Through
  - when everything works
  - when needs to cancel

[ ] Code Review: Payments Service
  - file: `routes/index.js`
  - note the added correlationId param

[ ] Code Review: Inventory Service
  - file: `incoming.js`
  - listening to both queues (normal + abort)

[ ] Code Review: Payments Service
  - file: `incoming.js`
  - listening to both queues (normal + abort)

[ ] Code Review: Customer Service
  - file: `incoming.js`
  - listening to both queues (normal + abort)

[ ] Live: Buying some books

[ ] Downsides of distributed transactions
