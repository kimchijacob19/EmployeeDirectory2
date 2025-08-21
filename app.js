import express from "express";
import employeesRouter from "./routes/employees.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello employees!");
});

app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke on the server!");
});

export default app;
