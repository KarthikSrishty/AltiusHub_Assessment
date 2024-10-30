import express, { Request, Response,ErrorRequestHandler } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import InvoiceBillSundry from "../models/InvoiceBillSundry";

export const InvoiceBillSundryRouter = express.Router();

InvoiceBillSundryRouter.use(express.json());

InvoiceBillSundryRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const InvoiceBillSundry = await collections.InvoiceBillSundry?.find({}).toArray() ;
        if(InvoiceBillSundry){
            res.status(200).send(InvoiceBillSundry);
        }
    } catch (error ) {
        res.status(500).send("No Invoices Generated!");
    }
});
InvoiceBillSundryRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const InvoiceBillSundry = await collections.InvoiceBillSundry?.findOne(query);

        if (InvoiceBillSundry) {
            res.status(200).send(InvoiceBillSundry);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}!`);
    }
});
InvoiceBillSundryRouter.post("/", async (req: Request, res: Response) => {
    try {
        const {ItemName,Quantity,Price} = req.body ;
        const Amount=Quantity*Price;
        const result = await collections.InvoiceBillSundry?.insertOne({ItemName:ItemName,Quantity:Quantity,Price:Price,Amount:Amount});

        result
            ? res.status(201).send(`Successfully created a new Invoice with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new Invoice.");
    } catch (error) {
        console.error(error);
        res.status(400).send("Server Is Down! or Unable to Create at the moment");
    }
});

InvoiceBillSundryRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedInvoice = req.body ;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.InvoiceBillSundry?.updateOne(query, { $set: updatedInvoice });

        result
            ? res.status(200).send(`Successfully updated Invoice with id ${id}`)
            : res.status(304).send(`Invoice with id: ${id} not updated`);
    } catch (error:any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
InvoiceBillSundryRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.InvoiceBillSundry?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed Invoice with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove Invoice with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Invoice with id ${id} does not exist`);
        }
    } catch (error :any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});