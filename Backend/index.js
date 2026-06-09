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
    res.json(data.applications);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).send("File not found");
    } else {
      res.status(500).send("Server Error");
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
      res.status(404).send("Application not found");
      return;
    }
    res.json(searchedApp);
  } catch {
    if (error.code === "ENOENT") {
      res.status(404).send("File not found");
    } else {
      res.status(500).send("Server Error");
    }
  }
});
