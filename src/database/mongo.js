const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let database = null;

async function startDatabase() { // async function to start database
    // const mongo = new MongoMemoryServer();
    // const mongoDBURL = await mongo.getConnectionString(); -- deprecated methods

    const mongo = await MongoMemoryServer.create(); // declare mongo with server creation using create() method
    const mongoDBURL = mongo.getUri(); // acquires URI(uniform resources identifier) of the server created ^^. declared as mongoDBURL
    const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true}); // creates connection to specified URI(mongoDBURL) of mongoDB instance. - passed new parser
    database = connection.db(); // creates new db instance with the newly created server ^^
}

async function getDatabase() { // async function to get db
    if (!database) await startDatabase(); // if database false, call the startDatabase() method to start db
    return database; // return database after connection to db instance is acquired
}

module.exports = {
    getDatabase,
    startDatabase
};