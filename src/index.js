
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/User');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;

require('dotenv').config();

const db_uri = process.env.DB_URI;

if (process.env.DEV === "production"){
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(db_uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
}
 
// Connect to MongoDB Atlas
mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB ');
        
        
    })
    .catch(error => console.error('Error connecting to MongoDB Atlas:', error));

// Define routes and middleware  
 const authRoutes = require('./routes/authRoutes');
 const formRoutes = require('./routes/formRoutes');
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes); // Authentication routes
app.use('/form', formRoutes)
// Error handler middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error in middlewares section' });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
