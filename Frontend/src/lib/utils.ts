import type { Application } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 export function formatDate(dateString: string | null): string {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  export function calcTotal(data: Application[]): string {
    if(!data) return ""
    let total = 0
    for (const app of data) {
      total += app.loanRequest.amountRequested
    }
    return `$${total.toLocaleString('en-US')}`
  }

  export function amountPending(data: Application[]): string {
    if(!data) return ""
    let total = 0 
    for (const app of data) {
      if(app.status === "Pending") {
        total++
      } 
    }
    return `${total}`
  }

  export function amountFlagged(data: Application[]): string {
    if(!data) return ""
    let total = 0 
    for (const app of data) {
      if(app.flagged) {
        total++
      } 
    }
    return `${total}`
  }

  export function pillColor(appType: string): string {
    if(appType === "Independent Label" || appType === "Approved") return "indie"
    if(appType === "Rights Management" || appType === "Under Review") return "rights"
    if(appType === "Declined") return "dec"
    if(appType === "Publisher") return "pub"
    else return "coll"
  }