import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  PasswordSettingSchema,
  PasswordSettingType,
} from "@/schemas/auth.schema"
import { CommonResponseType } from "@/schemas/common.schema"

import api from "@/lib/api"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PasswordSettingCard() {
  const form = useForm<PasswordSettingType>({
    resolver: zodResolver(PasswordSettingSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmedPassword: "",
    },
  })

  async function onSubmit(values: PasswordSettingType) {
    try {
      const { data } = await api.put<CommonResponseType>(
        "/auth/change-password",
        values
      )
      form.reset()
      toast.success("Success", {
        description: data.message,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ??
          "An error occurred while changing password."
        toast.error(errorMessage)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Account Settings</CardTitle>
        <CardDescription>Manage your account preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label>Current Password</Label>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>New Password</Label>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmedPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>Confirm Password</Label>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update Password</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
