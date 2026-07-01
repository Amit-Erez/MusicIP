import type { Application, Filter, Result, Sort, Status } from "./types";
import { useEffect, useState } from "react";
import { cn } from "./lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApplications, toggleFlag } from "./lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Nav from "./components/Nav";
import TopSection from "./components/TopSection";
import Filters from "./components/Filters";
import AppTable from "./components/AppTable";
import AppCard from "./components/AppCard";

function App() {
  const [sort, setSort] = useState<Sort>("dateAsc");
  const [filters, setFilters] = useState<Filter[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [dbQuery, setDbQuery] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [appStatus, setAppStatus] = useState<Status | null>(null);
  const [confirmStatus, setConfirmStatus] = useState<boolean>(false);

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

  const queryClient = useQueryClient();
  const flagMutation = useMutation({
    mutationFn: ({ id, flagged }: { id: string; flagged: boolean }) =>
      toggleFlag(id, flagged),

    onMutate: async ({ id, flagged }) => {
      await queryClient.cancelQueries({
        queryKey: ["app", id],
      });

      queryClient.setQueryData(
        ["app", id],
        (oldApp: Application | undefined) => {
          if (!oldApp) return oldApp;

          return {
            ...oldApp,
            flagged,
          };
        },
      );

      queryClient.setQueriesData(
        { queryKey: ["applications"] },
        (oldResult: Result | undefined) => {
          if (!oldResult) return oldResult;

          return {
            ...oldResult,
            applications: oldResult.applications.map((app) =>
              app.id === id ? { ...app, flagged } : app,
            ),
          };
        },
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
      queryClient.invalidateQueries({ queryKey: ["app"] });
    },
  });

  function handleToggleFlag(id: string, flagged: boolean) {
    flagMutation.mutate({ id, flagged });
  }

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
      <div className="w-[90%] max-w-325 h-full mx-auto pt-6 pb-4 flex flex-col fadeIn">
        {sheetOpen && (
          <AppCard
            id={id}
            sheetOpen={sheetOpen}
            setSheetOpen={setSheetOpen}
            handleToggleFlag={handleToggleFlag}
            appStatus={appStatus}
            setAppStatus={setAppStatus}
            confirmStatus={confirmStatus}
            setConfirmStatus={setConfirmStatus}
          />
        )}
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
          <AppTable
            result={result}
            isLoading={isLoading}
            handleToggleFlag={handleToggleFlag}
            isFetching={isFetching}
            setSheetOpen={setSheetOpen}
            setId={setId}
          />
        )}
        <div className="flex p-2 justify-end items-center text-[#2C2C2A]">
          {isFetching && !isLoading && (
            <p className="mr-4 text-sm opacity-60">Updating...</p>
          )}
          {result && result.applications.length !== 0 ? (
            <>
              <button
                type="button"
                aria-label="Previous page"
                disabled={page === 1}
                className="mr-2 text-[18px]"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className={`transition-opacity ${page === 1 ? "opacity-60 cursor-auto" : "cursor-pointer hover:opacity-60"}`}
                />
              </button>
              <p className="text-[14px]" aria-live="polite">
                Showing page {result.page} of {result.maxPages}
              </p>
              <button
                type="button"
                aria-label="Next page"
                disabled={page === result.maxPages}
                className="ml-2 text-[18px]"
                onClick={() =>
                  setPage((prev) => Math.min(result.maxPages, prev + 1))
                }
              >
                <FontAwesomeIcon icon={faAngleRight} className={`transition-opacity ${page === result.maxPages ? "opacity-60 cursor-auto" : "cursor-pointer hover:opacity-60"}`} />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
