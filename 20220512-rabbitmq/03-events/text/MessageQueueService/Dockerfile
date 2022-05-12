FROM rabbitmq:3.9.4

COPY 20-load-my-definitions.conf /etc/rabbitmq/conf.d/
COPY definitions.json /etc/rabbitmq/

RUN chown rabbitmq:rabbitmq /etc/rabbitmq/definitions.json

