const express = require('express');
const cors = require('cors');

const router = express.Router();

// // Get Posts
// router.get('/', async (req, res) => {
//     const posts = await loadPostsCollection();
//     res.send(await posts.find().toArray());
// });

// // Add Post
// router.post('/', async (req, res) => {
//     const posts = await loadPostsCollection();
//     await posts.insertOne({
//         text: req.body.text,
//         createdAt: new Date()
//     });
//     res.status(201).send();
// });

// // Delete Post
// router.delete('/:id', async (req, res) => {
//     const posts = await loadPostsCollection();
//     await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
//     res.status(200).send();
// });

// async function loadPostsCollection() {
//     const client = await mongodb.MongoClient.connect(
//         'mongodb+srv://Hitesh:hskT123%40k@cluster.fldzn.mongodb.net/vue-server?retryWrites=true&w=majority',
//         {
//             useNewUrlParser: true
//         }
//     );

//     return client.db('vue-express').collection('posts');
// }

// module.exports = router;


const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://Hitesh:hskT123%40k@cluster.fldzn.mongodb.net/vue-server?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("vue-express").collection("posts");
    // perform actions on the collection object

    // Get Posts
    router.get('/', async (req, res) => {
        res.send(await collection.find().toArray());
    });

    // Add Post
    router.post('/', async (req, res) => {
        await collection.insertOne({
            text: req.body.text,
            createdAt: new Date()
        });
        res.status(201).send();
    });

    // Delete Post
    router.delete('/:id', async (req, res) => {
        await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.status(200).send();
    });


    // client.close();
});

module.exports = router