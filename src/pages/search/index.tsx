import { useEffect, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import qs from "query-string"

import { BrandType } from "@/schemas/brand.schema"
import { WatchResponseType } from "@/schemas/watch.schema"

import api from "@/lib/api"

import useDebounce from "@/hooks/use-debounce"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Loader } from "@/components/loader"
import SearchInput from "@/components/search-input"
import WatchCard from "@/components/watch-card"

export default function SearchPage() {
  const [value, setValue] = useState("")
  const watchName = useDebounce(value, 1000)
  const [brandName, setBrandName] = useState<string>("")
  const [brands, setBrands] = useState<BrandType[]>([])

  const pathname = window.location.pathname

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          watchName: watchName,
          brandName: brandName,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    )
    window.history.replaceState(null, "", url)
  }, [watchName, brandName, pathname])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await api.get("/brands")
        if (data) {
          setBrands(data.response)
        }
      } catch (error) {
        console.log("Fetch brands error: ", error)
      }
    }

    fetchBrands()
  }, [])

  const { data: watches, isLoading } = useQuery({
    queryKey: ["watches", { watchName, brandName }],
    queryFn: async () => {
      const { data } = await api.get<WatchResponseType>(
        `/watches/search?watchName=${watchName}&brandName=${brandName}`
      )
      return data.response
    },
  })

  return (
    <main>
      <div className="overflow-hidden rounded-xl p-4 sm:p-6 lg:p-12">
        <div className="space-y-10">
          <h1 className="text-4xl font-bold">Search watches</h1>
          {/* Search Input */}
          <div className="items-center flex space-x-4 w-[40rem]">
            <SearchInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Select value={brandName} onValueChange={setBrandName}>
              <SelectTrigger className="w-[15rem]">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands?.map((brand) => (
                  <SelectItem key={brand._id} value={brand.brandName}>
                    {brand.brandName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Watch Section */}
          <Loader loading={isLoading}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* Watch Cards */}
              {watches?.map((watch) => (
                <WatchCard
                  key={watch._id}
                  _id={watch._id}
                  watchName={watch.watchName}
                  image={watch.image}
                  price={watch.price}
                  automatic={watch.automatic}
                  watchDescription={watch.watchDescription}
                  brandName={watch.brand?.brandName}
                  avgRating={watch.avgRating}
                />
              ))}
              {/* End Watch Cards */}
            </div>
          </Loader>
          {/* End Watch Section */}
        </div>
      </div>
    </main>
  )
}
