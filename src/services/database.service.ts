import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import InvoiceHeader from "../models/InvoiceHeader";
import InvoiceBillSundry from "../models/InvoiceBillSundry";
import InvoiceItems from "../models/InvoiceItems";

export const collections: { InvoiceHeader?: mongoDB.Collection ,InvoiceBillSundry?:mongoDB.Collection,InvoiceItems?:mongoDB.Collection} = {}


//Initializing Connection
export async function connectToDatabase () {
    dotenv.config();
    const conn=process.env.DB_CONN_STRING ? process.env.DB_CONN_STRING:"mongodb://localhost:27017";
    const coll=process.env.COLLECTION_NAME ? process.env.COLLECTION_NAME:"Invoice";
    
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(conn);
            
    await client.connect();
    console.log(conn);
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    const Collection: mongoDB.Collection = db.collection(coll);

    collections.InvoiceHeader = Collection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${Collection.collectionName}`);
 }