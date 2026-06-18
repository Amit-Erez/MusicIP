import type { Application, Filter, Result, Sort, Status } from "../types";

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


export async function toggleFlag(id: string, flagged: boolean) {
const res = await fetch(`http://localhost:3000/api/applications/${id}`, {
  method: "PATCH",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({flagged})
})

if(!res.ok) {
  const error = await res.json()
  throw new Error(error.message)
}

return res.json();

}

export async function updateStatus(id: string, newStatus: Status) {
 const res = await fetch(`http://localhost:3000/api/applications/${id}/status`, {
  method: "PATCH",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({newStatus})
 }) 

 if(!res.ok) {
  const error = await res.json()
  throw new Error(error.message)
 }

 return res.json();

}

export async function addNote(id: string, message: string) {
  const res = await fetch(`http://localhost:3000/api/applications/${id}/notes`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({message})
  })

  if(!res.ok) {
    const error = await res.json()
    throw new Error(error.message)
  }
  setTimeout(() => {
    return res.json()
  }, 400)
}

export async function deleteNote(id: string, noteId: string) {
  const res = await fetch(`http://localhost:3000/api/applications/${id}/notes/${noteId}`, {
    method: "DELETE",
  })

  if(!res.ok) {
  const error = await res.json()
  throw new Error(error.message)
  }

  return res.json()
}