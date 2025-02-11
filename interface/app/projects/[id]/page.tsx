"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { SubmissionsList } from "@/components/SubmissionsList"

interface Project {
  id: number
  name: string
  description: string
  deadline: string
  verifiers: string[]
  whitelistedStudents: string[]
  tokenAddress: string
  bountyAmount: string
  rewardRecipients: number
}

interface Submission {
  id: number
  studentId: string
  status: "pending" | "approved" | "rejected"
}

export default function ProjectDetails() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    // In a real application, you would fetch the project data from an API
    // For now, we'll use dummy data
    const dummyProject: Project = {
      id: Number(params.id),
      name: `Project ${params.id}`,
      description: `This is a detailed description for Project ${params.id}. It includes all the necessary information for students to complete the project successfully.`,
      deadline: "2023-08-31T23:59",
      verifiers: ["teacher1@example.com", "teacher2@example.com"],
      whitelistedStudents: ["student1@example.com", "student2@example.com", "student3@example.com"],
      tokenAddress: "0x1234567890123456789012345678901234567890",
      bountyAmount: "1000",
      rewardRecipients: 3,
    }
    setProject(dummyProject)

    // Dummy submissions data
    const dummySubmissions: Submission[] = [
      { id: 1, studentId: "student1@example.com", status: "pending" },
      { id: 2, studentId: "student2@example.com", status: "approved" },
      { id: 3, studentId: "student3@example.com", status: "pending" },
    ]
    setSubmissions(dummySubmissions)
  }, [params.id])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Deadline: {new Date(project.deadline).toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{project.description}</p>
          <h3 className="text-xl font-semibold mb-2">Verifiers</h3>
          <ul className="list-disc list-inside mb-4">
            {project.verifiers.map((verifier, index) => (
              <li key={index}>{verifier}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Whitelisted Students</h3>
          <ul className="list-disc list-inside mb-4">
            {project.whitelistedStudents.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Bounty Details</h3>
          <p>
            <strong>Token Address:</strong> {project.tokenAddress}
          </p>
          <p>
            <strong>Bounty Amount:</strong> {project.bountyAmount} tokens
          </p>
          <p>
            <strong>Number of Recipients:</strong> {project.rewardRecipients}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Submit Your Work</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Ready to submit your project? Click the button below to provide a description of your work.
          </p>
          <Link href={`/projects/${project.id}/submit`} passHref>
            <Button>Submit Project</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {submissions.length > 0 ? (
            <SubmissionsList projectId={project.id} submissions={submissions} />
          ) : (
            <p>No submissions yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

