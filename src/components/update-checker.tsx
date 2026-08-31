"use client";
import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Download } from "lucide-react";

const CHECK_INTERVAL = 60_000; // check every 60s

export default function UpdateChecker() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentVersion, setCurrentVersion] = useState("");

  const checkForUpdate = useCallback(async () => {
    try {
      const res = await fetch("/version.json?t=" + Date.now());
      if (!res.ok) return;
      const data = await res.json();
      const latest = data.version as string;

      const stored = localStorage.getItem("zyto_app_version");

      if (stored && stored !== latest) {
        setCurrentVersion(latest);
        setShowUpdate(true);
      }

      localStorage.setItem("zyto_app_version", latest);
    } catch {
      // silent - offline or network error
    }
  }, []);

  useEffect(() => {
    checkForUpdate();
    const interval = setInterval(checkForUpdate, CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [checkForUpdate]);

  const handleUpdate = () => {
    localStorage.setItem("zyto_app_version", currentVersion);
    window.location.reload();
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/30 p-4 sm:items-center">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-indigo-100">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
            <Download className="h-7 w-7 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Update Tersedia!</h3>
          <p className="mt-2 text-sm text-gray-500">
            Versi baru <span className="font-mono font-medium text-indigo-600">{currentVersion}</span> sudah tersedia.
            Refresh untuk mendapatkan versi terbaru.
          </p>
          <button
            onClick={handleUpdate}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Sekarang
          </button>
          <button
            onClick={() => setShowUpdate(false)}
            className="mt-2 text-xs text-gray-400 hover:text-gray-600"
          >
            Nanti Saja
          </button>
        </div>
      </div>
    </div>
  );
}
