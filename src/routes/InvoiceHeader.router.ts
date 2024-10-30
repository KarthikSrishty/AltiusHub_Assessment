import express, { Request, Response,ErrorRequestHandler } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import InvoiceHeader from "../models/InvoiceHeader";
import InvoiceBillSundry from "../models/InvoiceBillSundry";
import InvoiceItems from "../models/InvoiceItems";
export const InvoiceHeaderRouter = express.Router();

InvoiceHeaderRouter.use(express.json());

InvoiceHeaderRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const InvoiceHeader = await collections.InvoiceHeader?.find({}).toArray() ;
        if(InvoiceHeader){
            res.status(200).send(InvoiceHeader);
        }
    } catch (error ) {
        res.status(500).send("No Invoices Generated!");
    }
});
InvoiceHeaderRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const InvoiceHeader = await collections.InvoiceHeader?.findOne(query);

        if (InvoiceHeader) {
            res.status(200).send(InvoiceHeader);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}!`);
    }
});
InvoiceHeaderRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { invoiceItems, invoiceBillSundry } = req.body;

        // Calculate the TotalAmount
        const totalAmountItems = invoiceItems.reduce((sum: number, item:any) => sum + item.amount, 0);
        const totalAmountBillSundry = invoiceBillSundry.reduce((sum: number, bill: any) => sum + bill.amount, 0);
        const totalAmount = totalAmountItems + totalAmountBillSundry;

        // Create the new invoice header including TotalAmount
        const newInvoiceHeader = { ...req.body, TotalAmount: totalAmount };

        const result = await collections.InvoiceHeader?.insertOne(newInvoiceHeader);
        
        result
            ? res.status(201).send(`Successfully created a new Invoice with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new Invoice.");
    } catch (error) {
        console.error(error);
        res.status(400).send("Server Is Down! or Unable to Create at the moment");
    }
});


InvoiceHeaderRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedInvoice = req.body ;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.InvoiceHeader?.updateOne(query, { $set: updatedInvoice });

        result
            ? res.status(200).send(`Successfully updated Invoice with id ${id}`)
            : res.status(304).send(`Invoice with id: ${id} not updated`);
    } catch (error:any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
InvoiceHeaderRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.InvoiceHeader?.deleteOne(query);

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