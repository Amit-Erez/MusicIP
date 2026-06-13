import type { Application, Filter, Result, Sort } from "../types";

export async function fetchApplications({
  filters,
  sort,
  dbQuery,
  page,
  limit
}: {
  filters: Filter[],
  sort: Sort,
  dbQuery: string,
  page: number,
  limit: number
}): Promise<Result> {

  const params = new URLSearchParams();
  params.append("sort", sort);
  params.append("dbQuery", dbQuery);
  params.append("page", page.toString());
  params.append("limit", limit.toString())
  filters.forEach((filter) => {
    params.append("filters", filter);
  });

  const res = await fetch(`http://localhost:3000/api/applications?${params}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function fetchApp(id: string): Promise<Application> {
  const res = await fetch(`http://localhost:3000/api/applications/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
