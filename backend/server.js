const express = require("express");
const {MongoClient} = require("mongodb");

const app = express();

const url = "mongodb://db:27017";
const client =new MongoClient(url);

let database;

async function connectDB() {
  await client.connect();
  database = client.db("appdb");
  console.log("Connected to MondoDB");
}
connectDB();

app.get("/", (req, res) => {
 res.send("Backend API running with MongoDB");
});

app.get("/data", async (req, res) => {
 const collection =database.collection("test");
 await collection.insertOne({ message: "Hello from MongoDB"});
 const data = await collection.find().toArray();res.json(data);
});

app.listen(3000, () =>{
 console.log("Server running on port 3000");
});