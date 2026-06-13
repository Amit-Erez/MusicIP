import { amountFlagged, amountPending, calcTotal } from "@/lib/utils";
import type { Result } from "@/types";

export default function TopSection({ result }: {result: Result}) {


  return (
    <div className="flex flex-col  min-h-0 h-1/4">
      <h1 className="text-[#2C2C2A] text-[18px] font-medium">
        Funding applications
      </h1>
      <p className="text-[13px] text-[#5F5E5A] font-medium">
        Review and manage submitted applications from labels, publishers, and
        music companies.
      </p>
      <div className="flex pt-4 pb-4 h-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          <div className="border rounded-lg bg-[#FFFFFF] border-[#D3D1C7] p-4">
            <h2 className="text-[#5F5E5A]">TOTAL APPLICATIONS</h2>
            <div className="font-medium text-[22px]">{result?.applications.length}</div>
            <p className="text-sm text-[#5F5E5A]">All time</p>
          </div>
          <div className="border rounded-lg bg-[#FFFFFF] border-[#D3D1C7] p-4">
            <h2 className="text-[#5F5E5A]">PENDING REVIEW</h2>
            <div className="font-medium text-[22px] text-[#534AB7]">{amountPending(result?.applications)}</div>
            <p className="text-sm text-[#5F5E5A]">Needs attention</p>
          </div>
          <div className="border rounded-lg bg-[#FFFFFF] border-[#D3D1C7] p-4">
            <h2 className="text-[#5F5E5A]">TOTAL REQUESTED</h2>
            <div className="font-medium text-[22px]">{calcTotal(result?.applications)}</div>
            <p className="text-sm text-[#5F5E5A]">Across all open</p>
          </div>
          <div className="border rounded-lg bg-[#FFFFFF] border-[#D3D1C7] p-4">
            <h2 className="text-[#5F5E5A]">FLAGGED</h2>
            <div className="font-medium text-[22px] text-[#D85A30]">{amountFlagged(result?.applications)}</div>
            <p className="text-sm text-[#5F5E5A]">For follow-up</p>
          </div>
        </div>
      </div>
    </div>
  );
}
