import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">Ctt</h1>
            <p className="mt-6 text-lg leading-8 text-indigo-100">Aplikasi catatan tugas & pengeluaran yang simpel dan mudah digunakan</p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/login" className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50">Mulai Sekarang</Link>
              <Link href="/login" className="rounded-lg border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Coba Tanpa Login</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Fitur Unggulan</h2>
          <p className="mt-4 text-lg text-gray-500">Semua yang kamu butuhkan dalam satu aplikasi</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-2xl mb-3">📝</div>
            <h3 className="text-lg font-semibold text-gray-900">Catatan Tugas</h3>
            <p className="mt-2 text-sm text-gray-500">Kelola tugas dengan subtask, prioritas, dan deadline. Tetap produktif setiap hari.</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-2xl mb-3">💰</div>
            <h3 className="text-lg font-semibold text-gray-900">Keuangan</h3>
            <p className="mt-2 text-sm text-gray-500">Pantau pemasukan dan pengeluaran harian. Lihat ringkasan kategori & grafik.</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-2xl mb-3">🏦</div>
            <h3 className="text-lg font-semibold text-gray-900">Tabungan</h3>
            <p className="mt-2 text-sm text-gray-500">Rencanakan dan pantau target tabungan. Catat progress setiap hari.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cara Pakai</h2>
          </div>
          <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 sm:max-w-3xl sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-8 sm:gap-y-12">
            {[
              { step: "01", title: "Buat Akun atau Masuk", desc: "Daftar dengan email atau gunakan Google. Atau langsung coba sebagai tamu tanpa akun." },
              { step: "02", title: "Catat Aktivitas", desc: "Tambah tugas, transaksi, atau rencana tabungan. Atur sesuai kebutuhanmu." },
              { step: "03", title: "Pantau Perkembangan", desc: "Lihat ringkasan keuangan, progress tabungan, dan grafik ringkasan setiap bulan." },
            ].map((item) => (
              <div key={item.step} className="sm:col-span-1">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <span className="text-sm font-bold text-indigo-600">{item.step}</span>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">Ctt v1.1.0 — Dibuat dengan Next.js & Firebase</p>
            <a href="https://github.com/Zryyuu/zyto-web" target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-500">GitHub Repo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}