var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

/* GET home page. */
router.all('/ipn', function(req, res) {
  try {
    const { channel } = req.locals;
    const data = { type: 'PaymentReceived', payload: req.query };
    channel.publish(
      'payments',
      'payments->inventory',
      Buffer.from(JSON.stringify(data), 'utf8'),
      { correlationId: uuidv4() }
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;

