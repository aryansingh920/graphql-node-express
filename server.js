// server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
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

// Create an instance of ApolloServer
const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    introspection: true,
    playground: true,
});

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app });
}

app.get('/', (req, res) => {
    res.send('Welcome to GraphQL server');
});

startApolloServer().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
