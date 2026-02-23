"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "../lib/supabase"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const user = await getCurrentUser()
      if (user) router.push("/dashboard")
      else router.push("/auth/login")
    }
    check()
  }, [])

  return null
}