import type { Filter, Sort } from "@/types";
import { useEffect, useRef, useState } from "react";

export default function Filters({
  limit,
  setLimit,
  sort,
  setSort,
  query,
  setQuery,
  filters,
  editFilters,
}: {
  limit: number;
  setLimit: (limit: number) => void;
  sort: Sort;
  setSort: (sort: Sort) => void;
  query: string;
  setQuery: (query: string) => void;
  filters: Filter[];
  editFilters: (filter: Filter) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-wrap w-full min-h-10 pb-4 items-center justify-between">
      <label htmlFor="limit" className="sr-only">
        Applications per page
      </label>
      <select
        name="limit"
        id="limit"
        value={limit}
        className="h-8 outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] rounded  hidden sm:block"
        onChange={(e) => setLimit(Number(e.target.value))}
      >
        <option value="10">10 per page</option>
        <option value="25">25 per page</option>
        <option value="50">50 per page</option>
      </select>
      <div className="flex flex-wrap gap-2 items-center">
        <div className="min-w-40 max-w-50">
          <label htmlFor="search" className="sr-only">
            Search applicants
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search Applicants..."
            value={query}
            className="border border-[#D3D1C7] bg-[#F1EFE8] rounded-[10px] h-10 p-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls="status-filters"
              className="relative h-10 border p-1.5 mr-2 rounded-[10px] cursor-pointer hover:bg-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7]"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Open Filters
            </button>
            {isOpen && (
              <div
                id="status-filters"
                className="absolute top-10  w-38 flex flex-col p-2 z-10 bg-white rounded-[8px] border"
              >
                <div>
                  <input
                    type="checkbox"
                    id="Approved"
                    name="Approved"
                    checked={filters.includes("Approved")}
                    onChange={() => {
                      editFilters("Approved");
                    }}
                  />
                  <label
                    htmlFor="Approved"
                    className="ml-2 mr-1 cursor-pointer"
                  >
                    Approved
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Under-Review"
                    name="Under-Review"
                    checked={filters.includes("Under Review")}
                    onChange={() => editFilters("Under Review")}
                  />
                  <label
                    htmlFor="Under-Review"
                    className="ml-2 mr-1 cursor-pointer"
                  >
                    Under Review
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Pending"
                    name="Pending"
                    checked={filters.includes("Pending")}
                    onChange={() => editFilters("Pending")}
                  />
                  <label htmlFor="Pending" className="ml-2 mr-1 cursor-pointer">
                    Pending
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Declined"
                    name="Declined"
                    checked={filters.includes("Declined")}
                    onChange={() => editFilters("Declined")}
                  />
                  <label
                    htmlFor="Declined"
                    className="ml-2 mr-1 cursor-pointer"
                  >
                    Declined
                  </label>
                </div>
              </div>
            )}
          </div>
          <label htmlFor="sort" className="sr-only">
            Sort applications
          </label>
          <select
            name="sort"
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-8 outline-none focus-visible:ring-2 rounded focus-visible:ring-[#534AB7]"
          >
            <option value="dateAsc">By Date Asc</option>
            <option value="dateDesc">By Date Desc</option>
            <option value="loanAsc">By Loan Asc</option>
            <option value="loanDesc">By Loan Desc</option>
          </select>
        </div>
      </div>
    </div>
  );
}
