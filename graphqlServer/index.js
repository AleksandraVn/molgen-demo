const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
    type Book {
        id: ID!
        title: String!
        authors: [Author]!
    }

    type Author {
        id: ID!
        name: String!
    }

    input BookInput {
        title: String!
        authorId: ID!
    }

    type Query {
        getAllBooks: [Book]!
        getBookById(id: String!): Book
    }

    type Mutation {
        createBook(book: BookInput!): Book,
        updateBook(book: BookInput!, id: ID!): Book
    }
`;

const books = [
    {
        id: 1,
        title: 'Clean Code',
        authors: [
            {
                id: 1,
                name: 'Robert C. Martin '
            },
        ]
    },
    {
        id: 2,
        title: 'The Pragmatic Programmer: Your Journey to Mastery',
        authors: [
            {
                id: 2,
                name: 'Andrew Hunt'
            },
            {
                id: 3,
                name: 'David Thomas'
            }
        ]
    },
    {
        id: 3,
        title: 'The Art of Computer Programming',
        authors: [
            {
                id: 4,
                name: 'Donald Knuth'
            },
        ]
    },
    {
        id: 3,
        title: 'Refactoring: Improving the Design of Existing Code ',
        authors: [
            {
                id: 5,
                name: 'Martin Fowler'
            },
        ]
    }
];

const resolvers = {
    Query: {
        getAllBooks: () => books,
        getBookById: async (_, {id}) => {
            return books[0];
        }
    },
    Mutation: {
        createBook: async (_, {book}) => {
            console.log("Create");
        },
        updateBook: async (_, {book, id}) => {
            console.log("Update");
        },
    }
};
const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
