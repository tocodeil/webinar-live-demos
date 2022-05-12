# Events Example - User Buys A Book

In this example we'll use the following micro services:

1. InventoryService - to manage the number of books in the warehouse, and send books to clients


2. PaymentService - to record all incoming payments and issue invoices


3. CustomerService - to store data about our customers


All services use mock implementations, and we'll focus on the architecture and their connection using RabbitMQ


## Payment Service
Entrance to the system. When a user finishes to buy a book here:
https://secure.cardcom.solutions/e/xwC8

Deal details are sent to the Payment Service, and in turn it creates an event about a new transaction



## Inventory Service
Listens to purchase events.

When triggered, checks if we have enough books in stock and send a book to the user



## Customer Service
Listens to purchase events.

When triggered, checks if the user is already in the DB, if yes then will update the DB with the new purchase; if not create a new customer card




