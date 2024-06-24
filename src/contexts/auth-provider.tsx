import React, { useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { MemberType, WhoAmIResponseType } from "@/schemas/auth.schema"

import api from "@/lib/api"

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  isAuthenticated: boolean
  member: MemberType | null
  setMember: (member: MemberType | null) => void
  login: (memberData: MemberType) => void
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [member, setMember] = useState<MemberType | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await api.get<WhoAmIResponseType>("/auth/who-am-i")
        if (data.response) {
          setMember(data.response)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.log("Error while checking session", error)
      }
    }

    checkSession()
  }, [])

  const login = (memberData: MemberType) => {
    setMember(memberData)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    try {
      await api.post("/auth/logout")
      toast.success("Logged out successfully")
      setMember(null)
      setIsAuthenticated(false)
      navigate("/")
    } catch (error) {
      console.log("Error while logging out", error)
      toast.error("An error occurred while logging out")
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, member, setMember, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
