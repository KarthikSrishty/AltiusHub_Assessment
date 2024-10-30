import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the InvoiceItems document
export interface IInvoiceItems extends Document {
    ItemName: string;
    Quantity: number;
    Price: number;
    Amount:number;
}

// Create the schema for the InvoiceItems
const InvoiceItemsSchema: Schema = new Schema({
    ItemName: {
        type: String,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Amount:{
        type:Number,
        required:false
    }
});

// Create the model
const InvoiceItemsModel = mongoose.model<IInvoiceItems>('InvoiceItems', InvoiceItemsSchema);

// Export the model
export default InvoiceItemsModel;
