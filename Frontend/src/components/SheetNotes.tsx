import { formatDate } from "@/lib/utils";
import type { Application } from "@/types";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function SheetNotes({ 
data,
message,
updating,
setConfirmDelete,
setMessage,
createNote,
}: { 
data: Application;
message: string;
updating: boolean;
createNote: (message: string) => void;
setMessage: (message: string) => void;
setConfirmDelete: React.Dispatch<React.SetStateAction<{ open: boolean; id: string }>>;
}) {
  return (
    <div className="flex flex-col pt-4 pb-4 pl-5 pr-5 ">
      <div className="text-[#5F5E5A] font-medium uppercase mb-2">
        Internal notes
      </div>
      <textarea
        className="p-2 bg-[#F1EFE8] rounded-lg h-20 mb-2 outline-0 shadow-lg"
        name="note"
        id="note"
        value={message}
        placeholder="Add a note..."
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div className="flex justify-end pb-4">
        <button
          className="border w-30 p-2 rounded-[8px] cursor-pointer hover:bg-[#F1EFE8] transition-all active:invert"
          disabled={updating}
          onClick={() => {
            createNote(message);
          }}
        >
          {updating ? (
            <FontAwesomeIcon
              icon={faCircleNotch}
              className="text-sm text-[#2C2C2A] animate-spin"
            />
          ) : (
            <>
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2 text-xs" />
              <span>Add note</span>
            </>
          )}
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
      {data &&
        data.notes.length > 0 &&
        data.notes.map((note) => (
          <div key={note.id} className="border-b pl-2 pr-2 mt-2.5">
            <div className="flex justify-between mb-2">
              <div>Author: {note.author}</div>
              <div className="text-[#5F5E5A]">{formatDate(note.createdAt)}</div>
            </div>
            <div className="flex justify-between">
              <div className="mb-4 text-[#5F5E5A] w-[80%] min-w-0 wrap-break-word">
                {note.text}
              </div>
              <button
                className="bg-[#FAECE7] text-[#D85A30] border rounded-[8px] p-1 h-full cursor-pointer hover:bg-[#F1EFE8] transition-all active:scale-95"
                onClick={() => setConfirmDelete({ open: true, id: note.id })}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
