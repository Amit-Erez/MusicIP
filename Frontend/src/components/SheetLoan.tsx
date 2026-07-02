import { formatDate } from "@/lib/utils";
import type { Application } from "@/types";

export default function SheetLoan({ data }: { data: Application }) {
  return (
    <div className="border-b flex flex-col pt-4 pb-4 pl-5 pr-5 ">
      <h2 className="text-[#5F5E5A] font-medium uppercase mb-4">
        Loan request
      </h2>
      <dl className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <dt className="text-[#5F5E5A] text-[13px]">Amount requested</dt>
          <dd className="text-black text-[20px]">
            ${data.loanRequest.amountRequested.toLocaleString("en-US")}
          </dd>
        </div>
        <div>
          <dt className="text-[#5F5E5A] text-[13px]">Term requested</dt>
          <dd className="text-black text-[18px]">
            {data.loanRequest.term} Months
          </dd>
        </div>
        <div>
          <dt className="text-[#5F5E5A] text-[13px]">Date submitted</dt>
          <dd className="text-black text-[18px]">
            {formatDate(data.submittedAt)}
          </dd>
        </div>
        <div>
          <dt className="text-[#5F5E5A] text-[13px]">Purpose</dt>
          <dd className="text-black text-[18px]">
            {data.loanRequest.purpose[0].toUpperCase()}
            {data.loanRequest.purpose.slice(1)}
          </dd>
        </div>
        <div>
          <dt className="text-[#5F5E5A] text-[13px]">Jurisdiction</dt>
          <dd className="text-black text-[18px]">
            {data.applicant.country}
          </dd>
        </div>
        <div>
          <dt className="text-[#5F5E5A] text-[13px]">Contact email</dt>
          <dd className="text-black text-[16px]">
            <a href={`mailto:${data?.applicant.contactEmail}`}>
            {data.applicant.contactEmail}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
