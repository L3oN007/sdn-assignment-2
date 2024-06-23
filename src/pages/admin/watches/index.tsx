import { useQuery } from "@tanstack/react-query"

import { WatchResponseType } from "@/schemas/watch.schema"

import api from "@/lib/api"

import { DataTable } from "@/pages/admin/watches/data-table"
import { columns } from "@/pages/admin/watches/data-table/columns"
import ErrorPage from "@/pages/error"

import { Loader } from "@/components/loader"

export default function AdminWatchesPage() {
  const {
    data: watches,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["watches"],
    queryFn: async () => {
      const { data } = await api.get<WatchResponseType>("/watches")
      return data.response
    },
  })

  if (isLoading) return null

  if (!watches) return <ErrorPage />

  if (isError) return <ErrorPage />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Watches List</h1>
      <Loader loading={isFetching}>
        <DataTable columns={columns} data={watches} />
      </Loader>
    </div>
  )
}
