"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVerifyAssignmentMutation } from "@/web3/hooks/use-verify-assignment-mutation";
import { useState } from "react";
import { getAddress } from "viem";

interface Submission {
  id: string;
  student: string;
  status: string;
}

interface SubmissionsListProps {
  projectId: number;
  submissions: Submission[];
}

export function SubmissionsList({
  projectId,
  submissions: initialSubmissions,
}: SubmissionsListProps) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const { mutateAsync } = useVerifyAssignmentMutation();

  const handleApprove = async (submission: Submission) => {
    await mutateAsync({
      projectId,
      student: getAddress(submission.student),
    });
  };

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
            <TableCell>{submission.student}</TableCell>
            <TableCell>
              <Badge
                variant={
                  submission.status === "created"
                    ? "outline"
                    : submission.status === "finished"
                    ? "default"
                    : "destructive"
                }
              >
                {submission.status}
              </Badge>
            </TableCell>
            <TableCell>
              {submission.status === "created" && (
                <Button onClick={() => handleApprove(submission)}>
                  Approve
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
