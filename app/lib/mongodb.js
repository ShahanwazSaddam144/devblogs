import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) {
    throw new Error("Please add MONGO_URI to your .env");
}

const uri = process.env.MONGO_URI;

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
