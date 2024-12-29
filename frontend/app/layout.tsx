import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/ThemeToggle'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard Admin',
  description: 'Tableau de bord administratif pour la gestion des étudiants et des cours',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="p-4 border-b">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dashboard Admin</h1>
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

