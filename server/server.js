const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const { typeDefs, resolvers } = require('./Schemas');
const db = require('./config/connection');
const routes = require('./routes');
const auth = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
}

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});

startApolloServer();

// const express = require('express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');
// const { authMiddleware } = require('./utils/auth');
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const { typeDefs, resolvers } = require('./Schemas');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });

// server.applyMiddleware({ app });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); 

// const buildPath = path.join(__dirname, '../client/dist');
// app.use(express.static(buildPath));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/dist')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });

// function startServer() {
//   app.listen(PORT, () => {
//     console.log(`🌍 Now listening on localhost:${PORT}`);
//     console.log(`GraphQL found at http://localhost:${PORT}/graphql`)
//   });
// }

// db.once('open', startServer);

// startApolloServer();