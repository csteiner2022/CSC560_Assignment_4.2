import * as mongodb from "mongodb";
import { Player } from "./player";

export const collections: {
    players?: mongodb.Collection<Player>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
    const db = client.db("TeamDB");
    collections.players = db.collection<Player>("players");
    console.log(`Successfully connected to database: ${db.databaseName}`);
}
