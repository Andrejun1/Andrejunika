"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [time, setTime] = useState<string>("");

  // Update jam setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-14 flex items-center justify-between px-6 z-50">
      {/* Logo kiri (pakai teks atau gambar) */}
      <div className="flex items-center space-x-2">
        {/* Kalau pakai image logo */}
        {/* <Image src="/logo.png" alt="Logo" width={32} height={32} /> */}
        <span className="text-2xl text-gray-900 dark:text-gray-100">
                    <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="dark:invert" // Auto-invert untuk dark mode
                  /></span>
      </div>

      {/* Jam realtime kanan */}
      <div className="font-mono text-lg text-gray-900 dark:text-gray-100">
        {time}
      </div>
    </nav>
  );
};

export default Navbar;
