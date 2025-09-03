"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

interface NavLink {
  name: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-white" : "bg-gray-900";
  const textColor = isDark ? "text-gray-900" : "text-white";
  const mutedTextColor = isDark ? "text-gray-600" : "text-gray-300";
  const hoverColor = isDark ? "hover:text-gray-700" : "hover:text-gray-100";
  const borderColor = isDark ? "border-gray-200" : "border-gray-800";

  const navigationLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/About" },
    { name: "Project", href: "/Project" },
  ];

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      href: "https://github.com/andrejun1",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.581.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Tiktok",
      href: "https://www.tiktok.com/@andreejun",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M12 2c1.1 0 2 .9 2 2v12.5a3.5 3.5 0 11-3.5-3.5
           3.46 3.46 0 011.5.34V11.6a6.45 6.45 0 00-1.5-.18
           6.5 6.5 0 106.5 6.5V9.88a6.54 6.54 0 003.5 1.02V8.3
           c-.57 0-1.12-.09-1.64-.26a3.48 3.48 0 01-1.86-1.42
           3.48 3.48 0 01-.5-1.83V4a2 2 0 00-2-2h-2z"
          />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:junikayusuf11@gmail.com",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 
           2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className={`${bgColor} ${textColor} border-t ${borderColor} transition-colors duration-300`}
    >
      <div className="container mx-auto px-5 py-10 md:px-6 md:py-12">
        {/* Grid Responsif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-x-6 lg:gap-10">
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="sm:col-span-1">
            <h3 className="text-lg font-semibold mb-3">Andre Junika</h3>
            <p
              className={`text-sm ${mutedTextColor} leading-relaxed max-w-[300px]`}
            >
              Smart digital solutions with elegant designs, focused on user
              satisfaction and superior speed.
            </p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="sm:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">
              Links
            </h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`inline-block ${mutedTextColor} transition ${hoverColor} text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded px-1 py-0.5`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Media Sosial */}
          <div className="sm:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">
              Follow Me
            </h4>
            <div className="flex space-x-5 mb-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow me on ${social.name}`}
                  className={`${mutedTextColor} transition ${hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1.5`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            <p
              className={`text-xs ${mutedTextColor} leading-relaxed max-w-[300px]`}
            >
              Connect on social media platforms for the latest updates.
            </p>
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className={`my-8 border-t ${borderColor} opacity-20`} />

        {/* Copyright */}
        <div className="text-center">
          <p className={`text-xs ${mutedTextColor}`}>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium">Andre Junika</span>. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
