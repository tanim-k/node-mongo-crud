// username:  mongobongo1
// pass:   MZk6SjgWqTVFt5jd

// five 5 steps in index.js
// 1:
const middlewareWrapper = require('cors');

// cors requiring 
const cors = require('cors');
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
// 2:
const app = express();
// 3:
const port = process.env.PORT || 5000;

// middlewareWrapper(nicher duto khub imp: edi sara kaj  kore na file)
app.use(cors());

app.use(express.json());

// mongodb er code ta niche dewa holo 


const uri = "mongodb+srv://mongobongo1:MZk6SjgWqTVFt5jd@cluster0.q04a6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try{
        await client.connect();
        const userCollection = client.db('foodExpress').collection('users');
        // get users  
        app.get('/user', async(req, res) =>{
            const query = {}, 
            cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        app.get('/user/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result);
        })
        
        // POST User: add a new user
        app.post('/user', async(req, res)=> {
            const newUser = req.body;
            console.log('adding new user', newUser)
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        });
        // update user
        app.put('/user/:id', async(req, res)=> {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = {_id: ObjectId(id)}
            const options = {upsert: true };
            const updatedDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            };
            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });


        // delete a user
        app.delete('/user/:id', async(req, res)=> {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally{
        // await client.close();
    }
};

run().catch(console.dir)
 


// 4:
app.get('/', (req, res) => {
    res.send('Running My Node CRUD Server');
});
// 5:
app.listen(port, () => {
    console.log('CURD server is Running');
});



