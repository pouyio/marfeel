import cors from "cors";
import express, { Application, NextFunction } from "express";
import path from "path";
import { dataRoutes } from "./routes";

const app: Application = express();

const port: number = 3001;

app.use(cors());
app.use(express.json());

const buildPath = path.join(__dirname, "../../build");
app.use(express.static(buildPath));

app.use("/api/data", dataRoutes);

app.use("*", (req: express.Request, res: express.Response) =>
  res.sendFile(path.join(buildPath, "index.html"))
);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    console.error(err);
    res.statusCode = 500;
    res.end("There was an error, try again or contact admin");
  }
);

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
