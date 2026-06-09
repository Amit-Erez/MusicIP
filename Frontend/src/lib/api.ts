import type { Application } from "../types";

export async function fetchData(): Promise<Application[]> {
const res = await fetch("http://localhost:3000/api/applications");
const data = await res.json();
return data
}
