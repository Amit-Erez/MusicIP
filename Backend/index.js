import express from "express";
import morgan from "morgan";
import { readFile, writeFile } from "fs/promises";
import cors from "cors";
import { json } from "stream/consumers";

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});

// Main GET for list of applications
app.get("/api/applications", async (req, res) => {
  const { filters, sort, dbQuery, page, limit } = req.query;
  const searchQuery = typeof dbQuery === "string" ? dbQuery : "";
  const pageNum = Number(page) || 1;
  const limitPerPage = Number(limit) || 8;
  const selectedFilters = Array.isArray(filters)
    ? filters
    : filters
      ? [filters]
      : [];

  try {
    const fileData = await readFile("./db.json", "utf8");
    const data = JSON.parse(fileData);
    const appArr = data.applications;
    const result = organizeResult(appArr, {
      searchQuery,
      selectedFilters,
      pageNum,
      limitPerPage,
      sort,
    });

    setTimeout(() => {
      res.status(200).json(result);
    }, 500);
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

// GET the chosen application data for the slide-in sheet component
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

// Helper function filtering, sorting and paginating the application list 
function organizeResult(
  applications,
  { searchQuery, selectedFilters, pageNum, limitPerPage, sort },
) {
  const organizedData = [...applications]
    .filter((app) =>
      app.applicant.name
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase()),
    )
    .filter((app) =>
      selectedFilters.length === 0
        ? true
        : selectedFilters.includes(app.status),
    )
    .sort((a, b) => {
      const dateA = a.submittedAt.slice(0, 10);
      const dateB = b.submittedAt.slice(0, 10);
      const loanA = a.loanRequest.amountRequested;
      const loanB = b.loanRequest.amountRequested;
      if (sort === "dateAsc") return dateA.localeCompare(dateB);
      if (sort === "dateDesc") return dateB.localeCompare(dateA);
      if (sort === "loanAsc") return loanA - loanB;
      if (sort === "loanDesc") return loanB - loanA;
      return 0;
    });
  const maxPages = Math.max(1, Math.ceil(organizedData.length / limitPerPage));
  const clampedPage = Math.min(pageNum, maxPages);
  const start = (clampedPage - 1) * limitPerPage;
  const end = start + limitPerPage;
  return {
    applications: organizedData.slice(start, end),
    page: clampedPage,
    maxPages,
    totalResults: organizedData.length,
  };
}

// Patch function for updating 'Flagged' 
app.patch("/api/applications/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const fileData = await readFile("./db.json", "utf8");
    console.log("file read");

    const data = JSON.parse(fileData);
    console.log("json parsed");

    const searchedApp = data.applications.find((app) => app.id === id);
    console.log("found app:", searchedApp);

    if (!searchedApp) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
      searchedApp.flagged = req.body.flagged;
      console.log("flag changed");

      await writeFile("./db.json", JSON.stringify(data, null, 2));
      console.log("file written");

      console.log(searchedApp)
      return res.json(searchedApp);
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

// Patch function for updating app status
app.patch("/api/applications/:id/status", async (req, res) => {
  const id = req.params.id
  try {
    const fileData = await readFile("./db.json", "utf-8")
    const data = JSON.parse(fileData)
    const searchedApp = data.applications.find((app) => app.id === id)
    if (!searchedApp) {
     return res.status(404).json({
      message: "File not found"
     })
    } else {
      searchedApp.status = req.body.newStatus
      await writeFile("./db.json", JSON.stringify(data, null, 2))
      return res.json(searchedApp)
    }
  } catch (error) {
    if (error.code === "ENONET") {
      res.status(404).json({
        message: "404: File not found",
      }) 
    } else {
      res.status(500).json({
        message: "500: Server error"
      })
    }
  }
})

app.post("/api/applications/:id/note", async (req, res) => {
  const id = req.params.id
  const message = req.body.message
  const note = {
      id: crypto.randomUUID(),
      author: "Amit Erez",
      text: message,
      createdAt: new Date().toISOString()
    }

  try {
    const fileData = await readFile("./db.json", "utf-8")
    const data = JSON.parse(fileData)
    const searchedApp = data.applications.find((app) => app.id === id)
    if (!searchedApp) {
     return res.status(404).json({
      message: "File not found"
     })
    } else {
      searchedApp.notes.unshift(note)
      await writeFile("./db.json", JSON.stringify(data, null, 2))
      return res.status(200).json(searchedApp)
    }
  } catch (error) {
    if (error.code === "ENONET") {
      res.status(404).json({
        message: "404: File not found",
      }) 
    } else {
      res.status(500).json({
        message: "500: Server error"
      })
    }
  }

})