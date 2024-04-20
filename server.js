// server.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { readFileSync } = require('fs');
const resolvers = require('./resolvers');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/graphql-mongoose-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Load GraphQL schema
const typeDefs = readFileSync('./schema.graphql', 'utf-8');
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
