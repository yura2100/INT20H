"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import {useCreateProjectMutation} from "@/web3/hooks/use-create-project-mutation";
import {getAddress} from "viem";

export default function CreateProject() {
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [verifiers, setVerifiers] = useState("")
  const [whitelistedStudents, setWhitelistedStudents] = useState("")
  const [tokenAddress, setTokenAddress] = useState("")
  const [bountyAmount, setBountyAmount] = useState("")
  const [rewardRecipients, setRewardRecipients] = useState("")
  const { mutateAsync } = useCreateProjectMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await mutateAsync({
      name: projectName,
      description,
      expiresAt: new Date(deadline),
      students: whitelistedStudents.split(",").map((s) => getAddress(s.trim())),
      teachers: verifiers.split(",").map((s) => getAddress(s.trim())),
      maxAssignments: Number(rewardRecipients),
      token: getAddress(tokenAddress),
      reward: Number(bountyAmount),
    });
    toast({
      title: "Project Created",
      description: "Your project has been successfully created.",
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="projectName">Project Name</Label>
          <Input id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="verifiers">Verifiers (comma-separated)</Label>
          <Input
            id="verifiers"
            value={verifiers}
            onChange={(e) => setVerifiers(e.target.value)}
            placeholder="teacher1@example.com, teacher2@example.com"
          />
        </div>
        <div>
          <Label htmlFor="whitelistedStudents">Whitelisted Students (comma-separated, optional)</Label>
          <Input
            id="whitelistedStudents"
            value={whitelistedStudents}
            onChange={(e) => setWhitelistedStudents(e.target.value)}
            placeholder="student1@example.com, student2@example.com"
          />
        </div>
        <div>
          <Label htmlFor="tokenAddress">ERC20 Token Address</Label>
          <Input
            id="tokenAddress"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x1234..."
            required
          />
        </div>
        <div>
          <Label htmlFor="bountyAmount">Bounty Amount</Label>
          <Input
            id="bountyAmount"
            type="number"
            value={bountyAmount}
            onChange={(e) => setBountyAmount(e.target.value)}
            placeholder="100"
            required
          />
        </div>
        <div>
          <Label htmlFor="rewardRecipients">Number of Reward Recipients</Label>
          <Input
            id="rewardRecipients"
            type="number"
            value={rewardRecipients}
            onChange={(e) => setRewardRecipients(e.target.value)}
            placeholder="3"
            required
          />
        </div>
        <Button type="submit">Create Project</Button>
      </form>
    </div>
  )
}
