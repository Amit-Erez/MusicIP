import { cn } from "./lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "./lib/api";
import Nav from "./components/Nav";
import { AppTable } from "./components/AppTable";
import TopSection from "./components/TopSection";
import Filters from "./components/Filters";
import { useEffect, useState } from "react";
import type { Application, Filter, Sort } from "./types";

// import AppCard from "./components/AppCard";

function App() {
  const [sort, setSort] = useState<Sort>("dateAsc");
  const [filters, setFilters] = useState<Filter[]>([]);
  const [query, setQuery] = useState<string>("");
  const [dbQuery, setDbQuery] = useState<string>("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDbQuery(query);
    }, 300);

    return () => clearTimeout(timerId);
  }, [query]);

  // *** adding / removing filters *** //
  function editFilters(filter: Filter): void {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  const searchedData: Application[] | undefined = data?.filter((app) =>
    app.applicant.name.toLowerCase().includes(dbQuery.trim().toLowerCase()),
  );

  // *** deriving new filtered applications array *** //
  const filteredData: Application[] | undefined =
    filters.length === 0
      ? searchedData
      : searchedData?.filter((app) => filters.includes(app.status));

  // *** sorting filtered array by sort value *** //
  const sortedApps = filteredData
    ? [...filteredData].sort((a, b) => {
        const dateA = a.submittedAt.slice(0, 10);
        const dateB = b.submittedAt.slice(0, 10);
        const loanA = a.loanRequest.amountRequested;
        const loanB = b.loanRequest.amountRequested;
        if (sort === "dateAsc") return dateA.localeCompare(dateB);
        if (sort === "dateDesc") return dateB.localeCompare(dateA);
        if (sort === "loanAsc") return loanA - loanB;
        if (sort === "loanDesc") return loanB - loanA;
        return 0;
      })
    : undefined;

  return (
    <div className={cn("min-h-screen  bg-[#F1EFE8] pt-12 pb-12 flex relative")}>
      <Nav />
      <div className="w-[90%] max-w-325 h-full mx-auto pt-6 pb-4 flex flex-col">
        {data && <TopSection data={data} />}
        <Filters
          sort={sort}
          setSort={setSort}
          editFilters={editFilters}
          filters={filters}
          query={query}
          setQuery={setQuery}
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <div>{error.message}</div>
        ) : (
          sortedApps && <AppTable sortedApps={sortedApps} />
        )}
      </div>
    </div>
  );
}

export default App;
