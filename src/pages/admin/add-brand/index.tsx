import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { CreateBrandSchema, CreateBrandType } from "@/schemas/brand.schema"
import { CommonResponseType } from "@/schemas/common.schema"

import api from "@/lib/api"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddBrandPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const form = useForm<CreateBrandType>({
    resolver: zodResolver(CreateBrandSchema),
    defaultValues: {
      brandName: "",
    },
  })

  const { mutateAsync: createBrand } = useMutation({
    mutationKey: ["createBrand"],
    mutationFn: async (values: CreateBrandType) => {
      const { data } = await api.post<CommonResponseType>("/brands", values)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] })
      toast.success("Brand added successfully")
      form.reset()
      navigate("/admin/brands")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message ??
          "Something went wrong when adding the brand"
        toast.error(errorMessage)
      }
    },
  })

  async function onSubmit(values: CreateBrandType) {
    await createBrand(values)
  }
  return (
    <div>
      <div className="my-16 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative items-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">Add New Brand</h1>

            <div className="mt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="brandName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Brand Name</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Add Brand</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
