const {getDatabase} = require('./mongo'); // importing function from mongo.js
const {ObjectId} = require('mongodb') //importing mongodb identifier

const collectionName = 'ads';

async function insertAd(ad) { 
    const database = await getDatabase(); // function first fetches the database
    const {insertedId} = await database.collection(collectionName).insertOne(ad); // targets database collection named'ads' (where they are placed) and inserts new 'ad' in that place
    return insertedId;
}

async function getAds() {
    const database = await getDatabase(); // retrieves db first
    return await database.collection(collectionName).find({}).toArray(); // targets db collection 'ads' and looks for the specific object. then returns all its elements to array
}

async function deleteAd() {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({ // targets 'ads' collection with deleteOne() method
        _id: new ObjectId(id), // specific target is the object id, but why new instance of it???********************** because stateless??
    })
}

async function updateAd(id, ad) {
    const database = await getDatabase();
    delete ad._id;
    await database
      .collection(collectionName).updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...ad, // this object is passed in the $set property so ad would be the only property to change while leaving rest untouched
          },
        }
      );
}

module.exports = {
    insertAd,
    getAds,
    deleteAd,
    updateAd
}