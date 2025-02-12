"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAllProjectsWithVariablesQuery } from "@/hooks/use-get-projects";
import { formatEther } from "viem";

export default function ProjectsList() {
  const { data } = useAllProjectsWithVariablesQuery();
  const projects = data.projects.items;

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
              <CardDescription>
                Deadline: {new Date(Number(project.expiresAt)).toISOString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <div className="mt-2">
                <p>
                  <strong>Bounty:</strong> {formatEther(project.reward)} tokens
                </p>
                <p>
                  <strong>Recipients:</strong> {project.maxAssignments}
                </p>
                <p>
                  <strong>Token Address:</strong>{" "}
                  {`${project.token.slice(0, 6)}...${project.token.slice(-4)}`}
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
  );
}
