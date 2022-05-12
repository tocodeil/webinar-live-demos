var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/ipn', function(req, res) {
  try {
    const { channel } = req.locals;
    const data = { type: 'PaymentReceived', payload: req.query };
    channel.publish('payments', 'payment-received', Buffer.from(JSON.stringify(data), 'utf8'));
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;

