import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Educational Platform</h1>
      <div className="flex space-x-4">
        <Link href="/projects">
          <Button>View Projects</Button>
        </Link>
        <Link href="/projects/create">
          <Button>Create Project</Button>
        </Link>
      </div>
    </div>
  )
}

