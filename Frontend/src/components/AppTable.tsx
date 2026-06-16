import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, pillColor } from "@/lib/utils";
import type { Application, Result } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFlag as faFlag } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleNotch,
  faFlag as faFlagFull,
} from "@fortawesome/free-solid-svg-icons";

library.add(faFlag, faFlagFull);

export function AppTable({
  result,
  isLoading,
  // isFetching,
  setId,
  setSheetOpen,
  handleToggleFlag,
  handleFlagLoad,
}: {
  result: Result | undefined;
  isLoading: boolean;
  isFetching: boolean;
  setId: (id: string) => void;
  setSheetOpen: (sheetOpen: boolean) => void;
  handleFlagLoad: (id: string) => void;
  handleToggleFlag: (id: string, flagged: boolean) => void;
}) {

  if (isLoading && !result) {
    return (
      <div className="flex items-center justify-center border rounded-lg overflow-hidden h-[411.5px] bg-gray-300 animate-pulse">
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="text-4xl text-[#2C2C2A] animate-spin"
        />
      </div>
    );
  }

  if (result && result.applications.length === 0) {
    return (
      <div className="flex justify-center border rounded-lg overflow-hidden h-[411.5px] bg-gray-300 p-4 fadeIn">
        <h1>No results found</h1>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="flex border rounded-lg overflow-hidden">
      <Table className="text-[#2C2C2A]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-80 text-[#2C2C2A]">APPLICANT</TableHead>
            <TableHead className="text-[#2C2C2A]">TYPE</TableHead>
            <TableHead className="text-[#2C2C2A]">LOAN AMOUNT</TableHead>
            <TableHead className="text-right w-20 text-[#2C2C2A]">
              STATUS
            </TableHead>
            <TableHead className="text-right text-[#2C2C2A]">FLAG</TableHead>
            <TableHead className="text-right w-50 text-[#2C2C2A]">
              SUBMITTED
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.applications.map((app: Application) => (
            <TableRow
              key={app.id}
              className="cursor-pointer bg-[#FFFFFF] hover:bg-[#F1EFE8]"
              onClick={() => {
                setId(app.id);
                setSheetOpen(true);
              }}
            >
              <TableCell className="font-medium">
                {app.applicant.name}
              </TableCell>
              <TableCell>
                <span className="p-1">{app.applicant.type}</span>
              </TableCell>
              <TableCell>
                ${app.loanRequest.amountRequested.toLocaleString("en-US")}
              </TableCell>
              <TableCell className="text-right">
                <span className={`pill ${pillColor(app.status)}`}>
                  {app.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div
                  className="relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFlagLoad(app.id);
                    handleToggleFlag(app.id, !app.flagged);
                  }}
                >
                  {!app.flagged ? (
                    <FontAwesomeIcon icon={faFlag} />
                  ) : (
                    <FontAwesomeIcon icon={faFlagFull} />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatDate(app.submittedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
