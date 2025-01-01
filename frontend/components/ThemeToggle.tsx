'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const colors = [
  { name: 'Bleu', value: 'bg-blue-50 dark:bg-blue-900' },
  { name: 'Vert', value: 'bg-green-50 dark:bg-green-900' },
  { name: 'Rouge', value: 'bg-red-50 dark:bg-red-900' },
  { name: 'Mauve', value: 'bg-purple-50 dark:bg-purple-900' },
  { name: 'Orange', value: 'bg-orange-50 dark:bg-orange-900' },
  { name: 'Noir', value: 'bg-gray-100 dark:bg-gray-900' },
  { name: 'Blanc', value: 'bg-white dark:bg-gray-800' },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [bgColor, setBgColor] = useState(colors[0].value)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.className = bgColor
  }, [bgColor])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-4">
      <Select onValueChange={(value) => setBgColor(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Couleur de fond" />
        </SelectTrigger>
        <SelectContent>
          {colors.map((color) => (
            <SelectItem key={color.value} value={color.value}>
              {color.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="transition-transform hover:scale-110"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}

