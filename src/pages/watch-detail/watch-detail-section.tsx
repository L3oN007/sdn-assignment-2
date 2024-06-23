import React from "react"

import { Star } from "lucide-react"

import { Separator } from "@/components/ui/separator"

type Props = {
  watchName: string
  brandName: string
  watchDescription: string
  image: string
  price: number
  automatic: boolean
  avgRating: number
}
export default function WatchDetailSection({
  watchName,
  watchDescription,
  brandName,
  image,
  price,
  automatic,
  avgRating,
}: Props) {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      <div className="aspect-square overflow-hidden sm:rounded-lg">
        <img src={image} alt="img" className="object-cover object-center" />
      </div>

      <div className="mt-4 px-4 sm:px-0 lg:mt-0">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {watchName}
        </h1>
        <div className="mt-3 flex flex-col items-start justify-start">
          <p className="text-lg text-zinc-700">{watchDescription}</p>
          <h3 className="mb-2 text-3xl font-semibold mt-8"> $ {price}</h3>
          <Separator className="mb-4" />
          <div className="flex items-center gap-8 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                className="size-4 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Brand</p>

                <p className="font-medium">{brandName}</p>
              </div>
            </div>
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-watch"
              >
                <circle cx="12" cy="12" r="6" />
                <polyline points="12 10 12 12 13 13" />
                <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" />
                <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" />
              </svg>

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Automatic</p>

                <p className="font-medium">{automatic ? "Yes" : "No"}</p>
              </div>
            </div>
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <Star className="size-4" />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Avg Rating</p>

                <p className="font-medium">{avgRating} / 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
