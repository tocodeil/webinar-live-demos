Hi ;)

Welcome To RabbitMQ Webinar

I'm Ynon Perek

We Start at 10:00

















Agenda-

[x] Communication between services and the importance of a Message Queue
  - Service1
  - Service2 
  - Service3

  - Sync
  - Async
  
  - A Message Queue is how we pass message async
  -
  -

[x] RabbitMQ Basic Concepts
  - Channel
  - Exchange
  - Queue
  - Routing Key
  - Message

[x] Q: What happens when multiple clients listen to the same queue?

[x] Q: How do we send the same message to multiple clients?

--- 

[ ] Demo 1 - Producer Consumer that create their own queues

[ ] Demo 2 - Creating queues and binding keys
$ docker run --rm -p 5672:5672 -p 15672:15672 rabbitmq:3-management

[ ] Exchange Types:
https://medium.com/trendyol-tech/rabbitmq-exchange-types-d7e1f51ec825

[ ] Q: What are the advantages of pre-defining queues and exchanges?



[ ] Pattern 1 - Main Service with Workers

[ ] Pattern 2 - Events

[ ] Pattern 3 - Sagas

