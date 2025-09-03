"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import PreLoader from "@/components/PreLoader";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/components/theme-provider";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showContent, setShowContent] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // ✅ Hanya jalan di Home
    if (pathname === "/") {
      // cek apakah sudah pernah tampil di sesi ini
      const hasShown = sessionStorage.getItem("hasSeenPreloader");

      if (!hasShown) {
        // kalau belum → tampilkan preloader
        setShowPreloader(true);

        // delay lalu tampilkan konten
        const timer = setTimeout(() => {
          setShowContent(true);
          setShowPreloader(false);
          sessionStorage.setItem("hasSeenPreloader", "true");
        }, 4000); // durasi preloader

        return () => clearTimeout(timer);
      } else {
        // kalau sudah pernah → langsung tampilkan konten
        setShowContent(true);
      }
    } else {
      // halaman lain langsung render
      setShowContent(true);
    }
  }, [pathname]);

  return (
    <>
      {/* ✅ PreLoader hanya sekali di Home (refresh pertama) */}
      {showPreloader && <PreLoader />}

      {showContent && (
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative flex min-h-screen flex-col overflow-visible">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      )}
    </>
  );
}
