import { calcTotal } from "@/lib/utils";
import type { Result } from "@/types";

export default function Kpi({ result }: { result: Result }) {
  return (
    <section className="flex pt-4 pb-4 h-full" aria-label="Applications summary">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full" aria-live="polite" aria-atomic="true">
        <div className="flex flex-col border rounded-lg bg-[#FFFFFF] border-[#D3D1C7] p-4 shadow-lg">
          <div className="w-full">
            <div className="text-[#5F5E5A] text-[14px] md:text-[16px]">SHOWING:</div>
            <div className="font-medium text-[22px] text-gray-800">
              {result?.totalResults} of {result?.totalApps}
            </div>
          </div>
        </div>
        <div className="border rounded-lg bg-[#FFFFFF] border-[#D3D1C7] p-4 shadow-lg">
          <div className="text-[#5F5E5A] text-[14px] md:text-[16px]">PENDING REVIEW</div>
          <div className="font-medium text-[22px] text-[#534AB7]">
            {result?.totalPending}
          </div>
          <p className="text-sm text-[#5F5E5A]">Needs attention</p>
        </div>
        <div className="border rounded-lg bg-[#FFFFFF] border-[#D3D1C7] p-4 shadow-lg">
          <div className="text-[#5F5E5A] text-[14px] md:text-[16px]">TOTAL REQUESTED</div>
          <div className="font-medium text-[18px] md:text-[20px]">
            {calcTotal(result?.applications)}
          </div>
          <p className="text-sm text-[#5F5E5A]">In page</p>
        </div>
        <div className="border rounded-lg bg-[#FFFFFF] border-[#D3D1C7] p-4 shadow-lg">
          <div className="text-[#5F5E5A] text-[14px] md:text-[16px]">FLAGGED</div>
          <div className="font-medium text-[22px] text-[#D85A30]">
            {result?.totalFlagged}
          </div>
          <p className="text-sm text-[#5F5E5A]">For follow-up</p>
        </div>
      </div>
    </section>
  );
}
