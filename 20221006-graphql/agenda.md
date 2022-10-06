# GraphQL Webinar

1. What's Wrong with REST ?

2. GraphQL In Action - Github API Demo

3. Converting a REST API to GraphQL App

4. Optimizations

5. Q & A













## Code Snippets

Github Query #1

```
query {
    user(login: "ynonp") {
	    name
	    location
    }
}
```

Github Query #2

```
query {
    user(login: "ynonp") {
	    name
	    location
    	url
    	websiteUrl
    }
}
```

Github Query #3

```
query {
  user(login: "ynonp") {
    name
    location
    url
    websiteUrl
    repositories(first: 10) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      totalCount
      nodes {
        name
      }
    }
  }
}
```


graphql/schema.graphql

```
module.exports = `
type Query {
    books(minRating: Float=0): [Book]
    loans: [Loan]
    users: [User]
    book(id: Int): Book
}

type Book {
    id: Int
    title: String
    by: String
    rating: Float
}

type User {
  id: Int
  name: String
  email: String
}

type Loan {
  id: Int
  user: User
  book: Book
}
`;
```

graphql/resolver.js

```
var users = require('../data/users');
var books = require('../data/books');
var loans = require('../data/loans');

module.exports = {
  Query: {
    books(_obj, args, _context, _queryInfo) {
      const { minRating } = args;
      return books.filter(b => b.rating >= minRating);
    },
    book(_obj, args, _context) {
      const { id } = args;
      return books.find(b => Number(b.id) === Number(id));
    },
    users(_obj, _args, _context, _queryInfo) {
      return users;
    },
    loans(_obj, _args, _context, queryInfo) {
      // console.log(JSON.stringify(queryInfo.fieldNodes[0].selectionSet, null, 2));
      return loans;
    }
  },
  Loan: {
    user(obj, _args, _context, _queryInfo) {
      console.log(obj);
      return users.find(u => Number(u.id) === Number(obj.userId));
    },
    book(obj, _args, _context, _queryInfo) {
      console.log(obj);
      return books.find(b => Number(b.id) === Number(obj.bookId));
    },
  },
};


```


