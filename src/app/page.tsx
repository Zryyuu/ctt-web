"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2, ListTodo, Wallet, PiggyBank, Download,
  Target, Repeat, ArrowRight, Github,
  PieChart, TrendingDown,
  Menu, X,
} from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6fcff] text-[#0f172a] scroll-smooth">

      {/* ────────── NAV ────────── */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#e2e8f0]/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #65c4ff, #1597e5)" }}>
              <span className="text-[12px] font-bold text-white">A</span>
            </div>
            <span className="text-[16px] font-bold tracking-tight text-[#0f172a]">Alflow</span>
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {[["Beranda", "beranda"], ["Fitur", "fitur"], ["Cara Kerja", "cara"], ["Fitur Detail", "detail"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollToId(id)} className="text-[14px] font-medium text-[#475569] hover:text-[#1597e5] transition-colors">{label}</button>
            ))}
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="text-[14px] font-medium text-[#475569] hover:text-[#1597e5] transition-colors">Masuk</Link>
            <Link href="/login" className="rounded-xl bg-[#1597e5] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#1285cc] transition-all shadow-lg shadow-[#65c4ff]/20">
              Mulai Gratis
            </Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-[#64748b] hover:bg-[#f1f5f9] md:hidden" aria-label="Menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#e2e8f0] bg-white px-5 py-4 md:hidden">
            <div className="space-y-3">
              {[["Beranda", "beranda"], ["Fitur", "fitur"], ["Cara Kerja", "cara"], ["Fitur Detail", "detail"]].map(([label, id]) => (
                <button key={id} onClick={() => { scrollToId(id); setMenuOpen(false); }} className="block text-[14px] font-medium text-[#475569]">{label}</button>
              ))}
              <Link href="/login" className="block rounded-xl bg-[#1597e5] px-5 py-2.5 text-center text-[14px] font-semibold text-white">Mulai Gratis</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ────────── HERO ────────── */}
      <section id="beranda" className="relative overflow-hidden bg-[#e8f6ff] pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/60" />
        <div className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 rounded-full bg-[#65c4ff]/10" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-white/70" />
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <Animate>
              <div className="max-w-xl">
                <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#1597e5]/10 px-4 py-1.5 text-[13px] font-semibold text-[#1597e5]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#1597e5]" />
                  v2.0 — Anggaran &amp; Transaksi Berulang
                </span>
                <h1 className="text-[34px] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[44px] lg:text-[54px]">
                  Uang keluar, tugas numpuk,<br />
                  hidup makin <span style={{ color: "#1597e5" }}>kacau</span>?
                </h1>
                <p className="mt-5 text-[17px] leading-[1.65] text-[#475569]">
                  Alflow membantu Anda mengurus semua dari satu tempat. Catat pengeluaran, atur deadline, sampai pantau tabungan — tanpa harus membuka banyak aplikasi.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => scrollToId("fitur")} className="inline-flex items-center gap-2 rounded-xl bg-[#1597e5] px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-[#1285cc] transition-all shadow-lg shadow-[#65c4ff]/30">
                    Coba Gratis <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => scrollToId("fitur")} className="inline-flex items-center gap-2 rounded-xl border-2 border-[#1597e5] bg-white px-7 py-3 text-[15px] font-semibold text-[#1597e5] hover:bg-[#1597e5]/5 transition-all">
                    Lihat Fitur
                  </button>
                </div>
              </div>
            </Animate>

            <Animate delay={0.12} className="relative hidden lg:block">
              <div className="relative rounded-3xl border border-white bg-white p-6 shadow-xl shadow-[#65c4ff]/10">
                <div className="flex items-center gap-1.5 mb-5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <MetricCard label="Saldo" val="Rp5,3Jt" accent="#1597e5" bg="#eaf6ff" />
                  <MetricCard label="Pemasukan" val="+Rp8,5Jt" accent="#10b981" bg="#ecfdf5" />
                  <MetricCard label="Pengeluaran" val="−Rp3,2Jt" accent="#ef4444" bg="#fef2f2" />
                </div>
                <div className="space-y-2">
                  <TxLine name="Gaji Bulanan" cat="Gaji" amt="+Rp5.000.000" color="#10b981" />
                  <TxLine name="Sewa Kos" cat="Tagihan" amt="−Rp1.200.000" color="#ef4444" />
                  <TxLine name="Groceries" cat="Makanan" amt="−Rp450.000" color="#ef4444" />
                  <TxLine name="Transport" cat="Transport" amt="−Rp180.000" color="#ef4444" />
                </div>
              </div>
              <FloatCard className="absolute -left-10 top-8" delay={0.5}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ecfdf5]"><TrendingDown className="h-4 w-4 text-[#10b981]" /></div>
                <div><p className="text-[13px] font-semibold text-[#0f172a]">+ Rp5.000.000</p><p className="text-[11px] text-[#94a3b8]">Gaji masuk hari ini</p></div>
              </FloatCard>
              <FloatCard className="absolute -right-8 top-24" delay={0.65}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eaf6ff]"><CheckCircle2 className="h-4 w-4 text-[#1597e5]" /></div>
                <div><p className="text-[13px] font-semibold text-[#0f172a]">3 tugas selesai</p><p className="text-[11px] text-[#94a3b8]">Hari ini</p></div>
              </FloatCard>
            </Animate>
          </div>
        </div>
      </section>

      {/* ────────── FITUR — bento grid ────────── */}
      <section id="fitur" className="relative overflow-hidden bg-[#ffffff] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="mb-4 inline-flex items-center justify-center rounded-full bg-[#1597e5]/10 px-5 py-2 text-[13px] font-bold text-[#1597e5]">Fitur Unggulan</span>
              <h2 className="text-[30px] font-bold tracking-[-0.01em] sm:text-[38px] leading-[1.15]">Anda butuh satu tempat<br className="hidden sm:block" /> untuk mengatur semuanya.</h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-[#64748b]">Bukan daftar tugas biasa, bukan aplikasi keuangan biasa. Alflow menggabungkan keduanya — jadi Anda tidak perlu lompat-lompat.</p>
            </div>
          </Animate>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <Animate delay={0} className="sm:col-span-2 lg:col-span-2 rounded-3xl border border-[#e8f6ff] bg-[#f6fcff] overflow-hidden hover:shadow-xl hover:shadow-[#65c4ff]/10 transition-all hover:-translate-y-1">
              <div className="p-7 pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1597e5] border border-[#e2e8f0]"><ListTodo className="h-5 w-5" /></div>
                  <h3 className="text-[18px] font-semibold text-[#0f172a]">Catatan Tugas</h3>
                </div>
                <p className="text-[14px] text-[#64748b] leading-relaxed mb-5">Buat tugas, bagi menjadi subtask, atur prioritas &amp; deadline. Kalau ada yang terlambat, langsung terlihat.</p>
              </div>
              <div className="mx-6 mb-6 rounded-2xl border border-[#e2e8f0] bg-white p-4">
                <div className="space-y-2.5">
                  <TaskItem text="Kirim laporan bulanan" p="Tinggi" state="active" />
                  <TaskItem text="Review desain UI v2" p="Sedang" state="active" />
                  <TaskItem text="Bayar internet" p="Tinggi" state="overdue" />
                  <TaskItem text="Backup file project" p="Rendah" state="done" />
                </div>
              </div>
            </Animate>

            <Animate delay={0.08} className="sm:col-span-2 lg:col-span-1 rounded-3xl border border-[#e8f6ff] bg-white overflow-hidden hover:shadow-xl hover:shadow-[#65c4ff]/10 transition-all hover:-translate-y-1">
              <div className="p-7 pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ecfdf5] text-[#10b981]"><Wallet className="h-5 w-5" /></div>
                  <h3 className="text-[18px] font-semibold text-[#0f172a]">Keuangan Jelas</h3>
                </div>
                <p className="text-[14px] text-[#64748b] leading-relaxed mb-5">Pemasukan, pengeluaran, saldo — semua terlihat dalam satu pandangan.</p>
              </div>
              <div className="mx-5 mb-6 rounded-2xl border border-[#e2e8f0] bg-[#f6fcff] p-4 space-y-2.5">
                <MiniTx name="Gaji" amt="+Rp5.000.000" c="#10b981" />
                <MiniTx name="Kos" amt="−Rp1.200.000" c="#ef4444" />
                <MiniTx name="Makan" amt="−Rp450.000" c="#ef4444" />
              </div>
            </Animate>

            <Animate delay={0.12} className="rounded-3xl border border-[#e8f6ff] bg-white p-7 hover:shadow-xl hover:shadow-[#65c4ff]/10 transition-all hover:-translate-y-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7ed] text-[#f59e0b] mb-3"><Target className="h-5 w-5" /></div>
              <h3 className="text-[18px] font-semibold text-[#0f172a] mb-1.5">Batas Anggaran</h3>
              <p className="text-[14px] text-[#64748b] leading-relaxed mb-4">Tetapkan limit per kategori. Kalau sudah mendekati batas, Alflow langsung memberi tahu.</p>
              <div className="rounded-2xl border border-[#e2e8f0] bg-[#f6fcff] p-4">
                <div className="flex items-center justify-between text-[13px] mb-1.5">
                  <span className="font-medium text-[#0f172a]">Makanan</span>
                  <span className="font-semibold text-[#f59e0b]">72%</span>
                </div>
                <div className="h-2 rounded-full bg-[#e2e8f0] overflow-hidden"><div className="h-full rounded-full bg-[#f59e0b]" style={{ width: "72%" }} /></div>
                <p className="text-[12px] text-[#94a3b8] mt-1.5">Rp720.000 / Rp1.000.000</p>
              </div>
            </Animate>

            <Animate delay={0.16} className="rounded-3xl border border-[#e8f6ff] bg-white p-7 hover:shadow-xl hover:shadow-[#65c4ff]/10 transition-all hover:-translate-y-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ecfdf5] text-[#10b981] mb-3"><PiggyBank className="h-5 w-5" /></div>
              <h3 className="text-[18px] font-semibold text-[#0f172a] mb-1.5">Target Tabungan</h3>
              <p className="text-[14px] text-[#64748b] leading-relaxed mb-4">Buat rencana nabung, atur target &amp; deadline. Progress bar-nya membuat termotivasi.</p>
              <div className="rounded-2xl border border-[#e2e8f0] bg-[#f6fcff] p-4">
                <div className="flex items-center justify-between text-[13px] mb-1.5">
                  <span className="font-medium text-[#0f172a]">Dana Darurat</span>
                  <span className="font-semibold text-[#1597e5]">65%</span>
                </div>
                <div className="h-2 rounded-full bg-[#e2e8f0] overflow-hidden"><div className="h-full rounded-full bg-[#1597e5]" style={{ width: "65%" }} /></div>
                <p className="text-[12px] text-[#94a3b8] mt-1.5">45 hari lagi · Rp72.222/hari</p>
              </div>
            </Animate>

            <Animate delay={0.2} className="rounded-3xl border border-[#e8f6ff] bg-white p-7 hover:shadow-xl hover:shadow-[#65c4ff]/10 transition-all hover:-translate-y-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faf5ff] text-[#8b5cf6] mb-3"><Repeat className="h-5 w-5" /></div>
              <h3 className="text-[18px] font-semibold text-[#0f172a] mb-1.5">Transaksi Berulang</h3>
              <p className="text-[14px] text-[#64748b] leading-relaxed">Gaji bulanan, bayar kos, langganan — atur otomatis, tidak perlu input manual setiap bulan.</p>
            </Animate>
          </div>
        </div>
      </section>

      {/* ────────── REKAP BULANAN ────────── */}
      <section id="rekap" className="relative overflow-hidden bg-[#e8f6ff] py-24 sm:py-32">
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-white/70" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-white/50" />
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
              <div>
                <span className="mb-4 inline-flex items-center rounded-full bg-white px-5 py-2 text-[13px] font-bold text-[#1597e5]">Rekap Bulanan</span>
                <h2 className="text-[30px] font-bold tracking-[-0.01em] sm:text-[38px] leading-[1.15]">Uang Anda habis untuk apa saja,<br />semuanya terlihat di sini.</h2>
                <p className="mt-5 text-[16px] leading-[1.7] text-[#475569]">
                  Lihat pie chart pengeluaran per kategori. Tahu persis uang Anda habis untuk apa saja — dari makanan, transport, sampai hiburan. Tidak perlu menebak-nebak lagi.
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    "Pie chart interaktif per kategori",
                    "Rekap per bulan yang bisa di-scroll",
                    "Bandingkan pengeluaran bulan ini vs bulan lalu",
                  ].map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-[15px] text-[#475569]">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white"><CheckCircle2 className="h-3.5 w-3.5 text-[#1597e5]" /></div>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-white bg-white p-7 shadow-xl shadow-[#65c4ff]/10">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[14px] font-semibold text-[#0f172a]">Rekap Maret 2026</p>
                  <span className="text-[12px] font-medium text-[#94a3b8]">Rp3.200.000 total</span>
                </div>
                <div className="flex items-center justify-center mb-6">
                  <svg viewBox="0 0 120 120" className="h-44 w-44">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e8f6ff" strokeWidth="18" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="18" strokeDasharray="110 204" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 60 60)" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f59e0b" strokeWidth="18" strokeDasharray="63 251" strokeDashoffset="-110" strokeLinecap="round" transform="rotate(-90 60 60)" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#3b82f6" strokeWidth="18" strokeDasharray="45 269" strokeDashoffset="-173" strokeLinecap="round" transform="rotate(-90 60 60)" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="18" strokeDasharray="32 282" strokeDashoffset="-218" strokeLinecap="round" transform="rotate(-90 60 60)" />
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { cat: "Makanan", pct: "35%", color: "#ef4444" },
                    { cat: "Transport", pct: "20%", color: "#f59e0b" },
                    { cat: "Tagihan", pct: "14%", color: "#3b82f6" },
                    { cat: "Hiburan", pct: "10%", color: "#10b981" },
                  ].map(c => (
                    <div key={c.cat} className="flex items-center gap-2 rounded-xl bg-[#f6fcff] px-3 py-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                      <span className="text-[13px] font-medium text-[#475569]">{c.cat}</span>
                      <span className="ml-auto text-[13px] font-bold tabular-nums" style={{ color: c.color }}>{c.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ────────── CARA KERJA ────────── */}
      <section id="cara" className="relative overflow-hidden bg-[#ffffff] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="text-center mb-16">
              <span className="mb-4 inline-flex items-center justify-center rounded-full bg-[#1597e5]/10 px-5 py-2 text-[13px] font-bold text-[#1597e5]">Cara Kerja</span>
              <h2 className="text-[30px] font-bold tracking-[-0.01em] sm:text-[38px] text-[#0f172a]">Mulai dalam 4 langkah mudah.</h2>
              <p className="mt-3 text-[16px] text-[#64748b]">Tidak perlu pengaturan rumit. Langsung pakai.</p>
            </div>
          </Animate>

          <div className="mx-auto max-w-2xl">
            {[
              { n: "01", icon: <ListTodo className="h-5 w-5" />, t: "Pilih cara masuk", d: "Daftar pakai email atau Google. Atau langsung coba sebagai tamu — tanpa perlu daftar.", accent: "#1597e5", bg: "#eaf6ff" },
              { n: "02", icon: <Wallet className="h-5 w-5" />, t: "Catat aktivitas", d: "Tambah tugas, catat transaksi, atau buat rencana tabungan baru.", accent: "#10b981", bg: "#ecfdf5" },
              { n: "03", icon: <Target className="h-5 w-5" />, t: "Atur batas", d: "Tetapkan budget per kategori dan deadline setiap tugas. Biar ada yang mendorong.", accent: "#f59e0b", bg: "#fff7ed" },
              { n: "04", icon: <PieChart className="h-5 w-5" />, t: "Pantau terus", d: "Cek rekap bulanan, lihat grafik, dan pastikan semuanya on track.", accent: "#8b5cf6", bg: "#f5f3ff" },
            ].map((s, i) => (
              <Animate key={s.n} delay={i * 0.1}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg" style={{ background: s.accent, boxShadow: `0 8px 20px ${s.accent}30` }}>
                      {s.icon}
                    </div>
                    {i < 3 && <div className="w-0.5 flex-1 my-1 rounded bg-[#e2e8f0]" />}
                  </div>
                  <div className={`pb-10 ${i === 3 ? "pb-0" : ""}`}>
                    <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: s.accent }}>Langkah {s.n}</span>
                    <h3 className="text-[18px] font-semibold text-[#0f172a] mt-1">{s.t}</h3>
                    <p className="text-[15px] text-[#64748b] leading-relaxed mt-1">{s.d}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── DETAIL — Tugas ────────── */}
      <section id="detail" className="relative overflow-hidden bg-[#f6fcff] py-24 sm:py-32">
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#65c4ff]/10" />
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1597e5]/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-[#1597e5] mb-4">
                  <ListTodo className="h-3.5 w-3.5" /> Tugas
                </span>
                <h2 className="text-[28px] font-bold tracking-[-0.01em] sm:text-[34px] leading-[1.15]">Tugas yang jelas,<br />tanpa perlu berpikir dua kali.</h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#64748b]">
                  Mulai dari yang kecil — &quot;beli kopi&quot; — sampai yang besar — &quot;menyelesaikan proposal&quot;. Alflow membantu Anda mengurutkan mana yang harus dikerjakan lebih dahulu.
                </p>
                <ul className="mt-5 space-y-3">
                  {["Subtask untuk memecah jadi bagian kecil", "Prioritas: rendah, sedang, tinggi", "Deadline yang terlihat jelas"].map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-[15px] text-[#475569]">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white"><CheckCircle2 className="h-3.5 w-3.5 text-[#1597e5]" /></div>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-white bg-white p-5 shadow-xl shadow-[#65c4ff]/10">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e2e8f0]/60">
                  <div className="h-2 w-2 rounded-full bg-[#ef4444]" />
                  <div className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                  <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                  <span className="ml-auto text-[11px] text-[#94a3b8]">4 tugas aktif</span>
                </div>
                <div className="space-y-2.5">
                  <TaskItem text="Selesaikan laporan Q2" p="Tinggi" state="active" />
                  <TaskItem text="Riset kompetitor" p="Sedang" state="active" />
                  <TaskItem text="Meeting jam 3 sore" p="Tinggi" state="overdue" />
                  <TaskItem text="Update README" p="Rendah" state="done" />
                  <TaskItem text="Deploy staging" p="Sedang" state="active" />
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ────────── DETAIL — Keuangan ────────── */}
      <section id="detail-keuangan" className="relative overflow-hidden bg-[#ffffff] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1597e5]/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-[#1597e5] mb-4">
                  <Wallet className="h-3.5 w-3.5" /> Keuangan
                </span>
                <h2 className="text-[28px] font-bold tracking-[-0.01em] sm:text-[34px] leading-[1.15]">Uang masuk dan keluar,<br />semuanya terlihat.</h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#64748b]">
                  Tidak perlu lagi menebak-nebak sisa saldo di akhir bulan. Catat setiap transaksi, pilih kategori yang tepat, dan biarkan Alflow menghitung semuanya.
                </p>
                <ul className="mt-5 space-y-3">
                  {["Kategori: Makanan, Transport, Tagihan, dll.", "Pie chart distribusi pengeluaran", "Rekap per bulan yang bisa di-scroll"].map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-[15px] text-[#475569]">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#eaf6ff]"><CheckCircle2 className="h-3.5 w-3.5 text-[#1597e5]" /></div>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-white bg-white p-5 shadow-xl shadow-[#65c4ff]/10">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e2e8f0]/60">
                  <div className="h-2 w-2 rounded-full bg-[#65c4ff]" />
                  <span className="ml-auto text-[11px] text-[#94a3b8]">Maret 2026</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <MetricCard label="Saldo" val="Rp5,3Jt" accent="#1597e5" bg="#eaf6ff" />
                  <MetricCard label="Masuk" val="+Rp8,5Jt" accent="#10b981" bg="#ecfdf5" />
                  <MetricCard label="Keluar" val="−Rp3,2Jt" accent="#ef4444" bg="#fef2f2" />
                </div>
                <div className="space-y-2">
                  <TxLine name="Gaji Bulanan" cat="Gaji" amt="+Rp5.000.000" color="#10b981" />
                  <TxLine name="Sewa Kos" cat="Tagihan" amt="−Rp1.200.000" color="#ef4444" />
                  <TxLine name="Groceries" cat="Makanan" amt="−Rp450.000" color="#ef4444" />
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ────────── DETAIL — Tabungan & Anggaran ────────── */}
      <section id="detail-tabungan" className="relative overflow-hidden bg-[#f6fcff] py-24 sm:py-32">
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#65c4ff]/10" />
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1597e5]/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-[#1597e5] mb-4">
                  <PiggyBank className="h-3.5 w-3.5" /> Tabungan &amp; Anggaran
                </span>
                <h2 className="text-[28px] font-bold tracking-[-0.01em] sm:text-[34px] leading-[1.15]">Menabung ada target,<br />belanja ada batas.</h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#64748b]">
                  Buat rencana nabung untuk liburan, dana darurat, atau gadget baru. Atur juga budget bulanan per kategori — agar tidak melebihi batas.
                </p>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#64748b]">
                  Tetapkan berapa yang ingin disisihkan setiap bulan, kapan target harus tercapai, dan Alflow akan menghitung sisa yang perlu Anda kumpulkan. Semuanya terpantau dari satu tempat.
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    "Target nabung dengan deadline — lihat progress bar-nya",
                    "Budget per kategori: Makanan, Transport, Hiburan, dll.",
                    "Peringatan otomatis saat pengeluaran mendekati batas",
                    "Rekap akhir bulan — tahu uang habis untuk apa saja",
                  ].map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-[15px] text-[#475569]">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white"><CheckCircle2 className="h-3.5 w-3.5 text-[#1597e5]" /></div>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-white bg-white p-5 shadow-xl shadow-[#65c4ff]/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf6ff] text-[#1597e5]"><PiggyBank className="h-4 w-4" /></div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#0f172a]">Dana Darurat</p>
                        <p className="text-[12px] text-[#94a3b8]">Target Rp10.000.000</p>
                      </div>
                    </div>
                    <span className="rounded-lg bg-[#eaf6ff] px-2.5 py-1 text-[13px] font-bold text-[#1597e5]">65%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#e2e8f0] overflow-hidden mb-2">
                    <div className="h-full rounded-full bg-[#1597e5]" style={{ width: "65%" }} />
                  </div>
                  <div className="flex items-center justify-between text-[13px] text-[#94a3b8]">
                    <span>Tersisa Rp3.500.000</span>
                    <span>45 hari lagi</span>
                  </div>
                </div>
                <div className="rounded-3xl border border-white bg-white p-5 shadow-xl shadow-[#65c4ff]/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ecfdf5] text-[#10b981]"><Target className="h-4 w-4" /></div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#0f172a]">Gadget Baru</p>
                        <p className="text-[12px] text-[#94a3b8]">Target Rp5.000.000</p>
                      </div>
                    </div>
                    <span className="rounded-lg bg-[#ecfdf5] px-2.5 py-1 text-[13px] font-bold text-[#10b981]">30%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#e2e8f0] overflow-hidden mb-2">
                    <div className="h-full rounded-full bg-[#10b981]" style={{ width: "30%" }} />
                  </div>
                  <div className="flex items-center justify-between text-[13px] text-[#94a3b8]">
                    <span>Tersisa Rp3.500.000</span>
                    <span>90 hari lagi</span>
                  </div>
                </div>
                <div className="rounded-3xl border border-white bg-white p-5 shadow-xl shadow-[#65c4ff]/10">
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">Batas Anggaran</p>
                  <div className="space-y-3">
                    <BudgetBar cat="Makanan" used="Rp720K" total="Rp1Jt" pct={72} />
                    <BudgetBar cat="Transport" used="Rp350K" total="Rp500K" pct={70} />
                  </div>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ────────── FINAL CTA ────────── */}
      <section className="relative overflow-hidden bg-[#e8f6ff] py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/60" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-white/50" />
        <div className="mx-auto max-w-6xl px-5">
          <Animate>
            <div className="relative overflow-hidden rounded-[28px] p-10 text-center sm:p-14" style={{ background: "linear-gradient(135deg, #65c4ff 0%, #1597e5 100%)" }}>
              <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/15" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10" />
              <h2 className="relative text-[28px] font-bold tracking-[-0.01em] text-white sm:text-[36px]">Siap membuat hidup lebih teratur?</h2>
              <p className="relative mx-auto mt-4 max-w-lg text-[16px] text-white/85 leading-relaxed">
                Mulai dari sekarang. Gratis, tanpa kartu kredit, dan bisa langsung digunakan tanpa perlu mendaftar.
              </p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button onClick={() => scrollToId("detail")} className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-[15px] font-semibold text-[#1597e5] hover:bg-white/90 transition-all shadow-lg" style={{ boxShadow: "0 8px 30px rgba(0,0,0,.1)" }}>
                  Mulai Gratis <ArrowRight className="h-4 w-4" />
                </button>
                <a href="https://github.com/Zryyuu/zyto-web/releases/latest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-8 py-3 text-[15px] font-medium text-white hover:bg-white/10 transition-all">
                  <Download className="h-4 w-4" /> Download APK
                </a>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ────────── FOOTER ────────── */}
      <footer className="border-t border-[#e2e8f0]/60 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #65c4ff, #1597e5)" }}>
                  <span className="text-[12px] font-bold text-white">A</span>
                </div>
                <span className="text-[16px] font-bold tracking-tight text-[#0f172a]">Alflow</span>
              </div>
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-[#64748b]">Atur tugas. Kelola uang. Jalani hari dengan lebih terarah.</p>
            </div>

            {/* Navigasi — kiri */}
            <div>
              <p className="text-[13px] font-semibold text-[#0f172a] mb-4">Navigasi</p>
              <ul className="space-y-2.5">
                <li><button onClick={() => scrollToId("beranda")} className="text-[14px] text-[#64748b] hover:text-[#1597e5] transition-colors">Beranda</button></li>
                <li><button onClick={() => scrollToId("fitur")} className="text-[14px] text-[#64748b] hover:text-[#1597e5] transition-colors">Fitur</button></li>
                <li><button onClick={() => scrollToId("cara")} className="text-[14px] text-[#64748b] hover:text-[#1597e5] transition-colors">Cara Kerja</button></li>
                <li><a href="https://github.com/Zryyuu/zyto-web/releases/latest" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#64748b] hover:text-[#1597e5] transition-colors">Unduh APK</a></li>
              </ul>
            </div>

            {/* Fitur — kanan, link ke penjelasan yang sesuai */}
            <div>
              <p className="text-[13px] font-semibold text-[#0f172a] mb-4">Fitur</p>
              <ul className="space-y-2.5">
                <li><button onClick={() => scrollToId("detail")} className="text-[14px] text-[#64748b] hover:text-[#1597e5] transition-colors">Catatan Tugas</button></li>
                <li><button onClick={() => scrollToId("detail-keuangan")} className="text-[14px] text-[#64748b] hover:text-[#1597e5] transition-colors">Manajemen Keuangan</button></li>
                <li><button onClick={() => scrollToId("detail-tabungan")} className="text-[14px] text-[#64748b] hover:text-[#1597e5] transition-colors">Anggaran &amp; Tabungan</button></li>
                <li><button onClick={() => scrollToId("rekap")} className="text-[14px] text-[#64748b] hover:text-[#1597e5] transition-colors">Rekap Bulanan</button></li>
              </ul>
            </div>
          </div>

          {/* Proyek — tengah */}
          <div>
            <p className="text-[13px] font-semibold text-[#0f172a] mb-4">Proyek</p>
            <ul className="space-y-2.5">
              <li><a href="https://github.com/Zryyuu/zyto-web" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[14px] text-[#64748b] hover:text-[#1597e5] transition-colors"><Github className="h-4 w-4" /> GitHub</a></li>
              <li><a href="https://instagram.com/alflow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[14px] text-[#64748b] hover:text-[#1597e5] transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                Instagram
              </a></li>
              <li><a href="https://tiktok.com/@alflow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[14px] text-[#64748b] hover:text-[#1597e5] transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                TikTok
              </a></li>
            </ul>
          </div>

          <div className="mt-10 border-t border-[#e2e8f0]/60 pt-6 text-center text-[13px] text-[#94a3b8]">
            © 2026 Alflow. Dibuat dengan sepenuh hati.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Shared components ─── */

function MetricCard({ label, val, accent, bg }: { label: string; val: string; accent: string; bg: string }) {
  return (
    <div className="rounded-xl p-3" style={{ background: bg }}>
      <p className="text-[11px] font-medium text-[#94a3b8]">{label}</p>
      <p className="text-[16px] font-bold tabular-nums mt-0.5" style={{ color: accent }}>{val}</p>
    </div>
  );
}

function TxLine({ name, cat, amt, color }: { name: string; cat: string; amt: string; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#f6fcff] px-3.5 py-2.5">
      <div>
        <p className="text-[13px] font-medium text-[#0f172a]">{name}</p>
        <p className="text-[11px] text-[#94a3b8]">{cat}</p>
      </div>
      <span className="text-[13px] font-bold tabular-nums" style={{ color }}>{amt}</span>
    </div>
  );
}

function MiniTx({ name, amt, c }: { name: string; amt: string; c: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5">
      <span className="text-[13px] font-medium text-[#0f172a]">{name}</span>
      <span className="text-[13px] font-bold tabular-nums" style={{ color: c }}>{amt}</span>
    </div>
  );
}

function FloatCard({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`rounded-2xl border border-white bg-white px-4 py-3 shadow-lg shadow-[#65c4ff]/10 flex items-center gap-3 ${className || ""}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: `opacity 0.35s ease ${delay || 0}s, transform 0.35s ease ${delay || 0}s` }}>
      {children}
    </div>
  );
}

function TaskItem({ text, p, state }: { text: string; p: string; state: "active" | "overdue" | "done" }) {
  const pc = p === "Tinggi" ? "#ef4444" : p === "Sedang" ? "#f59e0b" : "#10b981";
  return (
    <div className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${
      state === "overdue" ? "border-red-200 bg-red-50/60" : state === "done" ? "border-[#e2e8f0] bg-[#f6fcff] opacity-55" : "border-[#e2e8f0] bg-white"
    }`}>
      <div className={`h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
        state === "done" ? "border-[#10b981] bg-[#10b981]" : "border-[#d1d5db]"
      }`}>
        {state === "done" && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
      </div>
      <p className={`flex-1 text-[13px] font-medium ${
        state === "done" ? "text-[#94a3b8] line-through" : state === "overdue" ? "text-[#ef4444]" : "text-[#0f172a]"
      }`}>{text}</p>
      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{
        background: state === "overdue" ? "#fef2f2" : state === "done" ? "#f1f5f9" : `${pc}12`,
        color: state === "overdue" ? "#ef4444" : state === "done" ? "#94a3b8" : pc,
      }}>
        {state === "overdue" ? "Terlambat" : state === "done" ? "Selesai" : p}
      </span>
    </div>
  );
}

function BudgetBar({ cat, used, total, pct }: { cat: string; used: string; total: string; pct: number }) {
  const c = pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#1597e5";
  return (
    <div>
      <div className="flex items-center justify-between text-[13px] mb-1.5">
        <span className="font-medium text-[#0f172a]">{cat}</span>
        <span className="font-semibold tabular-nums" style={{ color: c }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-[#e2e8f0] overflow-hidden"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: c }} /></div>
      <p className="text-[12px] text-[#94a3b8] mt-1">{used} / {total}</p>
    </div>
  );
}
