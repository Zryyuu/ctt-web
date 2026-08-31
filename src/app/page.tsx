"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2, ListTodo, Wallet, PiggyBank, Download,
  BarChart3, Target, Repeat, ArrowRight, Github,
  ClipboardCheck, PieChart, Sparkles, Shield, Zap, Globe,
  Smartphone, TrendingUp, CalendarCheck, Bell, Layers,
  ChevronRight, Star,
} from "lucide-react";

const FEATURES = [
  { icon: ListTodo, title: "Catatan Tugas", desc: "Buat tugas dengan subtask, atur prioritas (rendah/sedang/tinggi), set deadline, dan tambahkan catatan. Semua terorganisir." },
  { icon: Wallet, title: "Transaksi", desc: "Catat setiap pemasukan dan pengeluaran dengan kategori — Makanan, Transport, Belanja, Hiburan, Tagihan, dan lainnya." },
  { icon: PiggyBank, title: "Rencana Tabungan", desc: "Buat target tabungan, atur deadline, dan lihat progress bar harian. Tahu persis kapan targetmu tercapai." },
  { icon: BarChart3, title: "Rekap Bulanan", desc: "Lihat ringkasan keuangan setiap bulan — pie chart per kategori, bar chart pemasukan vs pengeluaran." },
  { icon: Target, title: "Batas Anggaran", desc: "Tetapkan batas pengeluaran per kategori per bulan. Dapat peringatan otomatis saat melebihi batas." },
  { icon: Repeat, title: "Transaksi Berulang", desc: "Gaji bulanan, bayar kos, tagihan listrik — atur otomatis berulang (harian, mingguan, bulanan, tahunan)." },
];

const DETAIL_FEATURES = [
  { icon: ClipboardCheck, title: "Subtask Aktif & Overdue", desc: "Status subtask otomatis berubah — hijau untuk aktif, merah untuk terlambat." },
  { icon: PieChart, title: "Donut Chart", desc: "Visualisasi distribusi pengeluaran per kategori dalam bentuk pie chart interaktif." },
  { icon: Shield, title: "Mode Tamu", desc: "Coba langsung tanpa daftar akun. Data tersimpan di browser." },
  { icon: Zap, title: "Sinkron Firebase", desc: "Data tersimpan real-time di Firebase Firestore. Akses dari device mana saja." },
  { icon: Globe, title: "Web & Mobile", desc: "Tersedia sebagai aplikasi web (Next.js) dan mobile (Flutter). Satu akun, dua platform." },
  { icon: Sparkles, title: "Update Otomatis", desc: "Pembaruan versi otomatis ditemukan. Tidak perlu install ulang untuk fitur baru." },
  { icon: Bell, title: "Notifikasi Update", desc: "Pop-up notifikasi otomatis saat versi baru tersedia." },
  { icon: CalendarCheck, title: "Deadline Visual", desc: "Tugas mendekati deadline ditandai dengan warna untuk pengingat visual." },
  { icon: Layers, title: "Guest & Login", desc: "Gunakan sebagai tamu untuk coba-coba, atau login untuk sinkron lintas device." },
];

