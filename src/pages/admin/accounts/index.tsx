import { useQuery } from "@tanstack/react-query"

import { MemberResponseType } from "@/schemas/auth.schema"

import api from "@/lib/api"

import { DataTable } from "@/pages/admin/accounts/data-table"
import { columns } from "@/pages/admin/accounts/data-table/columns"
import ErrorPage from "@/pages/error"

import { Loader } from "@/components/loader"

export default function AdminAccountPage() {
  const {
    data: watches,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data } = await api.get<MemberResponseType>("/accounts")
      return data.response
    },
  })

  if (isLoading) return null

  if (!watches) return <ErrorPage />

  if (isError) return <ErrorPage />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Accounts List</h1>
      <Loader loading={isFetching}>
        <DataTable columns={columns} data={watches} />
      </Loader>
    </div>
  )
}
