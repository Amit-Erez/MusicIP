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
  const maxPages = Math.max(1, Math.ceil(organizedData.length / limitPerPage))
  const compedPage = Math.min(pageNum, maxPages)
  const start = (compedPage - 1) * limitPerPage
  const end = start + limitPerPage;
  return {
  applications: organizedData.slice(start, end),
  page: compedPage,
  maxPages,
  totalResults: organizedData.length,
};
}
