import { cn } from "./lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "./lib/api";
import Nav from "./components/Nav";
import { AppTable } from "./components/AppTable";
import TopSection from "./components/TopSection";
import Filters from "./components/Filters";
import { useEffect, useState } from "react";
import type { Filter, Sort } from "./types";

// import AppCard from "./components/AppCard";

function App() {
  const [sort, setSort] = useState<Sort>("dateAsc");
  const [filters, setFilters] = useState<Filter[]>([]);
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(8)
  const [dbQuery, setDbQuery] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const { data: result, isLoading, isError, error } = useQuery({
  queryKey: ["applications", {filters, sort, dbQuery, page, limit}],
  queryFn: () => fetchApplications({filters, sort, dbQuery, page, limit}),
  });

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

  return (
    <div className={cn("min-h-screen  bg-[#F1EFE8] pt-12 pb-12 flex relative")}>
      <Nav />
      <div className="w-[90%] max-w-325 h-full mx-auto pt-6 pb-4 flex flex-col">
        {result && <TopSection result={result} />}
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
          result && <AppTable result={result} />
        )}
      </div>
    </div>
  );
}

export default App;
