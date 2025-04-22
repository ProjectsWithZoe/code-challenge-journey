import { MongoClient } from "mongodb";

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { UUID, challengeDate } = req.body;

  try {
    const client = await connectToDatabase();
    const db = client.db("alwaysReturn");
    const collection = db.collection("savedChallenges");

    await collection.insertOne({
      UUID,
      challengeDate,
      completed: true,
      savedAt: new Date(),
    });

    res.status(200).json({ message: "Challenge completion recorded." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
}
