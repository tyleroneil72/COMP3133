const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

dotenv.config();

const mongodb_atlas_url = process.env.MONGODB_URL;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_atlas_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
  }
};

// Create Express App
const app = express();
app.use(express.json());
app.use(cors());

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || 4000 }, async () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT || 4000}${
        server.graphqlPath
      }`
    );
    await connectDB();
  });
}

startServer();
