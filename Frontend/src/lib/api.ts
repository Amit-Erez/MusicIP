import type { Application } from "../types";

export async function fetchApplications(): Promise<Application[]> {
  const res = await fetch("http://localhost:3000/api/applications");
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
