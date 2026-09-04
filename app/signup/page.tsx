"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signUp } from "@/app/auth/actions";
import { Lock, Mail, User, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, Shield } from "lucide-react";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUp, null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"user" | "admin">("user");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white font-sans">
              Luxe<span className="text-amber-400">Living</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">Create your account</h1>
          <p className="text-sm text-slate-400 mt-1">
            Get started with your PostgreSQL & Supabase authentication
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/50">
          {/* Error notification */}
          {state?.error && (
            <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3 text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-200">Registration Failed</p>
                <p className="text-xs text-rose-300/90 mt-0.5">{state.error}</p>
              </div>
            </div>
          )}

          {/* Success notification */}
          {state?.success && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3 text-emerald-300 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-200">Account Created!</p>
                <p className="text-xs text-emerald-300/90 mt-1">{state.success}</p>
                <Link
                  href="/login"
                  className="inline-block mt-3 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 text-xs font-semibold rounded-lg transition-colors"
                >
                  Go to Login →
                </Link>
              </div>
            </div>
          )}

          <form action={formAction} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Jane Doe"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-800/60 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Initial Role Selection for Testing RBAC */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Account Role
              </label>
              <input type="hidden" name="role" value={selectedRole} />
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole("user")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedRole === "user"
                      ? "bg-amber-500/10 border-amber-500/60 text-white shadow-sm"
                      : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800/70"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold text-xs text-amber-400">
                    <User className="w-3.5 h-3.5" />
                    <span>User</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Standard dashboard & profile
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("admin")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedRole === "admin"
                      ? "bg-indigo-500/10 border-indigo-500/60 text-white shadow-sm"
                      : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800/70"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold text-xs text-indigo-400">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Full management & RBAC controls
                  </p>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors ml-1"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
