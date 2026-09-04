"use client";

import { useState, useTransition } from "react";
import { updateUserRole } from "@/app/auth/actions";
import { Shield, ShieldAlert, User, Check, Loader2 } from "lucide-react";

interface RoleSelectorProps {
  userId: string;
  currentRole: "admin" | "user" | "moderator";
  userEmail: string;
}

export default function RoleSelector({
  userId,
  currentRole,
  userEmail,
}: RoleSelectorProps) {
  const [role, setRole] = useState(currentRole);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleRoleChange = async (newRole: "admin" | "user" | "moderator") => {
    if (newRole === role) return;

    startTransition(async () => {
      const res = await updateUserRole(userId, newRole);
      if (res?.error) {
        setMessage(res.error);
      } else {
        setRole(newRole);
        setMessage(`Role changed to ${newRole}`);
        setTimeout(() => setMessage(null), 3000);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={role}
        disabled={isPending}
        onChange={(e) =>
          handleRoleChange(e.target.value as "admin" | "user" | "moderator")
        }
        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border transition-all cursor-pointer focus:outline-none ${
          role === "admin"
            ? "bg-rose-950/60 border-rose-700/60 text-rose-300"
            : role === "moderator"
            ? "bg-emerald-950/60 border-emerald-700/60 text-emerald-300"
            : "bg-slate-800 border-slate-700 text-slate-300"
        } disabled:opacity-50`}
      >
        <option value="user">User</option>
        <option value="moderator">Moderator</option>
        <option value="admin">Admin</option>
      </select>

      {isPending && (
        <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" />
      )}

      {message && (
        <span className="text-[11px] text-emerald-400 font-medium">
          {message}
        </span>
      )}
    </div>
  );
}
