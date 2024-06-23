import { useQuery } from "@tanstack/react-query"

import { BrandResponseType } from "@/schemas/brand.schema"

import api from "@/lib/api"

import { DataTable } from "@/pages/admin/brands/data-table"
import { columns } from "@/pages/admin/brands/data-table/columns"
import ErrorPage from "@/pages/error"

import { Loader } from "@/components/loader"

export default function AdminBrandsPage() {
  const {
    data: brands,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await api.get<BrandResponseType>("/brands")
      return data.response
    },
  })

  if (isLoading) return null

  if (!brands) return <ErrorPage />

  if (isError) return <ErrorPage />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Brands List</h1>
      <Loader loading={isFetching}>
        <DataTable columns={columns} data={brands} />
      </Loader>
    </div>
  )
}
