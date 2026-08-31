"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2, ListTodo, Wallet, PiggyBank, Download,
  BarChart3, Target, Repeat, ArrowRight, Github,
  ClipboardCheck, PieChart, Sparkles, Shield, Zap, Globe,
} from "lucide-react";

const FEATURES = [
  { icon: ListTodo, title: "Catatan Tugas", desc: "Subtask, prioritas, deadline, dan catatan. Semua tugas terorganisir dalam satu tempat." },
  { icon: Wallet, title: "Keuangan", desc: "Pantau pemasukan & pengeluaran dengan grafik kategori yang jelas." },
  { icon: PiggyBank, title: "Tabungan", desc: "Rencanakan target tabungan dan pantau progress harianmu." },
  { icon: BarChart3, title: "Rekap Bulanan", desc: "Ringkasan keuangan per bulan dengan pie chart dan perbandingan kategori." },
  { icon: Target, title: "Batas Anggaran", desc: "Atur batas pengeluaran per kategori. Peringatan otomatis saat terlampaui." },
  { icon: Repeat, title: "Transaksi Berulang", desc: "Gaji bulanan, tagihan rutin — otomatis diingatkan dan dicatat." },
];

const MORE_FEATURES = [
  { icon: ClipboardCheck, text: "Subtask dengan status aktif & overdue" },
  { icon: PieChart, text: "Donut chart distribusi pengeluaran" },
  { icon: Shield, text: "Mode tamu tanpa daftar akun" },
  { icon: Zap, text: "Sinkron real-time dengan Firebase" },
  { icon: Globe, text: "Akses dari mana saja (web & mobile)" },
  { icon: Sparkles, text: "Update otomatis tanpa install ulang" },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">C</div>
            <span className="text-lg font-bold tracking-tight">Ctt</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 sm:block">Masuk</Link>
            <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Mulai Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                v1.1.0 — Fitur baru: Anggaran & Berulang
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Catatan tugas &<br />
                <span className="text-blue-600">keuangan</span> dalam satu tempat
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-500">
                Kelola produktivitas dan keuangan pribadi dengan simpel. Tanpa ribet, tanpa fitur berlebih — hanya yang kamu butuhkan.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25">
                  Mulai Sekarang <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50">
                  Coba Tanpa Akun
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Hero visual */}
          <FadeIn delay={0.2} className="mt-16 sm:mt-20">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60">
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-gray-300" />
                <div className="h-3 w-3 rounded-full bg-gray-300" />
                <div className="h-3 w-3 rounded-full bg-gray-300" />
                <span className="ml-3 text-xs text-gray-400">ctt-app.web.app</span>
              </div>
              <div className="grid grid-cols-3 gap-4 p-6 sm:p-8">
                <DemoCard label="Pemasukan" value="Rp 8.5Jt" color="text-emerald-600" bg="bg-emerald-50" />
                <DemoCard label="Pengeluaran" value="Rp 3.2Jt" color="text-red-500" bg="bg-red-50" />
                <DemoCard label="Saldo" value="Rp 5.3Jt" color="text-blue-600" bg="bg-blue-50" />
              </div>
              <div className="border-t border-gray-100 px-6 pb-6 pt-4 sm:px-8">
                <div className="space-y-3">
                  <DemoRow title="Gaji Bulanan" category="Gaji" amount="+Rp 5.000.000" color="text-emerald-600" />
                  <DemoRow title="Sewa Kos" category="Tagihan" amount="-Rp 1.200.000" color="text-red-500" />
                  <DemoRow title="Groceries" category="Makanan" amount="-Rp 450.000" color="text-red-500" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Logos / Trust */}
      <section className="border-y border-gray-100 bg-gray-50/60 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-gray-400">
              <span className="flex items-center gap-2"><Zap className="h-4 w-4" /> Firebase</span>
              <span className="flex items-center gap-2"><Globe className="h-4 w-4" /> Next.js</span>
              <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Flutter</span>
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Tailwind CSS</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Fitur</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Semua yang kamu butuhkan</h2>
              <p className="mt-4 text-gray-500">Dirancang untuk kemudahan. Bukan untuk pamer.</p>
            </div>
          </FadeIn>
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* More features */}
      <section className="border-y border-gray-100 bg-gray-50/60 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Detail</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Juga termasuk</h2>
            </div>
          </FadeIn>
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {MORE_FEATURES.map((f, i) => (
              <FadeIn key={f.text} delay={i * 0.06}>
                <div className="flex items-start gap-3 rounded-xl bg-white p-4 border border-gray-100">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                  <span className="text-sm text-gray-700">{f.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-blue-100 bg-blue-50/50 p-8 sm:p-12 lg:p-16">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Mulai sekarang, gratis</h2>
                <p className="mt-4 text-gray-500">Tersedia di web dan mobile. Pilih platformmu.</p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25">
                    <Globe className="h-4 w-4" /> Buka versi Web
                  </Link>
                  <a href="https://github.com/Zryyuu/zyto-web/releases/latest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50">
                    <Download className="h-4 w-4" /> Download APK
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-[10px] font-bold text-white">C</div>
            <span className="text-sm font-semibold">Ctt</span>
            <span className="text-sm text-gray-400">v1.1.0</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>Dibuat dengan Next.js & Firebase</span>
            <a href="https://github.com/Zryyuu/zyto-web" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-gray-900">
              <Github className="h-4 w-4" /> Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DemoCard({ label, value, color, bg }: { label: string; value: string; color: string; bg: string }) {
  return (
    <div className={`rounded-xl ${bg} p-4`}>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className={`mt-1 text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function DemoRow({ title, category, amount, color }: { title: string; category: string; amount: string; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-400">{category}</p>
      </div>
      <span className={`text-sm font-bold ${color}`}>{amount}</span>
    </div>
  );
}