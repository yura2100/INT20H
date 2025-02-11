"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {useAccount, useConnect, useDisconnect} from "wagmi";

export function Header() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

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
            {isConnected && (
              <li>
                <Link href="/projects/create">Create Project</Link>
              </li>
            )}
          </ul>
        </nav>
        {isConnected ? (
          <Button onClick={() => disconnect()} variant="secondary">
            Logout
          </Button>
        ) : (
          <Button onClick={() => connect({ connector: connectors[0] })}>Login</Button>
        )}
      </div>
    </header>
  )
}
