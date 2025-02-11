"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {useVerifyAssignmentMutation} from "@/web3/hooks/use-verify-assignment-mutation";
import {getAddress} from "viem";

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
  const { mutateAsync } = useVerifyAssignmentMutation();

  const handleApprove = async (submission: Submission) => {
    await mutateAsync({
      projectId,
      student: getAddress(submission.studentId),
    });
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
              {submission.status === "pending" && <Button onClick={() => handleApprove(submission)}>Approve</Button>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

