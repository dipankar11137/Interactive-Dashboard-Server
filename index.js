const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://blood_bank:ydQqlxj3DGqlPHYk@cluyster0.gxqkllr.mongodb.net/?retryWrites=true&w=majority`;

const uri =
  'mongodb+srv://bloodBank:7WTpQNiMnA8tMsxK@cluster0.kpqzt3m.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    // console.log("database connect");
    const userCollection = client.db('blood-bank').collection('user');
    const bloodsCollection = client.db('blood-bank').collection('bloods');
    const buyBloodsCollection = client.db('blood-bank').collection('buyBloods');
    const donateBloodCollection = client
      .db('blood-bank')
      .collection('donateBlood');
    //   // // // // // // // // // // // //

    // create and update User
    //create and update a user
    app.put('/create-user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;

      const filter = { email: email };
      const options = { upsert: true };

      const updatedDoc = {
        $set: user,
      };

      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    // get user
    app.get('/user', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // // all User filter by email category
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });
    // restock blood item and update
    app.put('/userId/:id', async (req, res) => {
      const id = req.params.id;
      const updateFreeBlood = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          freeBlood: updateFreeBlood.freeBlood,
        },
      };
      const result = await userCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });
    // get blood
    app.get('/bloods', async (req, res) => {
      const query = {};
      const cursor = bloodsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // get blood by id
    app.get('/blood/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bloodsCollection.findOne(query);
      res.send(result);
    });

    // restock blood item and update
    app.put('/bloodId/:id', async (req, res) => {
      const id = req.params.id;
      const updateQuantity = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: updateQuantity.quantity,
        },
      };
      const result = await bloodsCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    //                     Buy    //
    // post buy
    app.post('/buyBlood', async (req, res) => {
      const postResult = req.body;
      const result = await buyBloodsCollection.insertOne(postResult);
      res.send(result);
    });

    // Get all Buy
    app.get('/buyBlood', async (req, res) => {
      const query = {};
      const cursor = buyBloodsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // get buy blood by id
    app.get('/buyBloodBuyId/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await buyBloodsCollection.findOne(query);
      res.send(result);
    });
    // get buy filter by email
    app.get('/buyBlood/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = buyBloodsCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });

    // restock buy blood item and update delivered
    app.put('/buyBloodId/:id', async (req, res) => {
      const id = req.params.id;
      const updateDelivered = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          delivered: updateDelivered.delivered,
        },
      };
      const result = await buyBloodsCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
    // restock buy blood item and update payment
    app.put('/buyBloodPayment/:id', async (req, res) => {
      const id = req.params.id;
      const updatePayment = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          payment: updatePayment.payment,
        },
      };
      const result = await buyBloodsCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
    // // Delete one buy blood
    app.delete('/buyBlood/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await buyBloodsCollection.deleteOne(query);
      res.send(result);
    });
    //donate blood update and put data
    app.put('/donateBlood/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;

      const filter = { email: email };
      const options = { upsert: true };

      const updatedDoc = {
        $set: user,
      };

      const result = await donateBloodCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    // Get all donate blood
    app.get('/donateBlood', async (req, res) => {
      const query = {};
      const cursor = donateBloodCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // restock donate blood and update accept
    app.put('/donateBloodId/:id', async (req, res) => {
      const id = req.params.id;
      const updateAccept = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          accept: updateAccept.accept,
        },
      };
      const result = await donateBloodCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
    // // Delete one donate blood
    app.delete('/donateBlood/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await donateBloodCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running Blood Bank');
});

app.listen(port, () => {
  console.log('Blood Bank is running ');
});

// const express = require("express");
// const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 5000;

// // use middleware
// app.use(cors());
// app.use(express.json());

// const uri =
//   'mongodb+srv://interactive_dashboard:Xd7sDKG6GUBJPoqK@cluster0.zx6xlql.mongodb.net/?retryWrites=true&w=majority';

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// async function run() {
//   try {
//     await client.connect();
//     // console.log("database connect");
//     const userCollection = client
//       .db('interactive_dashboard')
//       .collection('user');
//     const productCollection = client
//       .db('interactive_dashboard')
//       .collection('products');
//     const buyProductCollection = client
//       .db('interactive_dashboard')
//       .collection('buyProducts');
//     const contactCollection = client
//       .db('interactive_dashboard')
//       .collection('contacts');
//     const cartCollection = client
//       .db('interactive_dashboard')
//       .collection('carts');
//     //   // // // // // // // // // // // //

//     // create and update User
//     //create and update a user
//     app.put('/create-user/:email', async (req, res) => {
//       const email = req.params.email;
//       const user = req.body;

//       const filter = { email: email };
//       const options = { upsert: true };

//       const updatedDoc = {
//         $set: user,
//       };

//       const result = await userCollection.updateOne(
//         filter,
//         updatedDoc,
//         options
//       );
//       res.send(result);
//     });
//     // // get user
//     app.get('/user', async (req, res) => {
//       const query = {};
//       const cursor = userCollection.find(query);
//       const result = await cursor.toArray();
//       res.send(result);
//     });
//     // // all User filter by email category
//     app.get('/user/:email', async (req, res) => {
//       const email = req.params.email;
//       const query = { email };
//       const cursor = userCollection.find(query);
//       const user = await cursor.toArray();
//       res.send(user);
//     });

//     // //                     product   //
//     // // post product
//     app.post('/allProduct', async (req, res) => {
//       const postResult = req.body;
//       const result = await productCollection.insertOne(postResult);
//       res.send(result);
//     });
//     // // get products
//     app.get('/allProduct', async (req, res) => {
//       const query = {};
//       const cursor = productCollection.find(query);
//       const result = await cursor.toArray();
//       res.send(result);
//     });
//     // // get product filter by category
//     app.get('/products/:category', async (req, res) => {
//       const category = req.params.category;
//       const query = { category };
//       const cursor = productCollection.find(query);
//       const result = await cursor.toArray();
//       res.send(result);
//     });
//     // get product by id
//     app.get('/product/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const result = await productCollection.findOne(query);
//       res.send(result);
//     });
//     // // restock Product item and update
//     app.put('/productId/:id', async (req, res) => {
//       const id = req.params.id;
//       const updateQuantity = req.body;
//       const query = { _id: ObjectId(id) };
//       const options = { upsert: true };
//       const updateDoc = {
//         $set: {
//           quantity: updateQuantity.quantity,
//         },
//       };
//       const result = await productCollection.updateOne(
//         query,
//         updateDoc,
//         options
//       );
//       res.send(result);
//     });
//     // // Delete one product
//     app.delete('/product/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const result = await productCollection.deleteOne(query);
//       res.send(result);
//     });

//     //                     Buy    //
//     // post buy
//     app.post('/buyProducts', async (req, res) => {
//       const postResult = req.body;
//       const result = await buyProductCollection.insertOne(postResult);
//       res.send(result);
//     });
//     // // get buy products
//     app.get('/buyProducts', async (req, res) => {
//       const query = {};
//       const cursor = buyProductCollection.find(query);
//       const result = await cursor.toArray();
//       res.send(result);
//     });
//     //      cart
//     // post cart
//     app.post('/cartProducts', async (req, res) => {
//       const postResult = req.body;
//       const result = await cartCollection.insertOne(postResult);
//       res.send(result);
//     });
//     // // get buy filter by email
//     app.get('/cartProducts/:email', async (req, res) => {
//       const email = req.params.email;
//       const query = { email };
//       const cursor = cartCollection.find(query);
//       const user = await cursor.toArray();
//       res.send(user);
//     });
//     // // get carts products
//     app.get('/cartProducts', async (req, res) => {
//       const query = {};
//       const cursor = cartCollection.find(query);
//       const result = await cursor.toArray();
//       res.send(result);
//     });
//     // Delete cart Product
//     app.delete('/cartProduct/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const result = await cartCollection.deleteOne(query);
//       res.send(result);
//     });

//     //        buy
//     // get buy product by id
//     app.get('/buyProductId/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const result = await buyProductCollection.findOne(query);
//       res.send(result);
//     });
//     // // get buy filter by email
//     app.get('/buyProduct/:email', async (req, res) => {
//       const email = req.params.email;
//       const query = { email };
//       const cursor = buyProductCollection.find(query);
//       const user = await cursor.toArray();
//       res.send(user);
//     });
//     // //  buy product update payment
//     app.put('/buyProductPayment/:id', async (req, res) => {
//       const id = req.params.id;
//       const updatePayment = req.body;
//       const query = { _id: ObjectId(id) };
//       const options = { upsert: true };
//       const updateDoc = {
//         $set: {
//           payment: updatePayment.payment,
//         },
//       };
//       const result = await buyProductCollection.updateOne(
//         query,
//         updateDoc,
//         options
//       );
//       res.send(result);
//     });
//     // product buy update delivered
//     app.put('/buyDelivered/:id', async (req, res) => {
//       const id = req.params.id;
//       const updateDelivered = req.body;
//       const query = { _id: ObjectId(id) };
//       const options = { upsert: true };
//       const updateDoc = {
//         $set: {
//           delivered: updateDelivered.delivered,
//         },
//       };
//       const result = await buyProductCollection.updateOne(
//         query,
//         updateDoc,
//         options
//       );
//       res.send(result);
//     });

//     // Delete Buy Product
//     app.delete('/buyProduct/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const result = await buyProductCollection.deleteOne(query);
//       res.send(result);
//     });

//     //                       contact     //
//     // post contact
//     app.post('/contact', async (req, res) => {
//       const postResult = req.body;
//       const result = await contactCollection.insertOne(postResult);
//       res.send(result);
//     });

//     // Get all contact
//     app.get('/contact', async (req, res) => {
//       const query = {};
//       const cursor = contactCollection.find(query);
//       const result = await cursor.toArray();
//       res.send(result);
//     });

//     // Delete Buy contact
//     app.delete('/contact/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const result = await contactCollection.deleteOne(query);
//       res.send(result);
//     });
//   } finally {
//   }
// }

// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('Running Interactive Dashboard');
// });

// app.listen(port, () => {
//   console.log('Interactive Dashboard is running ');
// });
