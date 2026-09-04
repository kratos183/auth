import { createClient } from "@/lib/supabase/server";
import {
  Users,
  ShieldCheck,
  UserCheck,
  Database,
  Key,
  Layers,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  // Fetch all profiles to compute live stats
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .order("created_at", { ascending: false });

  const allProfiles = profiles || [];
  const totalUsers = allProfiles.length;
  const adminCount = allProfiles.filter((p) => p.role === "admin").length;
  const userCount = allProfiles.filter((p) => p.role === "user").length;
  const moderatorCount = allProfiles.filter((p) => p.role === "moderator").length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-900/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PostgreSQL RBAC Controller</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Admin Overview & Stats
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Live statistics from Supabase <code className="text-rose-300 font-mono text-xs">public.profiles</code> table.
            </p>
          </div>

          <Link
            href="/admin/users"
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
          >
            <span>Manage Users & Roles</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Users
            </span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{totalUsers}</div>
          <p className="text-xs text-slate-400 mt-1">Registered in database</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Admins
            </span>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-rose-400">{adminCount}</div>
          <p className="text-xs text-slate-400 mt-1">Elevated permissions</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Standard Users
            </span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-400">{userCount}</div>
          <p className="text-xs text-slate-400 mt-1">Standard customers</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Moderators
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400">{moderatorCount}</div>
          <p className="text-xs text-slate-400 mt-1">Community staff</p>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Registrations</h2>
            <p className="text-xs text-slate-400">
              Latest accounts synced from PostgreSQL
            </p>
          </div>
          <Link
            href="/admin/users"
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {allProfiles.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            <p>No user profiles found in database yet.</p>
            <p className="text-xs text-slate-600 mt-1">
              Ensure your Supabase project credentials are in <code className="text-slate-400">.env.local</code> and SQL schema has been executed.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold uppercase text-slate-400">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">User ID</th>
                  <th className="pb-3">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {allProfiles.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-semibold text-white">{p.full_name || "Anonymous"}</div>
                      <div className="text-xs text-slate-400">{p.email}</div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          p.role === "admin"
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : p.role === "moderator"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {p.role}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-xs text-slate-400 truncate max-w-[140px]">
                      {p.id}
                    </td>
                    <td className="py-3.5 text-xs text-slate-400">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
