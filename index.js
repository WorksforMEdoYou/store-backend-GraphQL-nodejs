const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/storeDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// GraphQL Endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enables GraphiQL interface
}));

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});
