import type { ReactNode } from "react"
import { Header } from "./components/Header"
import { Web3Provider } from "@/web3/web3-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
      <Web3Provider>
        <QueryProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </QueryProvider>
      </Web3Provider>
      </body>
    </html>
  )
}

export const metadata = {
  generator: 'v0.dev'
};
