import type { Application } from "@/types";

export default function SheetIP({ data }: { data: Application }) {
  return (
    <div className="border-b flex flex-col pt-4 pb-4 pl-5 pr-5 ">
      <h2 className="text-[#5F5E5A] font-medium uppercase mb-4">
        IP summary
      </h2>
      <div className="grid grid-cols-2 [@media(min-width:1020px)]:grid-cols-3 gap-4">
        <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4 shadow-lg">
          <p className="text-[#5F5E5A] uppercase mb-2 text-[12px] md:text-[14px]">Titles</p>
          <div className="font-medium text-[18px] md:text-[22px]">
            {data?.ip.catalogueSize}
          </div>
        </div>
        <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4 shadow-lg">
          <p className="text-[#5F5E5A] uppercase mb-2 text-[12px] md:text-[14px]">Est. Catalog Value</p>
          <div className="font-medium text-[18px] md:text-[20px] text-[#534AB7]">
            ${data?.ip.estimatedCatalogueValue.toLocaleString()}
          </div>
        </div>
        <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4 shadow-lg">
          <p className="text-[#5F5E5A] uppercase mb-2 text-[12px] md:text-[14px]">Master Ownership</p>
          <div className="font-medium text-[18px] md:text-[22px]">
            {data?.ip.masterOwnership[0].toUpperCase()}
            {data?.ip.masterOwnership.slice(1)}
          </div>
        </div>
        <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4 shadow-lg">
          <p className="text-[#5F5E5A] uppercase mb-2 text-[12px] md:text-[14px]">Pub. Ownership</p>
          <div className="font-medium text-[18px] md:text-[22px]">
            {data?.ip.publishingOwnership}
          </div>
        </div>
        <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4 shadow-lg">
          <p className="text-[#5F5E5A] uppercase mb-2 text-[12px] md:text-[14px]">Active Sync Deals</p>
          <div className="font-medium text-[18px] md:text-[22px] text-[#0F6E56]">
            {data?.ip.activeSyncDeals}
          </div>
        </div>
        <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4 shadow-lg">
          <p className="text-[#5F5E5A] uppercase mb-2 text-[12px] md:text-[13px]">
            Ann. Streaming Revenue
          </p>
          <div className="font-medium text-[18px] md:text-[22px] text-[#D85A30]">
            ${data?.ip.annualStreamingRevenue.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
