"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { SubmissionsList } from "@/components/SubmissionsList"
import { useProjectQuery } from "@/hooks/use-get-project";

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
  const params = useParams<{id: string}>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const { data } = useProjectQuery(Number(params.id));
  const project = data?.project;

  useEffect(() => {
    // In a real application, you would fetch the project data from an API
    // For now, we'll use dummy data

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

  const teachers = project.userProjectRelation?.items.map(
    (item) => {
      if(item.user?.role === "teacher")
        return item.user;
    }
  ) ?? [];

  const whitelistedStudents = project.userProjectRelation?.items.map(
    (item) => {
      if(item.user?.role === "student")
        return item.user;
    }
  ) ?? [];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Deadline: {new Date(Number(project.expiresAt)).toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{project.description}</p>
          <h3 className="text-xl font-semibold mb-2">Verifiers</h3>
          <ul className="list-disc list-inside mb-4">
            {teachers.map((verifier, index) => {
              if(!verifier) return undefined;
              return <li key={index}>{verifier.email}</li>
            })}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Whitelisted Students</h3>
          <ul className="list-disc list-inside mb-4">
            {whitelistedStudents.map((student, index) => {
              if(!student) return undefined;
              return <li key={index}>{student.email}</li>
            })}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Bounty Details</h3>
          <p>
            <strong>Token Address:</strong> {project.token}
          </p>
          <p>
            <strong>Bounty Amount:</strong> {project.reward} tokens
          </p>
          <p>
            <strong>Number of Recipients:</strong> {project.maxAssignments}
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