const STEPS = [
  { num: "01", title: "Pilih mode", desc: "Masuk dengan email, Google, atau langsung coba sebagai tamu tanpa registrasi." },
  { num: "02", title: "Catat aktivitas", desc: "Tambah tugas, catat transaksi keuangan, atau buat rencana tabungan baru." },
  { num: "03", title: "Atur anggaran", desc: "Tetapkan batas pengeluaran per kategori. Pantau agar tidak boros." },
  { num: "04", title: "Lihat rekap", desc: "Cek ringkasan bulanan dengan grafik. Tahu persis ke mana uangmu pergi." },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-sky-100">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/ctt.png" alt="Ctt" width={32} height={32} className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-bold tracking-tight">Ctt</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 sm:block">Masuk</Link>
            <Link href="/login" className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700">
              Mulai Gratis <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700">
                <Sparkles className="h-3.5 w-3.5" />
                v1.1.0 — Anggaran, Berulang & Rekap
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Catatan tugas &<br />
                <span className="text-sky-500">keuangan</span> dalam satu tempat
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-500">
                Kelola produktivitas dan keuangan pribadi dengan simpel. Tanpa ribet, tanpa fitur berlebih — hanya yang kamu butuhkan.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition-all hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-600/25">
                  Mulai Sekarang <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="https://github.com/Zryyuu/zyto-web/releases/latest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50">
                  <Download className="h-4 w-4" /> Download APK
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Hero preview */}
          <FadeIn delay={0.15} className="mt-16 sm:mt-20">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60">
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-gray-300" />
                <div className="h-3 w-3 rounded-full bg-gray-300" />
                <div className="h-3 w-3 rounded-full bg-gray-300" />
                <span className="ml-3 text-xs text-gray-400">ctt-app.web.app/todos</span>
              </div>
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <DemoCard label="Pemasukan" value="Rp 8.5Jt" color="text-emerald-600" bg="bg-emerald-50" border="border-emerald-100" />
                  <DemoCard label="Pengeluaran" value="Rp 3.2Jt" color="text-red-500" bg="bg-red-50" border="border-red-100" />
                  <DemoCard label="Saldo" value="Rp 5.3Jt" color="text-sky-600" bg="bg-sky-50" border="border-sky-100" />
                </div>
                <div className="mt-4 space-y-2.5">
                  <DemoRow title="Gaji Bulanan" category="Gaji" amount="+Rp 5.000.000" color="text-emerald-600" />
                  <DemoRow title="Sewa Kos" category="Tagihan" amount="-Rp 1.200.000" color="text-red-500" />
                  <DemoRow title="Groceries" category="Makanan" amount="-Rp 450.000" color="text-red-500" />
                  <DemoRow title="Transport Mingguan" category="Transport" amount="-Rp 180.000" color="text-red-500" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tech stack */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p className="text-center text-sm font-medium text-gray-400 mb-4">Dibangun dengan</p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-medium text-gray-400">
              {["Firebase", "Next.js", "Flutter", "Tailwind CSS", "TypeScript", "Firestore"].map((t) => (
                <span key={t} className="flex items-center gap-2 transition-colors hover:text-gray-600">
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-500">Fitur Utama</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Semua yang kamu butuhkan</h2>
              <p className="mt-4 text-gray-500">Dirancang untuk kemudahan. Bukan untuk pamer.</p>
            </div>
          </FadeIn>
          <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.07}>
                <div className="group h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-sky-200 hover:shadow-lg hover:shadow-sky-50">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-500 transition-all group-hover:bg-sky-600 group-hover:text-white">
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

      {/* How it works */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-500">Cara Kerja</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Empat langkah sederhana</h2>
            </div>
          </FadeIn>
          <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div className="relative">
                  <span className="text-5xl font-extrabold text-sky-100">{s.num}</span>
                  <h3 className="mt-2 text-base font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{s.desc}</p>
                  {i < STEPS.length - 1 && <ChevronRight className="absolute right-0 top-8 hidden h-5 w-5 text-gray-300 lg:block" />}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* More features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-500">Detail Lainnya</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Juga termasuk</h2>
            </div>
          </FadeIn>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DETAIL_FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-sky-100 hover:shadow-md">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-500">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="border-t border-gray-100 bg-gray-50/50 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white p-8 shadow-xl shadow-sky-100/40 sm:p-12 lg:p-16">
              <div className="mx-auto max-w-2xl text-center">
                <Image src="/ctt.png" alt="Ctt" width={64} height={64} className="mx-auto mb-6 h-16 w-16 rounded-2xl" />
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Mulai sekarang, gratis</h2>
                <p className="mt-4 text-gray-500">Tersedia di web dan mobile. Pilih platformmu.</p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition-all hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-600/25">
                    <Globe className="h-4 w-4" /> Buka versi Web
                  </Link>
                  <a href="https://github.com/Zryyuu/zyto-web/releases/latest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50">
                    <Download className="h-4 w-4" /> Download APK
                  </a>
                </div>
                <p className="mt-6 flex items-center justify-center gap-1 text-xs text-gray-400">
                  <Star className="h-3 w-3" /> Open source &mdash; kontribusi selalu diterima
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image src="/ctt.png" alt="Ctt" width={24} height={24} className="h-6 w-6 rounded-md" />
            <span className="text-sm font-semibold">Ctt</span>
            <span className="text-sm text-gray-400">v1.1.0</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>Next.js & Firebase</span>
            <a href="https://github.com/Zryyuu/zyto-web" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-gray-900">
              <Github className="h-4 w-4" /> Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DemoCard({ label, value, color, bg, border }: { label: string; value: string; color: string; bg: string; border: string }) {
  return (
    <div className={`rounded-xl border ${border} ${bg} p-4`}>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className={`mt-1 text-lg font-bold sm:text-xl ${color}`}>{value}</p>
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