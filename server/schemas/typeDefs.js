const typeDefs = `

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        // saveBook [Accepts a book author's array, description, title, bookId, image, and link as parameters]: User
        removeBook(bookID:ID!): User
    }

    type User {
        _id:ID
        username: String
        // bookCount
        savedBooks([Books])
    }
    
    type Book {
        // bookId book's id value returned from Google's Book API
        authors([String])
        description(String)
        title(String!)
        image:
        link(String): 
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;