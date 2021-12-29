var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const { db } = res.locals;
  const items = await db.collection("items").find({}).toArray();
  res.send(items);
});

router.post('/', async function(req, res, next) {
  const item = req.body;
  const { db } = res.locals;
  await db.collection('items').insert(item);
  res.sendStatus(201);
});

module.exports = router;
