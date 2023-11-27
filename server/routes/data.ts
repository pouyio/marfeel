import express from "express";
import { getAll, getById } from "../controllers/data";

const dataRoutes = express.Router();

dataRoutes.get("/", getAll);

dataRoutes.get("/:id", getById);

export default dataRoutes;
