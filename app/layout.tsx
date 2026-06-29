import { Geist_Mono, Inter } from "next/font/google"

import Navbar from "@/components/navbar"
import { Footer } from "@/components/sticky-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-svh">
        <ThemeProvider>
          <div className="flex min-h-svh flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-7xl flex-1 px-6">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
