"use client"
import { useState } from "react"
import { signIn } from "../../../lib/supabase"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password")
      return
    }

    try {
      setLoading(true)
      setError("")
      await signIn(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to access your dashboard
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

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="text-right mb-6">
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition shadow-md disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/auth/signup")}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Create account
          </span>
        </p>

        <p className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} UtilityCollect
        </p>
      </div>
    </div>
  )
}