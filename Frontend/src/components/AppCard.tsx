import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNote, deleteNote, fetchApp, updateStatus } from "../lib/api";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { pillColor } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag as faFlag } from "@fortawesome/free-regular-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import type { Application, Result, Status } from "@/types";
import { useEffect, useState } from "react";
import SheetStatus from "./SheetStatus";
import SheetLoan from "./SheetLoan";
import SheetIP from "./SheetIP";
import SheetNotes from "./SheetNotes";
import Confirm from "./Confirm";
import DeleteDialog from "./DeleteDialog";

export default function AppCard({
  id,
  sheetOpen,
  appStatus,
  confirmStatus,
  setConfirmStatus,
  setAppStatus,
  setSheetOpen,
  handleToggleFlag,
}: {
  appStatus: Status | null;
  id: string;
  confirmStatus: boolean;
  setConfirmStatus: React.Dispatch<React.SetStateAction<boolean>>;
  sheetOpen: boolean;
  setSheetOpen: (sheetOpen: boolean) => void;
  setAppStatus: (appStatus: Status) => void;
  handleToggleFlag: (id: string, flagged: boolean) => void;
}) {
  const [message, setMessage] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: string;
  }>({ open: false, id: "" });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(id),
    placeholderData: (previousData) => previousData,
  });

  const queryClient = useQueryClient();

  const notesMutation = useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) =>
      addNote(id, message),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app"],
      });
      setTimeout(() => {
        setUpdating(false);
      }, 2200);
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, appStatus }: { id: string; appStatus: Status }) =>
      updateStatus(id, appStatus),

    onMutate: async ({ id, appStatus }) => {
      await queryClient.cancelQueries({
        queryKey: ["app", id],
      });

      queryClient.setQueryData(
        ["app", id],
        (oldApp: Application | undefined) => {
          if (!oldApp) return oldApp;

          return {
            ...oldApp,
            status: appStatus,
          };
        },
      );

      queryClient.setQueriesData(
        { queryKey: ["applications"] },
        (oldResult: Result | undefined) => {
          if (!oldResult) return oldResult;

          return {
            ...oldResult,
            applications: oldResult.applications.map((app) =>
              app.id === id ? { ...app, status: appStatus } : app,
            ),
          };
        },
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app"],
      });
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, noteId }: { id: string; noteId: string }) =>
      deleteNote(id, noteId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app"],
      });
      setTimeout(() => {
        setUpdating(false);
      }, 1000);
    },
  });

  function handleStatusChange(id: string, appStatus: Status) {
    statusMutation.mutate({ id, appStatus });
  }

  function handleSave(val: Status) {
    if (appStatus === val) return;
    setConfirmStatus(!confirmStatus);
  }

  function handleConfirm(answer: string, appStatus: Status) {
    if (answer === "no") {
      setAppStatus(data!.status);
      setConfirmStatus(false);
    } else {
      setConfirmStatus(false);
      handleStatusChange(id, appStatus);
    }
  }

  function createNote(message: string) {
    if (message.trim().length === 0) {
    setMessage("")
    return;
    }
    setUpdating(true);
    notesMutation.mutate({ id, message });
    setMessage("");
  }

  function handleDelete() {
    if (!confirmDelete.id) return;
    setUpdating(true);
    const noteId = confirmDelete.id;
    deleteMutation.mutate({ id, noteId });
    setConfirmDelete((prev) => ({
      ...prev,
      id: "",
    }));
  }

  useEffect(() => {
    if (!data) return;
    setAppStatus(data.status);
  }, [data, setAppStatus]);

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
                  <button
                    type="button"
                    aria-label={
                      data?.flagged ? "Unflag application" : "Flag application"
                    }
                    className={`absolute flex items-center justify-center border 
                  ${
                    data?.flagged
                      ? "bg-[#FAECE7] border-[#F5C4B3] text-[#D85A30]"
                      : "bg-[#FFFFFF] border-[#D3D1C7] text-[#888780]"
                  } 
                  rounded-[8px] w-8 h-8 p-2 right-16 cursor-pointer
                  outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7]
                  `}
                    onClick={() => {
                      handleToggleFlag(data!.id, !data?.flagged);
                    }}
                  >
                    <FontAwesomeIcon icon={faFlag} />
                  </button>
                </>
              ) : null}
            </>
          </SheetHeader>
          {isLoading && !data ? (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center justify-center bg-gray-300 animate-pulse h-full"
            >
              <span className="sr-only">Loading application details.</span>
              <FontAwesomeIcon
                icon={faCircleNotch}
                aria-hidden="true"
                className="text-6xl text-[#2C2C2A] animate-spin"
              />
            </div>
          ) : (
            <div className="relative h-full overflow-auto no-scrollbar">
              {confirmDelete.open && (
                <DeleteDialog 
                confirmDelete={confirmDelete}
                setConfirmDelete={setConfirmDelete}
                handleDelete={handleDelete}
                />
              )}
              {appStatus && (
                <>
                  {confirmStatus && appStatus !== data?.status ? (
                    <Confirm
                      handleConfirm={handleConfirm}
                      confirmStatus={confirmStatus}
                      setConfirmStatus={setConfirmStatus}
                      appStatus={appStatus}
                      data={data}
                    />
                  ) : null}
                </>
              )}
              {appStatus && data && (
                <>
                  <SheetStatus
                    data={data}
                    handleSave={handleSave}
                    appStatus={appStatus}
                    setAppStatus={setAppStatus}
                    setConfirmStatus={setConfirmStatus}
                  />
                  <SheetLoan data={data} />
                  <SheetIP data={data} />
                  <SheetNotes
                    data={data}
                    setMessage={setMessage}
                    message={message}
                    updating={updating}
                    setConfirmDelete={setConfirmDelete}
                    createNote={createNote}
                  />
                </>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
