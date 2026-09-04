import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/app/auth/actions";
import {
  User,
  Shield,
  Clock,
  KeyRound,
  CheckCircle2,
  Database,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  const role = profile?.role || "user";
  const fullName = profile?.full_name || user?.user_metadata?.full_name || "User";
  const email = user?.email || "user@example.com";
  const createdAt = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Hello, {fullName}! 👋
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              You are signed in as a <span className="font-semibold text-amber-400 uppercase">{role}</span>.
            </p>
          </div>

          {role === "admin" && (
            <Link
              href="/admin"
              className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Go to Admin Panel</span>
            </Link>
          )}
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account Role
            </span>
            <div className={`p-2 rounded-xl ${role === "admin" ? "bg-rose-500/10 text-rose-400" : "bg-amber-500/10 text-amber-400"}`}>
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white uppercase">{role}</div>
          <p className="text-xs text-slate-400 mt-1">
            {role === "admin" ? "Elevated admin privileges active" : "Standard customer access"}
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Database Sync
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">PostgreSQL</div>
          <p className="text-xs text-emerald-400/90 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Connected via Supabase
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Member Since
            </span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-bold text-white">{createdAt}</div>
          <p className="text-xs text-slate-400 mt-1">Secured via Supabase Auth</p>
        </div>
      </div>

      {/* Profile Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <User className="w-5 h-5 text-amber-400" />
            <span>Profile Details</span>
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Update your public personal information stored in public.profiles.
          </p>

          <form action={updateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                defaultValue={fullName}
                className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-4 py-2.5 bg-slate-800/30 border border-slate-800 rounded-xl text-slate-400 text-sm cursor-not-allowed"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Email is managed through Supabase Auth.
              </span>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-amber-500/20"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Security & RBAC Status Information */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-indigo-400" />
              <span>RBAC Security & Status</span>
            </h2>
            <p className="text-xs text-slate-400">
              Your permissions and database authorization status.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-800">
              <span className="text-slate-400">Assigned Role</span>
              <span className="font-semibold text-amber-400 uppercase">{role}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-800">
              <span className="text-slate-400">Admin Route Access (/admin)</span>
              <span className={`font-semibold ${role === "admin" ? "text-emerald-400" : "text-rose-400"}`}>
                {role === "admin" ? "Granted (Allowed)" : "Restricted (Forbidden)"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-800">
              <span className="text-slate-400">Row Level Security (RLS)</span>
              <span className="font-semibold text-emerald-400">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-800">
              <span className="text-slate-400">User ID</span>
              <span className="font-mono text-slate-300 text-[11px] truncate max-w-[200px]">
                {user?.id || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
