const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

await client.connect();

const dbName = "alwaysReturn";
const collectionName = "savedChallenges";

const database = client.db(dbName);
const collection = database.collection(collectionName);

try {
  const insertResult = await collection.insertOne("hi");
  console.log(
    `${insertResult.insertedCount} documents successfully inserted.\n`
  );
} catch (err) {
  console.error(
    `Something went wrong trying to insert the new documents: ${err}\n`
  );
}
