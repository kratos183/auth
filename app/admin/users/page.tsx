import { createClient } from "@/lib/supabase/server";
import RoleSelector from "./RoleSelector";
import { Users, Shield, UserCheck, Search, Filter } from "lucide-react";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at, updated_at")
    .order("created_at", { ascending: false });

  const allProfiles = profiles || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold mb-2">
          <Shield className="w-3.5 h-3.5" />
          <span>Access Control Lists (ACL / RBAC)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          User Management & Roles
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Promote or demote users, inspect permissions, and oversee system identities in PostgreSQL.
        </p>
      </div>

      {/* Users Table Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">
              All Registered Accounts ({allProfiles.length})
            </h2>
            <p className="text-xs text-slate-400">
              Changes to roles take effect immediately in Next.js session middleware.
            </p>
          </div>
        </div>

        {allProfiles.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            <p>No user accounts found in the database.</p>
            <p className="text-xs text-slate-600 mt-1">
              Check your Supabase connection parameters in <code className="text-slate-400">.env.local</code>.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold uppercase text-slate-400">
                  <th className="pb-3 pr-4">User</th>
                  <th className="pb-3 pr-4">Current Role</th>
                  <th className="pb-3 pr-4">Change Role (RBAC)</th>
                  <th className="pb-3 pr-4">User UUID</th>
                  <th className="pb-3">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {allProfiles.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-amber-400">
                          {(p.full_name || p.email || "U").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-white">
                            {p.full_name || "No name"}
                          </div>
                          <div className="text-xs text-slate-400">{p.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 pr-4">
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

                    <td className="py-4 pr-4">
                      <RoleSelector
                        userId={p.id}
                        currentRole={p.role as "admin" | "user" | "moderator"}
                        userEmail={p.email}
                      />
                    </td>

                    <td className="py-4 pr-4 font-mono text-xs text-slate-500 truncate max-w-[130px]">
                      {p.id}
                    </td>

                    <td className="py-4 text-xs text-slate-400">
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
