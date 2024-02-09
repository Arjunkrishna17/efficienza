import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

let client;
let clientPromise: any;

if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

const globalObj = global as any;

if (process.env.NODE_ENV === "development") {
  if (!globalObj._mongoClientPromise) {
    client = new MongoClient(uri);
    globalObj._mongoClientPromise = client.connect();
  }
  clientPromise = globalObj._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

const db = async () => {
  const client = await clientPromise;

  const db: Db = client.db("efficienza");

  return db;
};

export default db;
