import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the InvoiceBillSundry document
export interface IInvoiceBillSundry extends Document {
    billSundryName: string;
    Amount:number;
}

// Create the schema for the InvoiceBillSundry
const InvoiceBillSundrySchema: Schema = new Schema({
    billSundryName: {
        type: String,
        required: true,
    },
    Amount:{
        type:Number,
        required:false
    }
});

// Create the model
const InvoiceBillSundryModel = mongoose.model<IInvoiceBillSundry>('InvoiceBillSundry', InvoiceBillSundrySchema);

// Export the model
export default InvoiceBillSundryModel;
