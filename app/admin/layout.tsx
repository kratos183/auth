import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import {
  ShieldAlert,
  Users,
  LayoutDashboard,
  Database,
  ArrowLeft,
  LogOut,
  Sparkles,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard?error=unauthorized_admin_access");
  }

  const fullName = profile?.full_name || "Administrator";
  const email = user.email;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-rose-950/40 flex flex-col shrink-0">
        {/* Brand with Admin Badge */}
        <div className="p-6 border-b border-slate-800/80">
          <Link href="/" className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center shadow-md shadow-rose-600/20">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Luxe<span className="text-amber-400">Living</span>
            </span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Admin Control Center</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-rose-400" />
            <span>Analytics & Overview</span>
          </Link>

          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>User Management & RBAC</span>
          </Link>

          {/* Switch to User View */}
          <div className="pt-4 mt-4 border-t border-slate-800/80">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              User Portal
            </p>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to User Dashboard</span>
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800/80">
          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 px-6 bg-slate-900/80 backdrop-blur-md border-b border-rose-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-rose-400 font-semibold">Admin</span>
            <span>/</span>
            <span className="text-white font-medium">RBAC Security Console</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold uppercase">
              SUPERADMIN
            </div>
            <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
              {fullName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 flex-1">{children}</div>
      </main>
    </div>
  );
}
