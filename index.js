const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://cardb:myePZMXJPJUbgyFo@cluster0.8dssgfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uri = "mongodb+srv://<username>:<password>@cluster0.8dssgfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
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

const servicecollection =client.db('cardoctor').collection('service')


  app.get('/service',async(req,res)=>{
    const cursor = servicecollection.find();
    const result =await cursor.toArray();
    res.send(result)

   app.patch('/service/:id', async(req,res)=>{
    const id = req.params.id
    const filter = {_id : new ObjectId(id)}
    const update = req.body
    const updatedec ={
      $set:{
         status :update.status
      }
    }
  const result = await servicecollection.updateOne(filter,updatedec)
  res.send(result) 
  })

   
  })
  app.delete('/service/:id', async(req,res)=>{
    const id = req.params.id 
    const query = {_id: new ObjectId(id)}
    const result= servicecollection.deleteOne(query)
    res.send(result)
  })

  app.post('/update', async(req, res)=>{
    const update = req.body 
    const result = await servicecollection.insertOne(update);
   res.send(result)
  })

  
   

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})