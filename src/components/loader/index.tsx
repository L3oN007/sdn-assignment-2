import React from "react"

import { cn } from "@/lib/utils"

import { Spinner } from "@/components/spinner"

type LoaderProps = {
  loading: boolean
  children: React.ReactNode
  className?: string
  noPadding?: boolean
}

export function Loader({
  loading,
  children,
  noPadding,
  className,
}: LoaderProps) {
  return loading ? (
    <div className={cn(className || "flex w-full justify-center py-5")}>
      <Spinner noPadding={noPadding} />
    </div>
  ) : (
    children
  )
}
