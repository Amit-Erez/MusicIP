import type { Result } from "@/types";
import Kpi from "./Kpi";

export default function TopSection({
  result,
  isLoading,
}: {
  result: Result | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <section className="flex flex-col  min-h-0 h-1/4" aria-busy={isLoading}>
        <h1 className="text-[#2C2C2A] text-[18px] font-medium">
          Funding applications
        </h1>
        <p className="text-[13px] text-[#5F5E5A] font-medium">
          Review and manage submitted applications from labels, publishers, and
          music companies.
        </p>
        <div className="flex pt-4 pb-4 h-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                aria-hidden="true"
                className="border rounded-lg bg-gray-300 border-[#D3D1C7] h-27.75 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <section className="flex flex-col  min-h-0 h-1/4">
      <h1 className="text-[#2C2C2A] text-[18px] font-medium">
        Funding applications
      </h1>
      <p className="text-[13px] text-[#5F5E5A] font-medium">
        Review and manage submitted applications from labels, publishers, and
        music companies.
      </p>
      <Kpi result={result} />
    </section>
  );
}
