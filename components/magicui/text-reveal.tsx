"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 h-[150vh] w-full", className)}
    >
      {/* Sticky area: 5 baris tinggi */}
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <span
          className={cn(
            "flex flex-wrap items-center justify-center gap-2 px-4 text-center text-2xl leading-relaxed text-black/20 dark:text-white/20 md:text-3xl lg:text-4xl",
            "max-w-6xl mx-auto"
          )}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 md:mx-1.5 lg:mx-2">
      {/* Bayangan teks samar (background) */}
      <span className="absolute inset-0 opacity-30">{children}</span>
      {/* Teks utama yang di-reveal */}
      <motion.span style={{ opacity }} className="text-black dark:text-white">
        {children}
      </motion.span>
    </span>
  );
};
