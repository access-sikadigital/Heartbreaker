"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, inView, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Motion components are created once at module scope.
 *
 * Calling `motion.create(tag)` during render returns a NEW component type on
 * every render, which unmounts and remounts the whole subtree — losing state
 * and restarting animations. Keep the set static.
 */
const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  figure: motion.figure,
  span: motion.span,
  p: motion.p,
} as const;

export type RevealTag = keyof typeof TAGS;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Which variant to animate with. Defaults to a fade-up. */
  variants?: Variants;
  /** Stagger direct children by this many seconds. 0 disables staggering. */
  stagger?: number;
  delay?: number;
  as?: RevealTag;
};

/**
 * Scroll-triggered entrance for a block of content.
 *
 * Reduced motion is handled globally — `globals.css` neutralises the transform
 * and opacity, and Motion reads the same preference — so nothing here branches.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  stagger: step = 0,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Tag = TAGS[as];

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={step > 0 ? stagger(step, delay) : variants}
      transition={delay && step === 0 ? { delay } : undefined}
    >
      {children}
    </Tag>
  );
}

/** A single item inside a staggering <Reveal stagger={...}>. */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: Omit<RevealProps, "stagger" | "delay">) {
  const Tag = TAGS[as];
  return (
    <Tag className={cn(className)} variants={variants}>
      {children}
    </Tag>
  );
}
