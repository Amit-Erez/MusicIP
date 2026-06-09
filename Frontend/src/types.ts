export type Status =
  | "Pending"
  | "Under Review"
  | "Approved"
  | "Declined"
  | "Flagged"

export type Applicant = {
  name: string
  type: string
  country: string
  contactEmail: string
}

export type IPDetails = {
  catalogueSize: number
  estimatedCatalogueValue: number
  masterOwnership: string
  publishingOwnership: string
  activeSyncDeals: number
  annualStreamingRevenue: number
}

export type LoanRequest = {
  amountRequested: number
  term: number
  purpose: string
}

export type Note = {
  id: string
  author: string
  text: string
  createdAt: string
}

export type Application = {
  id: string
  submittedAt: string
  status: Status
  flagged: boolean
  applicant: Applicant
  ip: IPDetails
  loanRequest: LoanRequest
  notes: Note[]
}