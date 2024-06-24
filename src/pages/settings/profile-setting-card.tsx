import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  ProfileSchema,
  ProfileSettingResponseType,
  ProfileType,
} from "@/schemas/auth.schema"

import api from "@/lib/api"

import { useAuthContext } from "@/contexts/auth-provider"

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

export default function ProfileSettingCard() {
  const { member, setMember } = useAuthContext()
  const form = useForm<ProfileType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      memberName: member?.memberName,
      name: member?.name,
      YOB: member?.YOB,
    },
  })

  async function onSubmit(values: ProfileType) {
    try {
      const { data } = await api.put<ProfileSettingResponseType>(
        "/auth/change-profile",
        values
      )

      setMember(data.response)

      toast.success("Success", {
        description: data.message,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ??
          "An error occurred while changing profile."
        toast.error(errorMessage)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Personal Information</CardTitle>
        <CardDescription>Update your profile details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="memberName"
              render={({ field }) => (
                <FormItem>
                  <Label>Member Name</Label>
                  <FormControl>
                    <Input {...field} placeholder="Member Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Name</Label>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="YOB"
              render={({ field }) => (
                <FormItem>
                  <Label>Year of Birth</Label>
                  <FormControl>
                    <Input {...field} placeholder="2000" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update Profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
