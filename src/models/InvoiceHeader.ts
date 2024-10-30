import mongoose, { Document, Schema } from 'mongoose';


export interface IInvoiceHeader extends Document {
    Date: string;
    InvoiceNumber: number;
    CustomerName: string;
    BillingAddress: string;
    ShippingAddress: string;
    GSTIN: string;
    TotalAmount: number;
}

// Create the schema for the InvoiceHeader
const InvoiceHeaderSchema: Schema = new Schema({
    Date: {
        type: String,
        required: true,
    },
    InvoiceNumber: {
        type: Number,
        required: true,
    },
    CustomerName: {
        type: String,
        required: true,
    },
    BillingAddress: {
        type: String,
        required: true,
    },
    ShippingAddress: {
        type: String,
        required: true,
    },
    GSTIN: {
        type: String,
        required: true,
    },
    TotalAmount: {
        type: Number,
        required: false,
    }
});

// Create the model
const InvoiceHeaderModel = mongoose.model<IInvoiceHeader>('InvoiceHeader', InvoiceHeaderSchema);

// Export the model
export default InvoiceHeaderModel;
