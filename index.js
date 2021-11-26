const express = require("express");
const cors = require("cors")
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;

const app = express();
require('dotenv').config()

const port = process.env.PORT || 5000;

//use middlewair
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.agzd1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const run = async () => {
    try {
        await client.connect();
       const database = client.db("travel");
       const userCollection = database.collection("user");
       const userDetalse = database.collection("detalse")

       //GET API
       app.get("/user", async (req,res)=>{
           const cursor = userCollection.find({});
           const result = await cursor.toArray();
           res.send(result)

       })

       app.get("/user/:id", async(req,res)=>{
           const id = req.params.id;
           const query = {_id:ObjectId(id)};
           const result = await userCollection.findOne(query)
           console.log(result)
           res.send(result)
       })

       app.get("/detalse", async(req,res)=>{
            const cursor = userDetalse.find({});
            const result = await cursor.toArray();
            res.send(result)
       })

       //POST API
       app.post("/user", async(req,res)=>{
          const newUser = req.body;
          const result = await userCollection.insertOne(newUser)
          console.log(result)
          res.json(result)

       })

       app.post("/detalse", async(req,res)=>{
           const user = req.body;
           const result = await userDetalse.insertOne(user)
           console.log(result)
           res.json(result)
       })


       //DELETE API
       app.delete("/detalse/:id",async(req,res)=>{
           const id = req.params.id;
           const query = {_id:ObjectId(id)};
           const result = await userDetalse.deleteOne(query);
           console.log(result);
           res.json(result)

       })




    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir)



app.get("/", (req, res) => {
    res.send("hello word");
})

app.listen(port, () => {
    console.log(`server is raning on the port is ${port}`)
})




