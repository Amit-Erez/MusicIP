import type { Application, Status } from "@/types";

export default function SheetStatus({
  data,
  appStatus,
  setAppStatus,
  setConfirmStatus,
  handleSave,
}: {
  data: Application;
  appStatus: Status;
  handleSave: (status: Status) => void;
  setAppStatus: (appStatus: Status) => void;
  setConfirmStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="border-b flex flex-col pt-4 pb-4 pl-5 pr-5 ">
      <h2 className="text-[#5F5E5A] font-medium uppercase mb-2">
        Application status
      </h2>
      <div>
        {appStatus && (
          <>
            <label htmlFor="status" className="sr-only">
              Application status
            </label>
            <select
              className="p-2 border w-1/2 rounded-[8px] outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] bg-[#F1EFE8] text-[16px] font-medium text-[#444441] shadow-lg"
              name="status"
              id="status"
              value={appStatus}
              onChange={(e) => {
                setAppStatus(e.target.value as Status);
                setConfirmStatus(false);
              }}
            >
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Declined">Declined</option>
            </select>
          </>
        )}
        <button
          type="button"
          className="border ml-4 p-2 rounded-[8px] cursor-pointer hover:bg-[#F1EFE8] transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7]"
          onClick={() => handleSave(data!.status)}
        >
          Save Status
        </button>
      </div>
    </div>
  );
}
