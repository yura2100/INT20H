"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">Educational Platform</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link href="/projects/create">Create Project</Link>
              </li>
            )}
          </ul>
        </nav>
        {isLoggedIn ? (
          <Button onClick={() => setIsLoggedIn(false)} variant="secondary">
            Logout
          </Button>
        ) : (
          <Button onClick={() => setIsLoggedIn(true)}>Login</Button>
        )}
      </div>
    </header>
  )
}

