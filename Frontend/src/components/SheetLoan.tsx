import { formatDate } from "@/lib/utils";
import type { Application } from "@/types";

export default function SheetLoan({ data }: { data: Application }) {
  return (
    <div className="border-b flex flex-col pt-4 pb-4 pl-5 pr-5 ">
      <div className="text-[#5F5E5A] font-medium uppercase mb-4">
        Loan request
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <div className="text-[#5F5E5A] text-[13px]">Amount requested</div>
          <div className="text-black text-[20px]">
            ${data?.loanRequest.amountRequested.toLocaleString("en-US")}
          </div>
        </div>
        <div>
          <div className="text-[#5F5E5A] text-[13px]">Term requested</div>
          <div className="text-black text-[18px]">
            {data?.loanRequest.term} Months
          </div>
        </div>
        <div>
          <div className="text-[#5F5E5A] text-[13px]">Date submitted</div>
          <div className="text-black text-[18px]">
            {formatDate(data!.submittedAt)}
          </div>
        </div>
        <div>
          <div className="text-[#5F5E5A] text-[13px]">Purpose</div>
          <div className="text-black text-[18px]">
            {data?.loanRequest.purpose[0].toUpperCase()}
            {data?.loanRequest.purpose.slice(1)}
          </div>
        </div>
        <div>
          <div className="text-[#5F5E5A] text-[13px]">Jurisdiction</div>
          <div className="text-black text-[18px]">
            {data?.applicant.country}
          </div>
        </div>
        <div>
          <div className="text-[#5F5E5A] text-[13px]">Contact email</div>
          <div className="text-black text-[16px]">
            {data?.applicant.contactEmail}
          </div>
        </div>
      </div>
    </div>
  );
}
