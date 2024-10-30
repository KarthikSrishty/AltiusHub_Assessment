"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceHeaderRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.InvoiceHeaderRouter = express_1.default.Router();
exports.InvoiceHeaderRouter.use(express_1.default.json());
exports.InvoiceHeaderRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const InvoiceHeader = yield ((_a = database_service_1.collections.InvoiceHeader) === null || _a === void 0 ? void 0 : _a.find({}).toArray());
        if (InvoiceHeader) {
            res.status(200).send(InvoiceHeader);
        }
    }
    catch (error) {
        res.status(500).send("No Invoices Generated!");
    }
}));
exports.InvoiceHeaderRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const InvoiceHeader = yield ((_b = database_service_1.collections.InvoiceHeader) === null || _b === void 0 ? void 0 : _b.findOne(query));
        if (InvoiceHeader) {
            res.status(200).send(InvoiceHeader);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}!`);
    }
}));
exports.InvoiceHeaderRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { invoiceItems, invoiceBillSundry } = req.body;
        // Calculate the TotalAmount
        const totalAmountItems = invoiceItems.reduce((sum, item) => sum + item.amount, 0);
        const totalAmountBillSundry = invoiceBillSundry.reduce((sum, bill) => sum + bill.amount, 0);
        const totalAmount = totalAmountItems + totalAmountBillSundry;
        // Create the new invoice header including TotalAmount
        const newInvoiceHeader = Object.assign(Object.assign({}, req.body), { TotalAmount: totalAmount });
        const result = yield ((_a = database_service_1.collections.InvoiceHeader) === null || _a === void 0 ? void 0 : _a.insertOne(newInvoiceHeader));
        result
            ? res.status(201).send(`Successfully created a new Invoice with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new Invoice.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Server Is Down! or Unable to Create at the moment");
    }
}));
exports.InvoiceHeaderRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const updatedInvoice = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_b = database_service_1.collections.InvoiceHeader) === null || _b === void 0 ? void 0 : _b.updateOne(query, { $set: updatedInvoice }));
        result
            ? res.status(200).send(`Successfully updated Invoice with id ${id}`)
            : res.status(304).send(`Invoice with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
exports.InvoiceHeaderRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_b = database_service_1.collections.InvoiceHeader) === null || _b === void 0 ? void 0 : _b.deleteOne(query));
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed Invoice with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove Invoice with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Invoice with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
