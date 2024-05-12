import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import contactsRouter from "./routes/contactsRouter.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", true);

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("successfully connected");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
