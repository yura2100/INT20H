"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface Project {
  id: number
  name: string
  description: string
  deadline: string
}

export default function SubmitProject() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [description, setDescription] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch the project data from an API
    // For now, we'll use dummy data
    const dummyProject: Project = {
      id: Number(params.id),
      name: `Project ${params.id}`,
      description: `This is the description for Project ${params.id}.`,
      deadline: "2023-08-31T23:59",
    }
    setProject(dummyProject)
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!description || !agreeToTerms) {
      toast({
        title: "Submission Error",
        description: "Please provide a description and agree to the terms.",
        variant: "destructive",
      })
      return
    }

    // Here you would typically handle the actual submission process
    // For now, we'll just log the data and show a success message
    console.log("Submitting project:", { projectId: project?.id, description })

    toast({
      title: "Project Submitted",
      description: "Your project has been successfully submitted.",
    })

    // Redirect to the project details page after submission
    router.push(`/projects/${project?.id}`)
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Submit Project: {project.name}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Project Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="description">Submission Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your submission in detail..."
                className="min-h-[200px]"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                required
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                I confirm that this submission is my own work and complies with the project guidelines
              </Label>
            </div>
            <Button type="submit">Submit Project</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

