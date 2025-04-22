import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

await client.connect();

const dbName = "alwaysReturn";
const collectionName = "savedChallenges";

const database = client.db(dbName);
const collection = database.collection(collectionName);

try {
  const insertResult = await collection.insertOne({ message: "hi" });
  console.log(
    `Document successfully inserted with _id: ${insertResult.insertedId}\n`
  );
} catch (err) {
  console.error(
    `Something went wrong trying to insert the new document: ${err}\n`
  );
} finally {
  await client.close(); // Good practice to close the connection
}
