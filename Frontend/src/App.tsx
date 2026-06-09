import { cn } from "./lib/utils";
import {
  useQuery,
  // useMutation,
  // useQueryClient,
} from "@tanstack/react-query";
import { fetchData } from "./lib/api";

function App() {
  const result = useQuery({
    queryKey: ["applications"],
    queryFn: fetchData,
  });

  const { data, isLoading, isError, error } = result;

  return (
    <div
      className={cn(
        "min-h-screen bg-black text-white text-sm",
      )}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data?.map((app) => <div key={app.id}>{app.id}: {app.applicant.name}</div>)
      )
      }
    </div>
  );
}

export default App;
