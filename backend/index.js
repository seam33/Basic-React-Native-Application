// Configure Env variables
require("dotenv").config();

// Express Variables
const express = require("express");
const app = express();
const PORT = process.env.PORT;

// Mongo Variables
const mongoose = require("mongoose");
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_URL = `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0-shard-00-00.vr4k8.mongodb.net:27017,cluster0-shard-00-01.vr4k8.mongodb.net:27017,cluster0-shard-00-02.vr4k8.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-zo8zl0-shard-0&authSource=admin&retryWrites=true&w=majority`;

// Models
require('./models/user')

// Server
const authRoutes = require('./routes/authRoutes')
app.use(express.json());
app.use(authRoutes)

app.listen(PORT, () => {
  console.log(`Server started ${PORT}`);
});

// Database Connection
mongoose
   .connect(MONGO_URL, {
     useNewUrlParser: true,
     useCreateIndex: true, 
     useUnifiedTopology: true,
   })
   .then(() => console.log("Successful Mongo database connection"))
   .catch((err) => console.log("Mongo database connection error " + err));
