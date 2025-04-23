import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative h-10 w-10 p-0 rounded-full shadow-lg bg-background/90 backdrop-blur-sm border-2"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-5 w-5">
              <Sun className="absolute h-5 w-5 transition-all rotate-0 scale-100 dark:rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <span>浅色</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
          <Moon className="h-4 w-4" />
          <span>深色</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
          <span>💻</span>
          <span>系统</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 