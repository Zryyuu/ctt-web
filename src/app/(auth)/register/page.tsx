"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    setLoading(true);
    try {
      await register(email, password, name);
      router.push("/todos");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Register gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #65c4ff, #1597e5)" }}>
              <span className="text-[13px] font-bold text-white">A</span>
            </div>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#0f172a]">Buat akun Alflow</h1>
          <p className="mt-1 text-[14px] text-[#475569]">Mulai atur tugas dan keuanganmu</p>
        </div>
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-card">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-[13px] text-[#ef4444]">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#0f172a]">Nama</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[#e2e8f0] py-2.5 pl-10 pr-3 text-[14px] focus:border-[#1597e5] focus:outline-none focus:ring-1 focus:ring-[#1597e5]"
                  placeholder="Nama kamu"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#0f172a]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#e2e8f0] py-2.5 pl-10 pr-3 text-[14px] focus:border-[#1597e5] focus:outline-none focus:ring-1 focus:ring-[#1597e5]"
                  placeholder="email@contoh.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#0f172a]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#e2e8f0] py-2.5 pl-10 pr-10 text-[14px] focus:border-[#1597e5] focus:outline-none focus:ring-1 focus:ring-[#1597e5]"
                  placeholder="Minimal 6 karakter"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569]"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[14px] font-semibold text-white disabled:opacity-50 transition-all"
              style={{ background: "#1597e5" }}
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <UserPlus className="h-4 w-4" /> Daftar
                </>
              )}
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-[14px] text-[#475569]">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold" style={{ color: "#1597e5" }}>
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}