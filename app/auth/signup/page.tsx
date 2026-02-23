"use client"
import { useState } from "react"
import { signUp } from "../../../lib/supabase"
import { useRouter } from "next/navigation"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignup = async () => {
    if (!email || !password ) {
      setError("All fields are required")
      return
    }

    try {
      setLoading(true)
      setError("")
      const { user, session } = await signUp(email, password)

      if (user && session) router.push("/dashboard")
      else setError("Signup failed. Please try again.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Get started with your dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition shadow-md disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Sign in
          </span>
        </p>

        <p className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} UtilityCollect
        </p>
      </div>
    </div>
  )
}