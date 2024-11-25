import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'   // our express app that we moved from index to app file

let mongo: any

// Before we start our tests, we need to create an instance of MongoMemoryServer in memory, to do this we will 
// define a hook function, and make it async. This functional will run "beforeAll" subsequent tasks in our function
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf'   //setting the JWT_KEY for the test

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
})

beforeEach(async () => {
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections();
   
      for (let collection of collections) {
        await collection.deleteMany({});
      }
    }
  });

  afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
  });