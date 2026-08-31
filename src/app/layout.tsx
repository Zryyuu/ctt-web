import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import UpdateChecker from "@/components/update-checker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alflow - Atur Tugas & Keuangan",
  description: "Workspace untuk tugas, keuangan, anggaran, dan tabungan",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Alflow",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1597e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.className}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <AuthProvider>
          {children}
          <UpdateChecker />
        </AuthProvider>
      </body>
    </html>
  );
}
