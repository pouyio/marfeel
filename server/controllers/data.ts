import { NextFunction, Request, Response } from "express";

import { findAllPaginated, findById } from "../services/data";
import { Period } from "../types";

const getAll = (req: Request, res: Response, next: NextFunction) => {
  try {
    const period = (req.query.period as Period) || "today";
    const page = parseInt((req.query.page as string) ?? 1);
    const response = findAllPaginated(period, page);

    res.json(response);
  } catch (err) {
    next(err);
  }
};

const getById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const period = (req.query.period as Period) || "today";
    const id = req.params.id;
    const response = findById(id, period);

    if (response) {
      res.json(response);
    } else {
      res.statusCode = 404;
      res.json({ error: "Article not found!" });
    }
  } catch (err) {
    next(err);
  }
};

export { getAll, getById };
