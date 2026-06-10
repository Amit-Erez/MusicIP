import { cn } from "./lib/utils";
import {
  useQuery,
  // useMutation,
  // useQueryClient,
} from "@tanstack/react-query";
import { fetchApplications } from "./lib/api";
import AppCard from "./components/AppCard";

function App() {
  const result = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
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
        isError ?
          <div>{error.message}</div> :
          data?.map((app) => <div key={app.id}>{app.id}: {app.applicant.name}</div>)
        
      )
      }
      <div>
        <AppCard id={"app_012"} />
      </div>
    </div>
  );
}

export default App;
