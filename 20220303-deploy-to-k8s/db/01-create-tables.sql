CREATE TABLE messages(
  id serial primary key,
  reporter text,
  text text
);

INSERT INTO messages(reporter, text) VALUES ('ynon', 'Hello World');
