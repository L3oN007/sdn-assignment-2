import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import {
  LoginResponseType,
  LoginSchema,
  LoginType,
} from "@/schemas/auth.schema"

import api from "@/lib/api"

import { useAuthContext } from "@/contexts/auth-provider"

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

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      memberName: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginType) {
    try {
      const { data } = await api.post<LoginResponseType>("/auth/login", values)
      toast.success("Success", {
        description: data.message,
      })
      form.reset()
      login(data.response)
      return navigate("/")
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ?? "An error occurred while signing in."
        toast.error(errorMessage)
      } else {
        toast.error("An unexpected error occurred while signing in.")
      }
    }
  }
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-28 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://www.dafc.com.vn/wp-content/uploads/2023/08/05.Rolex_M124060-0001_2010jva_002-1024x1024.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Rolet
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Best watch in the world.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Rolet
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Login
                </h1>
                <div className="col-span-6 space-y-2">
                  <FormField
                    control={form.control}
                    name="memberName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Username</Label>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6 space-y-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Password</Label>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mx-auto">
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don't have an account?
                    <Link
                      to="/auth/register"
                      className="text-gray-500 underline hover:text-gray-900 hover:font-normal"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </section>
  )
}
