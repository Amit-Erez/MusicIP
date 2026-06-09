import { useEffect, useState } from "react"
import { cn } from "./lib/utils"
import type { Application } from "./types";


function App() {
  const [apps, setApps] = useState<Application[]>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const res = await fetch("http://localhost:3000/api/applications");
      const data = await res.json()
      console.log(data)
      setApps(data)
      setLoading(false)
    }

    fetchData()
  },[])

  return (
    <div className={cn(
        "h-screen flex items-center justify-center bg-black text-white text-2xl"
      )}>
      <p>Template Ready</p>
    </div>
  )
}

export default App
