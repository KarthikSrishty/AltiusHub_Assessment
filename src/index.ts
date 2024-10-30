import express, { Express, Request, Response } from "express";
import { connectToDatabase } from "./services/database.service";
import { InvoiceHeaderRouter } from "./routes/InvoiceHeader.router";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectToDatabase()
  .then(() => {
    app.use("/invoice", InvoiceHeaderRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
