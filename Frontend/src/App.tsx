import { cn } from "./lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "./lib/api";
import Nav from "./components/Nav";
import { AppTable } from "./components/AppTable";
import TopSection from "./components/TopSection";

// import AppCard from "./components/AppCard";

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  return (
    <div
      className={cn(
        "min-h-screen h-screen bg-[#F1EFE8] pt-12 pb-12 flex relative",
      )}
    >
      <Nav />
      <div className="w-[90%] max-w-325 h-full mx-auto pt-6 pb-4 flex flex-col">
        {data && <TopSection data={data} />}
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <div>{error.message}</div>
        ) : (
          data && <AppTable data={data} />
        )}
      </div>
    </div>
  );
}

export default App;

