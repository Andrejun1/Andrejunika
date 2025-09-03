"use client";

import {
  memo,
  useMemo,
  useCallback,
  useState,
  useEffect,
  forwardRef,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { Globe } from "@/components/magicui/globe";
import { IconCloud } from "@/components/magicui/icon-cloud";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import {
  MapPin,
  Code,
  Palette,
  Briefcase,
  Star,
  Smartphone,
  Terminal,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiFramer,
  SiMysql,
  SiGithub,
  SiDart,
  SiKotlin,
  SiDocker,
} from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";

// ---
// DATA DEFINITIONS
// ---

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const skills = [
  { name: "React", icon: SiReact, color: "from-blue-400 to-blue-600" },
  { name: "Next.js", icon: SiNextdotjs, color: "from-gray-800 to-black" },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "from-yellow-400 to-yellow-600",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "from-cyan-400 to-cyan-600",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "from-green-500 to-green-700",
  },
  { name: "Framer", icon: SiFramer, color: "from-pink-500 to-rose-600" },
  { name: "MySQL", icon: SiMysql, color: "from-red-400 to-pink-500" },
  { name: "Github", icon: SiGithub, color: "from-orange-500 to-red-600" },
  { name: "Dart", icon: SiDart, color: "from-blue-500 to-purple-600" },
  { name: "Kotlin", icon: SiKotlin, color: "from-blue-500 to-purple-600" },
  { name: "Docker", icon: SiDocker, color: "from-blue-500 to-purple-600" },
];

const interests = [
  {
    icon: Code,
    title: "Web Development",
    description: "Building responsive, modern web applications with clean code",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Android Development",
    description: "Creating Android-based applications",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Terminal,
    title: "Problem Solving",
    description: "Exploring new technologies to solve problems",
    gradient: "from-green-500 to-emerald-500",
  },
];

// ---
// ANIMATION VARIANTS (kept for consistency)
// ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    y: 50,
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const skillItemVariants = {
  hidden: {
    y: 30,
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 12,
    },
  },
};

const profileImageVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.3,
    },
  },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

// ---
// REFACTORED COMPONENTS WITH OPTIMIZATIONS
// ---

const Section = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    title: string;
    icon: React.ElementType;
    iconColor: string;
    initialDelay: number;
  }
>(({ children, title, icon: Icon, iconColor, initialDelay }, ref) => {
  return (
    <motion.div
      ref={ref}
      className="mb-12 bg-card rounded-xl border shadow-lg bg-gradient-to-br from-card to-muted/20 p-8"
      variants={itemVariants}
    >
      <motion.div
        className="mb-6"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: initialDelay, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Icon className={cn("w-5 h-5", iconColor)} />
          {title}
        </h2>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: initialDelay + 0.2, duration: 0.6 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
});

Section.displayName = "Section";

const SkillsSection = memo(() => {
  return (
    <Section
      title="Skills & Technologies"
      icon={Code}
      iconColor="text-green-600"
      initialDelay={1.6}
    >
      <p className="text-muted-foreground mb-6">
        Technologies and tools I work with
      </p>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={skillItemVariants}
                custom={index}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-gradient-to-br bg-card hover:shadow-lg transition-all duration-300 rounded-xl border p-4 cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    className="mb-2 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <IconComponent className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  </motion.div>
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
});

SkillsSection.displayName = "SkillsSection";

const InterestsSection = memo(() => {
  return (
    <Section
      title="What Drives Me"
      icon={Palette}
      iconColor="text-blue-600"
      initialDelay={2.2}
    >
      <motion.div
        className="grid md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {interests.map((interest, index) => {
            const IconComponent = interest.icon;
            return (
              <motion.div
                key={interest.title}
                className="text-center"
                variants={skillItemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${interest.gradient} rounded-full flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="font-semibold mb-2">{interest.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {interest.description}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
});

InterestsSection.displayName = "InterestsSection";

const DockNavigation = memo(() => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 mb-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 3.5,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <TooltipProvider>
        <Dock
          direction="middle"
          className="border-secondary bg-background/80 backdrop-blur-sm shadow-xl"
          iconSize={35}
          iconMagnification={60}
          iconDistance={100}
        >
          {/* Main Navigation */}
          {siteConfig.navbar.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 3.7 + index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <DockIcon>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full hover:bg-primary/10 transition-all duration-200"
                      )}
                    >
                      <item.icon className="size-6" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            </motion.div>
          ))}

          <Separator orientation="vertical" className="h-full mx-1" />

          {/* Social Media */}
          {Object.entries(siteConfig.contact.social).map(([name, social], index) => (
            <motion.div
              key={name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 4 + index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <DockIcon>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      aria-label={social.name}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full hover:bg-primary/10 transition-all duration-200"
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="size-6" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            </motion.div>
          ))}

          <Separator orientation="vertical" className="h-full mx-1" />

          {/* Theme Toggle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 4.5,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AnimatedThemeToggler className="size-12 rounded-full hover:bg-accent flex items-center justify-center transition-all duration-200" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Theme</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </motion.div>
        </Dock>
      </TooltipProvider>
    </motion.div>
  );
});

DockNavigation.displayName = "DockNavigation";

export default function ProfilePage() {
  const images = useMemo(
    () => slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <motion.div
        className="container mx-auto px-6 py-20 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div
            className="relative w-32 h-32 mx-auto mb-6"
            variants={profileImageVariants}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-white-600 p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                <Image
                  src="/Profil.jpeg"
                  alt="Profile picture"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
            </div>
            <motion.div
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              👋
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl font-bold mb-4"
            variants={textVariants}
            custom={0.5}
          >
            Hi, I'm Andre Junika Yusuf F.
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto"
            variants={textVariants}
            custom={0.7}
          >
            I build cool websites and designs like this.
          </motion.p>

          <motion.div
            className="flex justify-center gap-4"
            variants={textVariants}
            custom={0.9}
          >
            <Link
              href="/cv.pdf"
              className={buttonVariants({ variant: "outline" })}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Resume / CV
            </Link>
          </motion.div>
        </motion.div>

        {/* About Section */}
        <Section
          title="About Me"
          icon={Star}
          iconColor="text-yellow-500"
          initialDelay={1.2}
        >
          <p className="text-muted-foreground leading-relaxed">
            I am a student majoring in Information Technology at Muhammadiyah
            University Semarang, motivated by my passion for
            <span className="text-blue-600 font-medium">
              {" "}
              Web Development
            </span>{" "}
            and
            <span className="text-purple-600 font-medium">
              {" "}
              Android-based application development.
            </span>{" "}
            I enjoy helping others solve their problems in data
            recording/management, which is still done manually. I introduce
            them to increasingly advanced technologies that can greatly
            simplify manual data recording processes. I also have about three
            years of experience as a computer and laptop technician, which I
            continue to pursue to this day. I hope that my presence and
            knowledge can help many people through the innovations I create.
          </p>
        </Section>

        {/* Skills Section */}
        <SkillsSection />

        {/* Interests Section */}
        <InterestsSection />

        {/* Location Section */}
        <Section
          title="Location Me"
          icon={MapPin}
          iconColor="text-purple-600"
          initialDelay={2.8}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60">
              <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                Semarang, Indonesia
              </span>
              <Globe className="top-28" />
              <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            </div>
            <div className="relative flex flex-col size-full items-center justify-center overflow-hidden">
              <IconCloud images={images} />
            </div>
          </div>
        </Section>
      </motion.div>

      {/* Dock Navigation */}
      <DockNavigation />
    </div>
  );
}