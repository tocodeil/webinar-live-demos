
const url = process.env.DB_URL;
const dbname = process.env.DB_NAME;
var MongoClient = require('mongodb').MongoClient;

exports.resetItems = async function(items) {
  const client = await MongoClient.connect(url);
  const db = client.db(dbname);
  await db.collection('items').remove();
  await db.collection('items').insertMany(items);
  await client.close();
}

