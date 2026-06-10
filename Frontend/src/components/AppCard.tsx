import { useQuery } from "@tanstack/react-query";
import { fetchApp } from "../lib/api";

export default function AppCard({ id }: { id: string }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["app", id],
    queryFn: () => fetchApp(id),
  });

  if (data) {
    console.log(data);
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>**********</p>
          {isError ? (
            <p>{error.message}</p>
          ) : (
            <p>
              {data?.id}: {data?.applicant.name}
            </p>
          )}
        </div>
      )}
    </>
  );
}
