import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Application, Status } from "@/types";

export default function ConfirmDialog({
  data,
  handleConfirm,
  confirmStatus,
  setConfirmStatus,
  appStatus,
}: {
  data: Application | undefined;
  appStatus: Status;
  handleConfirm: (answer: string, status: Status) => void;
  confirmStatus: boolean;
  setConfirmStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={confirmStatus} onOpenChange={setConfirmStatus}>
      <DialogContent className="flex flex-col bg-white rounded-lg p-4 shadow-lg h-44 w-80 text-center items-center justify-center">
        <DialogHeader>
          <DialogTitle className="text-center leading-5">
            Status will change from <br /> "{data?.status}" to "{appStatus}".
          </DialogTitle>

          <DialogDescription>
            <div>
              <p id="status-change-description" className="mt-2">
                Are you sure?
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center ">
          <button
            type="button"
            className="bg-[#FAECE7] border-[#F5C4B3] 
                text-[#D85A30] w-20 p-2 rounded-[8px] 
                outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7]        
                cursor-pointer hover:bg-[#F1EFE8] 
                transition-all active:scale-95"
            onClick={() => handleConfirm("no", appStatus)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-[#62bfa852] border border-[#62bfa8b1] 
                text-[#0F6E56] w-20 ml-4 p-2 rounded-[8px] cursor-pointer 
                outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7]      
                hover:bg-[#F1EFE8] transition-all active:scale-95"
            onClick={() => handleConfirm("yes", appStatus)}
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
