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
exports.InvoiceBillSundryRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.InvoiceBillSundryRouter = express_1.default.Router();
exports.InvoiceBillSundryRouter.use(express_1.default.json());
exports.InvoiceBillSundryRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const InvoiceBillSundry = yield ((_a = database_service_1.collections.InvoiceBillSundry) === null || _a === void 0 ? void 0 : _a.find({}).toArray());
        if (InvoiceBillSundry) {
            res.status(200).send(InvoiceBillSundry);
        }
    }
    catch (error) {
        res.status(500).send("No Invoices Generated!");
    }
}));
exports.InvoiceBillSundryRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const InvoiceBillSundry = yield ((_b = database_service_1.collections.InvoiceBillSundry) === null || _b === void 0 ? void 0 : _b.findOne(query));
        if (InvoiceBillSundry) {
            res.status(200).send(InvoiceBillSundry);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}!`);
    }
}));
exports.InvoiceBillSundryRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { ItemName, Quantity, Price } = req.body;
        const Amount = Quantity * Price;
        const result = yield ((_a = database_service_1.collections.InvoiceBillSundry) === null || _a === void 0 ? void 0 : _a.insertOne({ ItemName: ItemName, Quantity: Quantity, Price: Price, Amount: Amount }));
        result
            ? res.status(201).send(`Successfully created a new Invoice with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new Invoice.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send("Server Is Down! or Unable to Create at the moment");
    }
}));
exports.InvoiceBillSundryRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const updatedInvoice = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_b = database_service_1.collections.InvoiceBillSundry) === null || _b === void 0 ? void 0 : _b.updateOne(query, { $set: updatedInvoice }));
        result
            ? res.status(200).send(`Successfully updated Invoice with id ${id}`)
            : res.status(304).send(`Invoice with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
exports.InvoiceBillSundryRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_b = database_service_1.collections.InvoiceBillSundry) === null || _b === void 0 ? void 0 : _b.deleteOne(query));
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
