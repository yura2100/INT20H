"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Submission {
  id: number
  studentId: string
  status: "pending" | "approved" | "rejected"
}

interface SubmissionsListProps {
  projectId: number
  submissions: Submission[]
}

export function SubmissionsList({ projectId, submissions: initialSubmissions }: SubmissionsListProps) {
  const [submissions, setSubmissions] = useState(initialSubmissions)

  const handleApprove = (submissionId: number) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission.id === submissionId ? { ...submission, status: "approved" } : submission,
      ),
    )
    // In a real application, you would make an API call here to update the submission status
    console.log(`Approved submission ${submissionId} for project ${projectId}`)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell>{submission.studentId}</TableCell>
            <TableCell>
              <Badge
                variant={
                  submission.status === "approved"
                    ? "success"
                    : submission.status === "rejected"
                      ? "destructive"
                      : "default"
                }
              >
                {submission.status}
              </Badge>
            </TableCell>
            <TableCell>
              {submission.status === "pending" && <Button onClick={() => handleApprove(submission.id)}>Approve</Button>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

