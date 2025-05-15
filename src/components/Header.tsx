import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BookOpenIcon, CalculatorIcon } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <CalculatorIcon className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold">MathsAssist AI</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <nav className="hidden md:flex gap-6">
            <a
              href="#"
              className="text-sm font-medium hover:text-foreground transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Problem Library
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Resources
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Help
            </a>
          </nav>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>TC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
