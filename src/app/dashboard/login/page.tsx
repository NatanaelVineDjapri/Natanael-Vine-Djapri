"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { buttonClass, inputClass, labelClass } from "@/components/dashboard/styles";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="bg-ink text-paper flex min-h-dvh items-center justify-center px-6">
      <form onSubmit={onSubmit} className="border-line w-full max-w-sm border p-8">
        <p className="font-display text-2xl">Masuk</p>
        <p className="text-mute mt-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
          Akses Dashboard
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Kata Sandi</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {error ? <p className="mt-5 font-mono text-xs text-red-400">{error}</p> : null}

        <button type="submit" disabled={loading} className={`${buttonClass} mt-8 w-full justify-center disabled:opacity-50`}>
          {loading ? "Memproses…" : "Masuk"}
        </button>
      </form>
    </div>
  );
}
