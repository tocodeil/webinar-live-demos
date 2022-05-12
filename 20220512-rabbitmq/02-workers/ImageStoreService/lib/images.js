const { v4: uuid } = require('uuid');

const images = [];

exports.addImage = function(info) {
  const img = { id: uuid(), name: info.originalname, sourceFile: info.path, status: 'NEW' };
  images.push(img);
  return img;
}

exports.update = function(id, info) {
  const img = images.find(i => i.id === id);
  Object.assign(img, info);
}

exports.all = function() {
  return images;
}
