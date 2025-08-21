import { Router } from "express";
import employees from "#db/employees";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(employees);
});

router.get("/random", (req, res) => {
  if (employees.length === 0) {
    return res.status(404).json({ error: "No employees available!" });
  }
  const randomIndex = Math.floor(Math.random() * employees.length);
  const employee = employees[randomIndex];
  res.status(200).json(employee);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  res.status(200).json(employee);
});

router.post("/", (req, res) => {
  // if no body provided at all
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required!" });
  }

  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Valid name is required!" });
  }

  const newEmployee = {
    id: employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1,
    name: name.trim(),
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

export default router;
