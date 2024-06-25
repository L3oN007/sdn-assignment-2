"use client"

import React from "react"

import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export default function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative flex w-full", className)}>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
      <Input
        type="search"
        placeholder="Search..."
        className="rounded-md border-gray-300 pl-10 focus:border-gray-400 focus:ring-0"
        {...props}
      />
    </div>
  )
}
