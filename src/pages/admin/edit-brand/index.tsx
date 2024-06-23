import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import {
  BrandDetailResponseType,
  BrandType,
  CreateBrandSchema,
  CreateBrandType,
} from "@/schemas/brand.schema"
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

export default function EditBrandPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [brand, setBrand] = useState<BrandType>()
  const queryClient = useQueryClient()

  useEffect(() => {
    const getBrand = async () => {
      try {
        const { data } = await api.get<BrandDetailResponseType>(`/brands/${id}`)
        setBrand(data.response)
        return data.response
      } catch (error) {
        console.log("Get watch error: ", error)
      }
    }

    getBrand()
  }, [id])

  const form = useForm<CreateBrandType>({
    resolver: zodResolver(CreateBrandSchema),
    values: {
      brandName: brand?.brandName || "",
    },
  })

  const { mutateAsync: editBrand } = useMutation({
    mutationKey: ["editBrand", id],
    mutationFn: async (values: CreateBrandType) => {
      const { data } = await api.put<CommonResponseType>(
        `/brands/${id}`,
        values
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] })
      toast.success("Brand updated successfully")
      form.reset()
      navigate("/admin/brands")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message ??
          "Something went wrong when updating the brand"
        toast.error(errorMessage)
      }
    },
  })

  async function onSubmit(values: CreateBrandType) {
    await editBrand(values)
  }
  return (
    <div>
      <div className="my-16 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative items-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">Add New Watch</h1>

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

                  <Button type="submit">Update Brand</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
