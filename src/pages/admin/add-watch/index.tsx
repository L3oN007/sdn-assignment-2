import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { BrandResponseType, BrandType } from "@/schemas/brand.schema"
import { CommonResponseType } from "@/schemas/common.schema"
import { CreateWatchSchema, CreateWatchType } from "@/schemas/watch.schema"

import api from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function AddWatchPage() {
  const navigate = useNavigate()
  const [brands, setBrands] = useState<BrandType[]>([])
  const queryClient = useQueryClient()
  const form = useForm<CreateWatchType>({
    resolver: zodResolver(CreateWatchSchema),
    defaultValues: {
      watchName: "",
      image: "",
      price: 0,
      automatic: false,
      watchDescription: "",
      brand: "",
    },
  })

  useEffect(() => {
    const getAllBrands = async () => {
      try {
        const { data } = await api.get<BrandResponseType>("/brands")
        setBrands(data.response)
      } catch (error) {
        console.log(error)
      }
    }

    getAllBrands()
  }, [])

  const { mutateAsync: createWatch } = useMutation({
    mutationKey: ["createWatch"],
    mutationFn: async (values: CreateWatchType) => {
      const { data } = await api.post<CommonResponseType>("/watches", values)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watches"] })
      toast.success("Watch added successfully")
      form.reset()
      navigate("/admin/watches")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message ??
          "Something went wrong when adding the watch"
        toast.error(errorMessage)
      }
    },
  })

  async function onSubmit(values: CreateWatchType) {
    await createWatch(values)
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
                    name="watchName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Watch Name</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="watchDescription"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Watch Description</Label>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Image Url</Label>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Price</Label>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Brand</Label>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a brand" />
                            </SelectTrigger>
                            <SelectContent>
                              {brands.map((brand) => (
                                <SelectItem key={brand._id} value={brand._id}>
                                  {brand.brandName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="automatic"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Automatic</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Add Watch</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
