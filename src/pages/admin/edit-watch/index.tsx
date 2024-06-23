import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { BrandResponseType, BrandType } from "@/schemas/brand.schema"
import { CommonResponseType } from "@/schemas/common.schema"
import {
  CreateWatchSchema,
  CreateWatchType,
  WatchDetailResponseType,
  WatchType,
} from "@/schemas/watch.schema"

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

export default function EditWatchPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [brands, setBrands] = useState<BrandType[]>([])
  //@ts-expect-error type error
  const [watch, setWatch] = useState<WatchType>({
    watchName: "",
    watchDescription: "",
    automatic: false,
    brand: {
      _id: "",
      brandName: "",
    },
    price: 0,
    image: "",
  })
  const queryClient = useQueryClient()

  useEffect(() => {
    const getAllBrands = async () => {
      try {
        const { data } = await api.get<BrandResponseType>("/brands")
        setBrands(data.response)
      } catch (error) {
        console.log(error)
      }
    }
    const getWatch = async () => {
      try {
        const { data } = await api.get<WatchDetailResponseType>(
          `/watches/${id}`
        )
        setWatch(data.response)
        return data.response
      } catch (error) {
        console.log("Get watch error: ", error)
      }
    }

    getAllBrands()
    getWatch()
  }, [id])

  const form = useForm<CreateWatchType>({
    resolver: zodResolver(CreateWatchSchema),
    values: {
      watchName: watch?.watchName,
      watchDescription: watch?.watchDescription,
      automatic: watch?.automatic,
      brand: watch?.brand._id,
      price: watch?.price,
      image: watch?.image,
    },
  })

  const { mutateAsync: createWatch } = useMutation({
    mutationKey: ["editWatch", id],
    mutationFn: async (values: CreateWatchType) => {
      const { data } = await api.put<CommonResponseType>(
        `/watches/${id}`,
        values
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watches"] })
      toast.success("Watch updated successfully")
      form.reset()
      navigate("/admin/watches")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message ??
          "Something went wrong when updating the watch"
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
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            value={field.value}
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

                  <Button type="submit">Update Watch</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
