import express from "express";
import morgan from "morgan";
import { readFile } from "fs/promises";
import cors from "cors";

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});

app.get("/api/applications", async (req, res) => {
  try {
    const fileData = await readFile("./db.json", "utf8");
    const data = JSON.parse(fileData);
    setTimeout(() => {
      res.json(data.applications);
    }, 1500);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({
        message: "404: File not found",
      });
    } else {
      res.status(500).json({
        message: "500: Server Error",
      });
    }
  }
});

app.get("/api/applications/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const fileData = await readFile("./db.json", "utf8");
    const data = JSON.parse(fileData);
    const searchedApp = data.applications.find((app) => app.id === id);
    if (!searchedApp) {
      res.status(404).json({
        message: "404: Application not found",
      });
      return;
    }
    setTimeout(() => {
      res.json(searchedApp);
    }, 1500);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({
        message: "404: File not found",
      });
    } else {
      res.status(500).json({
        message: "500: Server Error",
      });
    }
  }
});
