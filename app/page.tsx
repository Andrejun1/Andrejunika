"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PreLoader from "@/components/PreLoader";

// UI Components
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Custom Components
import ScrollVelocity from "@/components/ScrollVelocity/ScrollVelocity";
import ModeToggle from "@/components/mode-toggle";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { TextReveal } from "@/components/magicui/text-reveal";
import LogoLoop from "@/components/LogoLoop/LogoLoop";
import Calendar from "react-github-calendar";
import FlowingMenu from "@/components/FlowingMenu/FlowingMenu";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { HyperText } from "@/components/magicui/hyper-text";
import Lanyard from "@/components/Lanyard/Lanyard";
import GitHubCalendar from "@/components/GitHubCalendar";

// Icons
import { CalendarIcon, HomeIcon, MailIcon, PencilIcon } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiPython,
  SiGo,
  SiPhp,
  SiSwift,
  SiKotlin,
  SiDart,
  SiGithub,
  SiDocker,
  SiPostgresql,
} from "react-icons/si";

// Utilities
import { cn } from "@/lib/utils";

// Config
import { siteConfig } from "@/config/site";

// Animation variants - Fixed TypeScript types
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideInFromLeft: any = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const slideInFromRight: any = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const fadeInUp: any = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

/**
 * Mapping semua ikon yang digunakan di social media
 * Untuk mempermudah penggunaan di Dock
 */
export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  calendar: (props: React.HTMLAttributes<SVGElement>) => (
    <CalendarIcon {...props} />
  ),
  email: (props: React.HTMLAttributes<SVGElement>) => <MailIcon {...props} />,
  linkedin: (props: React.HTMLAttributes<SVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn</title>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  x: (props: React.HTMLAttributes<SVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>X</title>
      <path
        fill="currentColor"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      />
    </svg>
  ),
  youtube: (props: React.HTMLAttributes<SVGElement>) => (
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>YouTube</title>
      <path d="M29.41,9.26a3.5,3.5,0,0,0-2.47-2.47C24.76,6.2,16,6.2,16,6.2s-8.76,0-10.94.59A3.5,3.5,0,0,0,2.59,9.26,36.13,36.13,0,0,0,2,16a36.13,36.13,0,0,0,.59,6.74,3.5,3.5,0,0,0,2.47,2.47C7.24,25.8,16,25.8,16,25.8s8.76,0,10.94-.59a3.5,3.5,0,0,0,2.47-2.47A36.13,36.13,0,0,0,30,16,36.13,36.13,0,0,0,29.41,9.26ZM13.2,20.2V11.8L20.47,16Z" />
    </svg>
  ),
  github: (props: React.HTMLAttributes<SVGElement>) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
};

