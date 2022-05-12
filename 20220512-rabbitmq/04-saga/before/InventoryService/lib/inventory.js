let remainingBooksCount = 50;
let activeOrders = [];

exports.userBuysBook = function userBuysBook(userName) {
  if (remainingBooksCount <= 0) {
    throw new Error('Not enough books in stock');
  }

  activeOrders.push({ user: userName, status: 'PROCESSING' });
  remainingBooksCount--;
}

exports.getActiveOrders = function getActiveOrders() {
  return activeOrders;
}

exports.getRemainingBooksCount = function getRemainingBooksCount() {
  return remainingBooksCount;
}
