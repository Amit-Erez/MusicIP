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
import { faFlag as faFlagFull } from "@fortawesome/free-solid-svg-icons";

library.add(faFlag, faFlagFull);

export function AppTable({ result }: {result: Result}) {
  return (
    <div className="flex border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-80">APPLICANT</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>LOAN AMOUNT</TableHead>
            <TableHead className="text-right w-20">STATUS</TableHead>
            <TableHead className="text-right">FLAG</TableHead>
            <TableHead className="text-right w-50">SUBMITTED</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result?.applications.map((app: Application) => (
            <TableRow
              key={app.id}
              className="cursor-pointer bg-[#FFFFFF] hover:bg-[#F1EFE8]"
            >
              <TableCell className="font-medium">
                {app.applicant.name}
              </TableCell>
              <TableCell>
                <span className={`${pillColor(app.applicant.type)} p-1`}>
                  {app.applicant.type}
                </span>
              </TableCell>
              <TableCell>
                ${app.loanRequest.amountRequested.toLocaleString("en-US")}
              </TableCell>
              <TableCell className="text-right"><span className={`pill ${pillColor(app.status)}`}>
                {app.status}
                </span></TableCell>
              <TableCell className="text-right">
                {!app.flagged ? (
                  <FontAwesomeIcon icon={faFlag} />
                ) : (
                  <FontAwesomeIcon icon={faFlagFull} />
                )}
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