// Teknologi yang digunakan (untuk LogoLoop)
const techLogos = [
  { node: <SiReact size={32} />, title: "React", href: "https://react.dev" },
  {
    node: <SiNextdotjs size={32} />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <SiTypescript size={32} />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss size={32} />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiJavascript size={32} />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    node: <SiPython size={32} />,
    title: "Python",
    href: "https://www.python.org",
  },
  { node: <SiGo size={32} />, title: "Go", href: "https://go.dev" },
  { node: <SiPhp size={32} />, title: "PHP", href: "https://www.php.net" },
  { node: <SiSwift size={32} />, title: "Swift", href: "https://swift.org" },
  {
    node: <SiKotlin size={32} />,
    title: "Kotlin",
    href: "https://kotlinlang.org",
  },
  { node: <SiDart size={32} />, title: "Dart", href: "https://dart.dev" },
  { node: <SiGithub size={32} />, title: "GitHub", href: "https://github.com" },
  {
    node: <SiDocker size={32} />,
    title: "Docker",
    href: "https://www.docker.com",
  },
  {
    node: <SiPostgresql size={32} />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
];

// Alternative with image sources
const imageLogos = [
  {
    src: "/logos/company1.png",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "/logos/company2.png",
    alt: "Company 2",
    href: "https://company2.com",
  },
  {
    src: "/logos/company3.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
];

const demoItems = [
  {
    id: 1,
    title: "Website RT 14",
    subtitle: "Recap of documentation and real-time announcements",
    image: "/project1.png",
    href: "https://rt14perumkorpri.vercel.app/",
  },
  {
    id: 2,
    title: "Website Posyandu RT 14",
    subtitle: "posyandu data recap and real-time announcements website",
    image: "/project2.png",
    href: "https://posyanduperumkorpri.vercel.app/",
  },
  {
    id: 3,
    title: "Website Innovation Computer",
    subtitle: "Landing Page Innovation Computer",
    image: "/project3.png",
    href: "https://incomp.vercel.app/",
  },
  {
    id: 4,
    title: "Website Zodiak",
    subtitle: "Find out your personality here (don't take it too seriously)",
    image: "/project4.png",
    href: "https://andrejun1.github.io/Zodiak/",
  },
];

// Custom hook for section animations
function useSectionAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return { ref, isInView };
}

/**
 * Komponen utama halaman Home dengan animasi entrance yang ditingkatkan
 */
export default function Home() {
  const heroRef = useRef(null);
  const descRef = useRef(null);
  const techRef = useRef(null);
  const projectRef = useRef(null);
  const quotesRef = useRef(null);
  const contactRef = useRef(null);
  const lanyardRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const descInView = useInView(descRef, { once: true, margin: "-100px" });
  const techInView = useInView(techRef, { once: true, margin: "-100px" });
  const projectInView = useInView(projectRef, { once: true, margin: "-100px" });
  const quotesInView = useInView(quotesRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });
  const lanyardInView = useInView(lanyardRef, { once: true, margin: "-100px" });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      {/* ✅ BLOCK 1: Hero Section with Staggered Animation */}
      <motion.section
        ref={heroRef}
        className="flex flex-col items-center justify-center min-h-screen px-25 pt-41 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-3 sm:mb-1">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={80}
            height={80}
            className="dark:invert"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center mb-4 sm:mb-1 text-muted-foreground px-4"
        >
          Andre Junika Yusuf F
        </motion.h1>

        {/* ScrollVelocity */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-full mx-auto text-center mb-6 sm:mb-8 overflow-hidden"
        >
          <ScrollVelocity
            texts={["FULL STACK DEVELOPER", "FULL STACK DEVELOPER"]}
            velocity={150}
            className="custom-scroll-text text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-8xl font-bold"
          />
        </motion.div>

        {/* Mouse gif */}
        <motion.div variants={itemVariants} className="mb-1 sm:mb-1">
          <Image
            src="/mouse.gif"
            alt="Scroll indicator"
            width={80}
            height={80}
            className="dark:invert"
          />
        </motion.div>
      </motion.section>

      {/* ✅ BLOCK 2: Deskripsi dengan TextReveal - Responsif */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-25 pt-20 sm:pt-32 md:pt-41 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto">
          <TextReveal>
            Hi, I'm Andre Junika Yusuf F, a Full Stack Developer passionate
            about building scalable, user-friendly web and mobile applications.
            I combine clean front-end design with efficient back-end
            functionality, while prioritizing UI/UX to deliver intuitive and
            visually appealing solutions
          </TextReveal>
        </div>
      </section>

      {/* ✅ BLOCK 3: Tech Stack - Responsif */}
      <section className="flex flex-col items-center justify-center min-h-screen px-25 pt-41 pb-16">
        {/* Judul utama - Responsif */}
        <h2
          className="font-extrabold text-foreground/5 mb-1 text-center leading-none tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 12vw, 17rem)",
          }}
        >
          TECH STACK
        </h2>

        {/* GitHub Calendar - Responsif */}
        <div className="container mx-auto py-8 sm:py-12 md:py-16 px-2 sm:px-4">
          <div className="overflow-x-auto overflow-y-hidden">
            <div className="min-w-[600px] w-full flex justify-center">
              <GitHubCalendar username="Andrejun1" showLegend showTotal />
            </div>
          </div>
        </div>

        {/* Logo Loop - Responsif */}
        <div
          className="w-full mx-auto mb-6 sm:mb-8 md:mb-12 relative overflow-hidden"
          style={{
            height: "clamp(50px, 8vw, 80px)",
            maxWidth: "100%",
          }}
          aria-label="Technology logos scrolling carousel"
        >
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={40}
            gap={30}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="transparent"
            ariaLabel="Technology logo"
          />
        </div>

        {/* Tombol - Responsif */}
        <div className="mb-6 sm:mb-8 md:mb-10 text-center">
          <Link href="/About">
            <InteractiveHoverButton>More About Me</InteractiveHoverButton>
          </Link>
        </div>
      </section>

      {/* ✅ BLOCK 4: Projects with Slide Animation */}
      <motion.section
        ref={projectRef}
        className="flex-col items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-25 pt-20 sm:pt-32 md:pt-41 pb-8 sm:pb-12 md:pb-16"
        variants={staggerContainer}
        initial="hidden"
        animate={projectInView ? "visible" : "hidden"}
      >
        {/* Title */}
        <motion.h2
          variants={scaleIn}
          className="font-extrabold text-foreground/5 mb-1 text-center leading-none tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 12vw, 17rem)",
          }}
        >
          MY PROJECT
        </motion.h2>

        {/* FlowingMenu container */}
        <motion.div
          variants={slideInFromLeft}
          className="w-full max-w-2xl mx-auto"
          style={{
            height: "clamp(600px, 50vh, 400px)",
            position: "relative",
          }}
        >
          <FlowingMenu items={demoItems} />
        </motion.div>

        {/* Button */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                bounce: 0.3,
                duration: 0.6,
              },
            },
          }}
          className="mb-6 sm:mb-8 md:mb-10 text-center"
        >
          <Link href="/Project">
            <InteractiveHoverButton>Go to Project</InteractiveHoverButton>
          </Link>
        </motion.div>
      </motion.section>

      {/* ✅ BLOCK 5: Quotes with Typewriter Effect */}
      <motion.section
        ref={quotesRef}
        className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-25 pt-20 sm:pt-32 md:pt-41 pb-8 sm:pb-12 md:pb-16"
        variants={staggerContainer}
        initial="hidden"
        animate={quotesInView ? "visible" : "hidden"}
      >
        {/* Title */}
        <motion.h2
          variants={scaleIn}
          className="font-extrabold text-foreground/5 mb-1 text-center leading-none tracking-tight -mt-6 sm:-mt-8 md:-mt-10"
          style={{
            fontSize: "clamp(2.5rem, 12vw, 17rem)",
          }}
        >
          QUOTES
        </motion.h2>

        {/* Quote with character-by-character reveal */}
        <motion.h2
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="font-extrabold mb-4 sm:mb-6 md:mb-8 text-center leading-none tracking-tight -mt-4 sm:-mt-6 md:-mt-8 px-4"
          style={{
            fontSize: "clamp(1.5rem, 8vw, 3rem)",
          }}
        >
          {`❞\nMan jadda wajada,\nWhoever is sincere will surely succeed`
            .split("")
            .map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                style={{ whiteSpace: char === "\n" ? "pre" : "normal" }}
              >
                {char === "\n" ? <br /> : char}
              </motion.span>
            ))}
        </motion.h2>

        {/* Attribution */}
        <motion.h2
          variants={fadeInUp}
          className="text-sm sm:text-base md:text-lg font-medium text-center text-foreground/50 mb-16 sm:mb-24 md:mb-50 -mt-2 sm:-mt-3 md:-mt-4 px-4"
        >
          Andre Junika Yusuf F
        </motion.h2>
      </motion.section>

      {/* ✅ BLOCK 6: Contact with Magnetic Effect */}
      <motion.section
        ref={contactRef}
        className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-25 pt-20 sm:pt-32 md:pt-41 pb-8 sm:pb-12 md:pb-16"
        variants={staggerContainer}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
      >
        {/* Title */}
        <motion.h2
          variants={scaleIn}
          className="font-extrabold text-foreground/5 mb-1 text-center leading-none tracking-tight -mt-6 sm:-mt-8 md:-mt-10"
          style={{
            fontSize: "clamp(2.5rem, 12vw, 17rem)",
          }}
        >
          CONTACT
        </motion.h2>

        {/* Main heading with glitch effect */}
        <motion.h2
          variants={{
            hidden: { opacity: 0, rotateX: -90 },
            visible: {
              opacity: 1,
              rotateX: 0,
              transition: {
                duration: 1,
                ease: "easeOut",
              },
            },
          }}
          className="font-extrabold mb-4 sm:mb-6 md:mb-8 text-center leading-none tracking-tight -mt-4 sm:-mt-6 md:-mt-8 px-4"
          style={{
            fontSize: "clamp(1.5rem, 8vw, 3rem)",
          }}
        >
          LET'S CREATE <br />
          SOMETHING EXTRAORDINARY
        </motion.h2>

        {/* HyperText with pulse animation */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                bounce: 0.5,
                duration: 0.8,
              },
            },
          }}
          className="mb-4 sm:mb-6"
        >
          <div className="font-extrabold mb-2 text-center leading-none tracking-tight text-lg sm:text-xl md:text-2xl">
            <HyperText>CONTACT ME</HyperText>
          </div>
        </motion.div>

        {/* Description with wave animation */}
        <motion.h2
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.02,
              },
            },
          }}
          className="text-sm sm:text-base md:text-lg font-medium text-center text-foreground/50 mb-16 sm:mb-24 md:mb-50 -mt-2 sm:-mt-3 md:-mt-4 px-4 max-w-2xl"
        >
          {`Ready for new opportunities and collaborations.\nIf you have a project you would like to discuss or would like to\nconnect for professional purposes, please contact me.`
            .split("")
            .map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      damping: 12,
                      stiffness: 200,
                    },
                  },
                }}
                style={{ whiteSpace: char === "\n" ? "pre" : "normal" }}
              >
                {char === "\n" ? <br /> : char}
              </motion.span>
            ))}
        </motion.h2>
      </motion.section>

      {/* ✅ BLOCK 7: LANYARD */}
      <section className="flex flex-col items-center justify-center min-h-screen px-25 pt-41 pb-16">
        <Lanyard />
      </section>

      {/* ✅ Animated Dock Navigation */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 mb-4"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 1, duration: 0.8, type: "spring", bounce: 0.4 },
        }}
      >
        <TooltipProvider>
          <Dock
            direction="middle"
            className="border-secondary bg-background/80 backdrop-blur-sm"
            iconSize={35}
            iconMagnification={60}
            iconDistance={100}
          >
            {/* Navigation Items */}
            {siteConfig.navbar.map((item, index) => (
              <DockIcon key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.5 }}
                      transition={{
                        delay: 1.2 + index * 0.1,
                        type: "spring",
                        bounce: 0.4,
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-label={item.label}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-10 sm:size-12 rounded-full"
                        )}
                      >
                        <item.icon className="size-4 sm:size-6" />
                      </Link>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}

            <Separator orientation="vertical" className="h-full mx-1" />

            {/* Social Icons */}
            {Object.entries(siteConfig.contact.social).map(
              ([name, social], index) => (
                <DockIcon key={name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.5 }}
                        transition={{
                          delay: 1.4 + index * 0.1,
                          type: "spring",
                          bounce: 0.4,
                        }}
                      >
                        <Link
                          href={social.url}
                          aria-label={social.name}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "size-10 sm:size-12 rounded-full"
                          )}
                        >
                          <social.icon className="size-4 sm:size-6" />
                        </Link>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{name}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              )
            )}

            <Separator orientation="vertical" className="h-full mx-1" />

            {/* Theme Toggle */}
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ delay: 1.8, type: "spring", bounce: 0.4 }}
                  >
                    <AnimatedThemeToggler className="size-10 sm:size-12 rounded-full hover:bg-accent flex items-center justify-center" />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Theme</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </motion.div>
    </>
  );
}
