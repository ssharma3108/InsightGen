import { LoginForm } from "@/components/login/login-form"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">InsightGen</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">AI-Powered Business Dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
