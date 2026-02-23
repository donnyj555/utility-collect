"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "../../lib/supabase"
import AgentDashboard from "../../components/AgentDashboard"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    getCurrentUser().then(user => {
      if (!user) router.push("/auth/login")
    })
  }, [])

  return <AgentDashboard />
}