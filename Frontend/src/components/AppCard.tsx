import { useQuery } from "@tanstack/react-query";
import { fetchApp } from "../lib/api";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatDate, pillColor } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag as faFlag } from "@fortawesome/free-regular-svg-icons";
import { faCircleNotch, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import type { Status } from "@/types";

export default function AppCard({
  id,
  sheetOpen,
  // flagLoad,
  // isFetching,
  appStatus,
  setAppStatus,
  setSheetOpen,
  handleFlagLoad,
  handleToggleFlag,
}: {
  // flagLoad: string;
  // isFetching: boolean;
  appStatus: Status;
  id: string;
  sheetOpen: boolean;
  setSheetOpen: (sheetOpen: boolean) => void;
  setAppStatus: (appStatus: Status) => void;
  handleFlagLoad: (id: string) => void;
  handleToggleFlag: (id: string, flagged: boolean) => void;
}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(id),
  });

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        {/* The sliding panel content */}
        <SheetContent className="border-l-4 border-[#E4E3DC]">
          <SheetHeader className="relative flex flex-col pt-4 pb-4 pl-5 pr-5 border-b">
            <>
              <SheetTitle className="text-[20px] font-medium">
                {data?.applicant.name ?? "Application details"}
              </SheetTitle>
              {isLoading ? (
                <SheetDescription>
                  Loading application details.
                </SheetDescription>
              ) : isError ? (
                <SheetDescription>{error.message}</SheetDescription>
              ) : data ? (
                <>
                  <SheetDescription className="flex items-center">
                    <span
                      className={`mr-2 text-[#0a0a0a] text-[16px] pill ${pillColor(data!.applicant.type)}`}
                    >
                      {data?.applicant.type}
                    </span>
                    <span className="mr-2 text-[#0a0a0a]">#{data?.id}</span>
                    <span className={`pill ${pillColor(data!.status)}`}>
                      <span className="text-[#2C2C2A]">{data?.status}</span>
                    </span>
                  </SheetDescription>
                  <div
                    className={`absolute flex items-center justify-center 
                  border 
                  ${
                    data?.flagged
                      ? "bg-[#FAECE7] border-[#F5C4B3] text-[#D85A30]"
                      : "bg-[#FFFFFF] border-[#D3D1C7] text-[#888780]"
                  } 
                  rounded-[8px] w-8 h-8 p-2 right-16 cursor-pointer`}
                    onClick={() => {
                      handleFlagLoad(data!.id);
                      handleToggleFlag(data!.id, !data?.flagged);
                    }}
                  >
                    <FontAwesomeIcon icon={faFlag} />
                  </div>
                </>
              ) : null}
            </>
          </SheetHeader>
          {isLoading ? (
            <div className="flex items-center justify-center bg-gray-300 animate-pulse h-full">
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="text-6xl text-[#2C2C2A] animate-spin"
              />
            </div>
          ) : (
            <>
              <div className="h-full overflow-auto no-scrollbar">
                <div className="border-b flex flex-col pt-4 pb-4 pl-5 pr-5 ">
                  <div className="text-[#5F5E5A] font-medium uppercase mb-2">
                    Application status
                  </div>
                  <div>
                    <select
                      className="p-2 border w-1/2 rounded-[8px] outline-0 bg-[#F1EFE8] text-[16px] font-medium text-[#444441]"
                      name="status"
                      id="status"
                      value={appStatus}
                      onChange={(e) => setAppStatus(e.target.value as Status)}
                    >
                      <option value="Under-Review">Under Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Declined">Declined</option>
                    </select>
                    <button className="border ml-4 p-2 rounded-[8px] cursor-pointer hover:bg-[#F1EFE8] transition-all active:scale-95">
                      Save Status
                    </button>
                  </div>
                </div>
                <div className="border-b flex flex-col pt-4 pb-4 pl-5 pr-5 ">
                  <div className="text-[#5F5E5A] font-medium uppercase mb-4">
                    Loan request
                  </div>
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: "1fr 1fr" }}
                  >
                    <div>
                      <div className="text-[#5F5E5A] text-[13px]">
                        Amount requested
                      </div>
                      <div className="text-black text-[20px]">
                        $
                        {data?.loanRequest.amountRequested.toLocaleString(
                          "en-US",
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#5F5E5A] text-[13px]">
                        Term requested
                      </div>
                      <div className="text-black text-[18px]">
                        {data?.loanRequest.term} Months
                      </div>
                    </div>
                    <div>
                      <div className="text-[#5F5E5A] text-[13px]">
                        Date submitted
                      </div>
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
                      <div className="text-[#5F5E5A] text-[13px]">
                        Jurisdiction
                      </div>
                      <div className="text-black text-[18px]">
                        {data?.applicant.country}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#5F5E5A] text-[13px]">
                        Contact email
                      </div>
                      <div className="text-black text-[16px]">
                        {data?.applicant.contactEmail}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b flex flex-col pt-4 pb-4 pl-5 pr-5 ">
                  <div className="text-[#5F5E5A] font-medium uppercase mb-4">
                    IP summary
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4">
                      <h2 className="text-[#5F5E5A] uppercase mb-2">Titles</h2>
                      <div className="font-medium text-[22px]">
                        {data?.ip.catalogueSize}
                      </div>
                    </div>
                    <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4">
                      <h2 className="text-[#5F5E5A] uppercase mb-2">
                        Est. Catalog Value
                      </h2>
                      <div className="font-medium text-[22px] text-[#534AB7]">
                        ${data?.ip.estimatedCatalogueValue.toLocaleString()}
                      </div>
                    </div>
                    <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4">
                      <h2 className="text-[#5F5E5A] uppercase mb-2">
                        Master Ownership
                      </h2>
                      <div className="font-medium text-[22px]">
                        {data?.ip.masterOwnership[0].toUpperCase()}
                        {data?.ip.masterOwnership.slice(1)}
                      </div>
                    </div>
                    <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4">
                      <h2 className="text-[#5F5E5A] uppercase mb-2">
                        Pub. Ownership
                      </h2>
                      <div className="font-medium text-[22px]">
                        {data?.ip.publishingOwnership}
                      </div>
                    </div>
                    <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4">
                      <h2 className="text-[#5F5E5A] uppercase mb-2">
                        Active Sync Deals
                      </h2>
                      <div className="font-medium text-[22px] text-[#0F6E56]">
                        {data?.ip.activeSyncDeals}
                      </div>
                    </div>
                    <div className="border rounded-lg bg-[#F1EFE8] border-[#D3D1C7] p-4">
                      <h2 className="text-[#5F5E5A] uppercase mb-2 text-[13px]">
                        Ann. Streaming Revenue
                      </h2>
                      <div className="font-medium text-[22px] text-[#D85A30]">
                        ${data?.ip.annualStreamingRevenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col pt-4 pb-4 pl-5 pr-5 ">
                  <div className="text-[#5F5E5A] font-medium uppercase mb-2">
                    Internal notes
                  </div>
                  <textarea
                    className="p-2 bg-[#F1EFE8] rounded-lg h-20 mb-2 outline-0"
                    name=""
                    id=""
                    placeholder="Add a note..."
                  ></textarea>
                  <div className="flex justify-end pb-4">
                    <button className="border max-w-30 p-2 rounded-[8px] cursor-pointer hover:bg-[#F1EFE8] transition-all active:invert">
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="mr-2 text-xs"
                      />
                      Add note
                    </button>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 border-t" />
                    <span className="px-3">
                      {data?.notes.length === 0
                        ? "No notes"
                        : data?.notes.length === 1
                          ? "1 note"
                          : `${data?.notes.length} notes`}
                    </span>
                    <div className="flex-1 border-t" />
                  </div>
                  {data && data.notes.length > 0 && 
                   data.notes.map((note) => (
                     <div className="border-b pl-2 pr-2">
                    <div className="flex justify-between mb-2">
                        <div>Author: {note.author}</div>
                        <div className="text-[#5F5E5A]">{formatDate(note.createdAt)}</div>
                    </div>
                    <div className="mb-2 text-[#5F5E5A]">
                    {note.text}
                    </div>
                  </div>
                  ))
                    }
                </div>
              </div>
              {/* <SheetFooter>
                <SheetClose>Save changes</SheetClose>
              </SheetFooter> */}
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

// <>
//   {isLoading ? (
//     <div>Loading...</div>
//   ) : (
//     <div>
//       <p>**********</p>
//       {isError ? (
//         <p>{error.message}</p>
//       ) : (
//         <p>
//           {data?.id}: {data?.applicant.name}
//         </p>
//       )}
//     </div>
//   )}
// </>
