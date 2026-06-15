import { cn } from "./lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "./lib/api";
import Nav from "./components/Nav";
import { AppTable } from "./components/AppTable";
import TopSection from "./components/TopSection";
import Filters from "./components/Filters";
import { useEffect, useState } from "react";
import type { Filter, Sort } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [sort, setSort] = useState<Sort>("dateAsc");
  const [filters, setFilters] = useState<Filter[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [dbQuery, setDbQuery] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const {
    data: result,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["applications", { filters, sort, dbQuery, page, limit }],
    queryFn: () => fetchApplications({ filters, sort, dbQuery, page, limit }),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDbQuery(query);
    }, 300);

    return () => clearTimeout(timerId);
  }, [query]);

  // *** adding / removing filters *** //
  function editFilters(filter: Filter): void {
    setPage(1);
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
        <TopSection isLoading={isLoading} result={result} />
        <Filters
          limit={limit}
          setLimit={setLimit}
          sort={sort}
          setSort={setSort}
          editFilters={editFilters}
          filters={filters}
          query={query}
          setQuery={setQuery}
        />
        {isError ? (
          <div>{error.message}</div>
        ) : (
          <AppTable result={result} isLoading={isLoading} />
        )}
        <div className="flex p-2 justify-end items-center text-[#2C2C2A]">
          {isFetching && !isLoading && (
            <p className="mr-4 text-sm opacity-60">Updating...</p>
          )}
          {result && result.applications.length !== 0 ? (
            <>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={`mr-2 text-[18px] transition-opacity ${page === 1 ? "opacity-60 cursor-auto" : "cursor-pointer hover:opacity-60"}`}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              />
              <p className="text-[14px]">
                Showing page {result.page} of {result.maxPages}
              </p>
              <FontAwesomeIcon
                icon={faAngleRight}
                className={`ml-2 text-[18px] transition-opacity ${page === result.maxPages ? "opacity-60 cursor-auto" : "cursor-pointer hover:opacity-60"}`}
                onClick={() =>
                  setPage((prev) => Math.min(result.maxPages, prev + 1))
                }
              />
            </>
          ): null}
        </div>
      </div>
    </div>
  );
}

export default App;
