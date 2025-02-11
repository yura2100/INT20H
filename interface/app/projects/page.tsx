"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

interface Project {
  id: number
  name: string
  description: string
  deadline: string
  tokenAddress: string
  bountyAmount: string
  rewardRecipients: number
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Here you would typically fetch projects from your backend
    // For now, we'll use dummy data
    setProjects([
      {
        id: 1,
        name: "Project 1",
        description: "Description for Project 1",
        deadline: "2023-06-30",
        tokenAddress: "0x1234567890123456789012345678901234567890",
        bountyAmount: "100",
        rewardRecipients: 3,
      },
      {
        id: 2,
        name: "Project 2",
        description: "Description for Project 2",
        deadline: "2023-07-15",
        tokenAddress: "0x0987654321098765432109876543210987654321",
        bountyAmount: "200",
        rewardRecipients: 5,
      },
      {
        id: 3,
        name: "Project 3",
        description: "Description for Project 3",
        deadline: "2023-08-01",
        tokenAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
        bountyAmount: "150",
        rewardRecipients: 2,
      },
    ])
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/projects/create">
          <Button>Create New Project</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>Deadline: {project.deadline}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <div className="mt-2">
                <p>
                  <strong>Bounty:</strong> {project.bountyAmount} tokens
                </p>
                <p>
                  <strong>Recipients:</strong> {project.rewardRecipients}
                </p>
                <p>
                  <strong>Token Address:</strong>{" "}
                  {`${project.tokenAddress.slice(0, 6)}...${project.tokenAddress.slice(-4)}`}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/projects/${project.id}`} passHref>
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

