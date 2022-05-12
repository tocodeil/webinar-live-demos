const users = [];

exports.createCustomerCard = function(username) {
  console.log(`Creating a customer card for ${username}`);
  users.push(username);
}

exports.getUsers = function() {
  return users;
}
