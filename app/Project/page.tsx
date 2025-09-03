"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

import {
  ExternalLink,
  Github,
  Play,
  Code,
  Calendar,
  Tag,
  Star,
} from "lucide-react";

import { motion } from "framer-motion";

// Data project
const projects = [
  {
    id: 1,
    title: "Website RT 14",
    description: "Recap of documentation and real-time announcements.",
    image: "/web1.png",
    technologies: ["HTML", "CSS", "JavaScript", "Supabase"],
    liveDemo: "https://rt14perumkorpri.vercel.app/",
    githubUrl: null,
    featured: true,
    createdAt: "2025-06-16",
    category: "WEB",
  },
  {
    id: 2,
    title: "Website Posyandu RT 14",
    description: "posyandu data recap and real-time announcements website.",
    image: "/web2.png",
    technologies: ["HTML", "CSS", "JavaScript", "Supabase"],
    liveDemo: "https://posyanduperumkorpri.vercel.app/",
    githubUrl: null,
    featured: true,
    createdAt: "2025-04-16",
    category: "WEB",
  },
  {
    id: 3,
    title: "Website Innovation Computer",
    description: "Landing Page Innovation Computer.",
    image: "/web3.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vite"],
    liveDemo: "https://incomp.vercel.app/",
    githubUrl: "https://github.com/Andrejun1/Incomp",
    featured: true,
    createdAt: "2025-08-16",
    category: "WEB",
  },
  {
    id: 4,
    title: "Matkul",
    description:
      "Mobile application for task management with offline sync feature",
    image: "/aplikasi1.png",
    technologies: ["Flutter", "Dart"],
    liveDemo: "https://lynk.id/andrejun/vz7p61947y44",
    githubUrl: null,
    featured: true,
    createdAt: "2025-04-20",
    category: "Application",
  },
  {
    id: 5,
    title: "Website Zodiak",
    description: "Find out your personality here (don't take it too seriously)",
    image: "/web4.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveDemo: "https://andrejun1.github.io/Zodiak/",
    githubUrl: "https://github.com/Andrejun1/Zodiak",
    featured: false,
    createdAt: "2024-10-12",
    category: "WEB",
  },
  {
    id: 6,
    title: "SisSaving",
    description: "A mobile app for managing your finances.",
    image: "/aplikasi2.png",
    technologies: ["Flutter", "Dart"],
    liveDemo: "https://lynk.id/andrejun/dxpd261pg275",
    githubUrl: null,
    featured: false,
    createdAt: "2025-04-05",
    category: "Application",
  },
];

const filterOptions = ["All", "WEB", "GitHub", "Application"];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const headerVariants = {
  hidden: { y: -50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
};

const filterVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 12, delay: 0.3 },
  },
};

const projectCardVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.9, rotateX: 15 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const imageVariants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const contentVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.5 },
  },
};

export default function ProjectPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "GitHub") {
      return project.category === "WEB" && project.githubUrl;
    }
    return project.category === selectedFilter;
  });

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <motion.div
      className="flex flex-col items-center justify-start min-h-screen px-6 py-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div className="text-center mb-12 max-w-4xl" variants={headerVariants}>
        <motion.div
          className="text-5xl font-bold mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring" as const,
            stiffness: 100,
            damping: 15,
            delay: 0.2,
          }}
        >
          <SparklesText>MY PROJECTS</SparklesText>
        </motion.div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div className="flex flex-wrap gap-2 mb-8" variants={filterVariants}>
        {filterOptions.map((filter, index) => (
          <motion.div
            key={filter}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.5 + index * 0.1,
              type: "spring" as const,
              stiffness: 150,
              damping: 12,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className="rounded-full"
            >
              {filter}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl w-full mb-20"
        variants={containerVariants}
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={`${selectedFilter}-${project.id}`}
            variants={projectCardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9 + index * 0.1 }}
            className="group hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {/* Project Image */}
            <motion.div
              className="relative overflow-hidden rounded-lg border border-border/20 backdrop-blur-sm"
              variants={imageVariants}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {project.featured && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 1.2 + index * 0.1,
                    type: "spring" as const,
                    stiffness: 150,
                    damping: 12,
                  }}
                >
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </motion.div>
              )}
              <motion.div
                initial={{ scale: 0, x: 20 }}
                animate={{ scale: 1, x: 0 }}
                transition={{
                  delay: 1.3 + index * 0.1,
                  type: "spring" as const,
                  stiffness: 150,
                  damping: 12,
                }}
              >
                <Badge
                  variant={project.category === "WEB" ? "default" : "secondary"}
                  className="absolute top-3 right-3"
                >
                  {project.category}
                </Badge>
              </motion.div>
            </motion.div>

            {/* Project Content */}
            <motion.div
              className="p-6 space-y-4 rounded-b-lg border-x border-b border-border/20 backdrop-blur-sm"
              variants={contentVariants}
            >
              <motion.div
                className="flex items-start justify-between"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(project.createdAt)}
                </div>
              </motion.div>

              <motion.p
                className="text-sm leading-relaxed text-muted-foreground"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
              >
                {project.description}
              </motion.p>

              {/* Technologies */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 + index * 0.1 }}
              >
                {project.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 1.7 + index * 0.1 + techIndex * 0.05,
                      type: "spring" as const,
                      stiffness: 150,
                      damping: 12,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8 + index * 0.1 }}
              >
                {project.category === "WEB" ? (
                  <div className="flex gap-2 pt-2">
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button asChild size="sm" className="w-full">
                        <Link
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Live Demo
                        </Link>
                      </Button>
                    </motion.div>
                    {project.githubUrl && (
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Source Code
                          </Link>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2 pt-2">
                    <motion.div
                      className="w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button asChild size="sm" className="w-full">
                        <Link
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Download App
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* ✅ Fixed Animated Dock Navigation with Bounce */}
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
    </motion.div>
  );
}
