var users = require('../data/users');
var books = require('../data/books');
var loans = require('../data/loans');

module.exports = {
  Query: {
    books(_obj, args, context, _queryInfo) {
      // now context.foo === 10
      const { minRating=0 } = args;
      return books.filter(b => b.rating >= minRating);
    },
    users(_obj, args, _context, _queryInfo) {
      return users;
    },
    loans() {
      return loans;
    }
  },
  Loan: {
    book(theLoan, args, _context, _queryInfo) {
      console.log(theLoan);
      return books.find(b => Number(b.id) === Number(theLoan.bookId));
    }
  },
};

