var express = require('express');
var router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const images = require('../lib/images');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(images.all());
  res.render('index', { title: 'Express', images: images.all() });
});

router.post('/', upload.array('photos'), function(req, res, next) {
  const { channel } = req.locals;

  for (const info of req.files) {
    const image = images.addImage(info);
    channel.publish(
      '',
      'new-image',
      Buffer.from(JSON.stringify(image), 'utf8'),
      { correlationId: image.id, expiration: '60000' },
    );
  }

  res.render('index', { title: 'Express', images: images.all() });
});

module.exports = router;
