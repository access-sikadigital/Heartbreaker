"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { colors } from "@/lib/tokens";

type InkCursorProps = {
  /**
   * Fallback colour, used wherever nothing under the pointer declares a
   * `data-ink-color`. Sections set their own, so this only covers bare page.
   */
  color?: string;
  /** Widest the stroke gets, in CSS pixels, when the pointer is barely moving. */
  maxWidth?: number;
  /** Narrowest the stroke gets when the pointer is flying. */
  minWidth?: number;
  /** Trail length in recorded points. At MIN_STEP apart, 200 is roughly 800px. */
  length?: number;
  /** Pointer speed (px/ms) at which the stroke reaches `minWidth`. */
  speedForMin?: number;
};

type Point = { x: number; y: number; w: number; c: string };

/** Gap between recorded points, in CSS pixels. */
const MIN_STEP = 4;
/** Above this gap a move is resampled, so fast flicks still curve. */
const MAX_STEP = 10;
/** Points retired per frame once the pointer stops. */
const DRAIN_RATE = 2;
/** Smoothing passes over the centreline. Two is enough to kill pointer jitter. */
const SMOOTH_PASSES = 2;

/**
 * An ink stroke that follows the pointer and drains away behind it.
 *
 * Four decisions do all the work, and each fixes a specific artefact:
 *
 * 1. Points are recorded by DISTANCE, not by pointer event. Pointer events fire
 *    at up to 120 Hz, so moving slowly would otherwise pile dozens of points
 *    inside a couple of pixels. A minimum gap — and resampling when the gap is
 *    too large — gives an evenly spaced path at any speed.
 *
 * 2. The stroke is drawn as FILLED RIBBONS, not stroked segments. Per-segment
 *    stroking has to change `lineWidth` between segments, which shows as steps.
 *    Offsetting the centreline by a per-point half-width and filling the
 *    resulting polygon gives a genuinely continuous taper.
 *
 * 3. The taper is WIDTH ONLY, at full opacity. Opaque geometry composites
 *    identically wherever it overlaps, so there is no density variation left to
 *    shimmer — and it reads as ink rather than smoke.
 *
 * 4. Colour is carried PER POINT, not per stroke. Crossing from an off-white
 *    section onto a maroon one recolours the ink from that moment forward,
 *    leaving the part already drawn as it was. Recolouring the whole trail at
 *    once would make the half still sitting on white invisible.
 *
 * Any element can set `data-ink-color`; `<Section>` does it automatically from
 * its ground. Runs on the GSAP ticker, so it shares one requestAnimationFrame
 * loop with Lenis and ScrollTrigger. Sits out on coarse pointers and under
 * prefers-reduced-motion.
 */
export function InkCursor({
  color = colors.maroon,
  maxWidth = 22,
  minWidth = 1.2,
  length = 200,
  speedForMin = 2.4,
}: InkCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let trail: Point[] = [];
    let last: { x: number; y: number; t: number } | null = null;
    let width = maxWidth;
    let ink = color;
    let movedSinceFrame = false;
    let drainDebt = 0;
    let restart = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /**
     * Which colour should the ink be at this position?
     *
     * The canvas is `pointer-events: none`, so the hit test returns whatever is
     * beneath it. Resolved once per frame rather than per pointer event — the
     * one-frame lag is invisible, and it keeps a 120 Hz event stream off the
     * hit-testing path.
     */
    const resolveInk = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y);
      const owner = el?.closest<HTMLElement>("[data-ink-color]");
      return owner?.dataset.inkColor || color;
    };

    const push = (x: number, y: number) => {
      trail.push({ x, y, w: width, c: ink });
      if (trail.length > length) trail.splice(0, trail.length - length);
    };

    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      const x = event.clientX;
      const y = event.clientY;

      if (restart) {
        trail = [];
        last = null;
        restart = false;
      }

      if (!last) {
        last = { x, y, t: now };
        ink = resolveInk(x, y);
        push(x, y);
        movedSinceFrame = true;
        return;
      }

      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);

      // Too small to be worth a point. Bailing here is what stops slow movement
      // from clumping dozens of samples into the same few pixels.
      if (dist < MIN_STEP) return;

      const dt = Math.max(now - last.t, 1);
      const speed = dist / dt; // px per ms

      const target =
        maxWidth - (maxWidth - minWidth) * Math.min(speed / speedForMin, 1);
      width += (target - width) * 0.18;

      // Walk long jumps in even steps, so a fast flick curves like a slow drag
      // instead of becoming a straight chord.
      const steps = Math.min(Math.ceil(dist / MAX_STEP), 16);
      for (let i = 1; i <= steps; i++) {
        const f = i / steps;
        push(last.x + dx * f, last.y + dy * f);
      }

      last = { x, y, t: now };
      movedSinceFrame = true;
    };

    // Lift the pen when the pointer leaves, so re-entering starts a new stroke
    // rather than drawing a chord across the page.
    const onLeave = () => {
      restart = true;
    };

    /** Moving average over the centreline. Colour is picked, never averaged. */
    const smooth = (pts: Point[]) => {
      let out = pts;
      for (let pass = 0; pass < SMOOTH_PASSES; pass++) {
        const next: Point[] = new Array(out.length);
        for (let i = 0; i < out.length; i++) {
          const a = out[Math.max(i - 1, 0)]!;
          const b = out[i]!;
          const c = out[Math.min(i + 1, out.length - 1)]!;
          next[i] = {
            x: (a.x + b.x * 2 + c.x) / 4,
            y: (a.y + b.y * 2 + c.y) / 4,
            w: (a.w + b.w * 2 + c.w) / 4,
            c: b.c,
          };
        }
        out = next;
      }
      return out;
    };

    const render = () => {
      // Re-resolve the ink under the pointer once per frame. Scrolling moves
      // sections under a stationary cursor, so this cannot live in onMove.
      if (last) ink = resolveInk(last.x, last.y);

      if (!movedSinceFrame && trail.length) {
        drainDebt += DRAIN_RATE;
        const drop = Math.floor(drainDebt);
        if (drop > 0) {
          trail.splice(0, drop);
          drainDebt -= drop;
        }
      } else {
        drainDebt = 0;
      }
      movedSinceFrame = false;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (trail.length < 4) return;

      const pts = smooth(trail);
      const n = pts.length;

      // Half-width per point. `t` runs 0 at the tail to 1 at the head, and the
      // 0.7 exponent holds the stroke near full width for most of its length
      // before thinning quickly into the tail — which is what makes it read as
      // a brush rather than a wedge.
      const half: number[] = new Array(n);
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1);
        half[i] = Math.max((pts[i]!.w * Math.pow(t, 0.7)) / 2, 0.25);
      }

      // Offset the centreline along its normals to get both edges.
      const left: { x: number; y: number }[] = new Array(n);
      const right: { x: number; y: number }[] = new Array(n);
      for (let i = 0; i < n; i++) {
        const p = pts[i]!;
        const a = pts[Math.max(i - 1, 0)]!;
        const b = pts[Math.min(i + 1, n - 1)]!;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const h = half[i]!;
        left[i] = { x: p.x + nx * h, y: p.y + ny * h };
        right[i] = { x: p.x - nx * h, y: p.y - ny * h };
      }

      /**
       * Fill one run of same-coloured points as a single closed ribbon: up one
       * edge, round the head if this is the leading run, back down the other.
       */
      const fillRun = (a: number, b: number, fill: string, isHead: boolean) => {
        if (b - a < 1) return;

        ctx.beginPath();
        ctx.moveTo(left[a]!.x, left[a]!.y);

        for (let i = a + 1; i < b; i++) {
          const c = left[i]!;
          const nxt = left[i + 1]!;
          ctx.quadraticCurveTo(c.x, c.y, (c.x + nxt.x) / 2, (c.y + nxt.y) / 2);
        }
        ctx.lineTo(left[b]!.x, left[b]!.y);

        if (isHead) {
          // Round the leading end off, so it is a nib and not a flat cut.
          const head = pts[b]!;
          const behind = pts[b - 1]!;
          const hdx = head.x - behind.x;
          const hdy = head.y - behind.y;
          const hlen = Math.hypot(hdx, hdy) || 1;
          const hh = half[b]!;
          ctx.quadraticCurveTo(
            head.x + (hdx / hlen) * hh * 1.4,
            head.y + (hdy / hlen) * hh * 1.4,
            right[b]!.x,
            right[b]!.y,
          );
        } else {
          ctx.lineTo(right[b]!.x, right[b]!.y);
        }

        for (let i = b - 1; i > a; i--) {
          const c = right[i]!;
          const nxt = right[i - 1]!;
          ctx.quadraticCurveTo(c.x, c.y, (c.x + nxt.x) / 2, (c.y + nxt.y) / 2);
        }
        ctx.lineTo(right[a]!.x, right[a]!.y);

        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
      };

      // Split into runs of one colour. Runs share their boundary point, and are
      // drawn tail first, so the newer colour paints cleanly over the join.
      let runStart = 0;
      for (let i = 1; i < n; i++) {
        if (pts[i]!.c !== pts[runStart]!.c) {
          fillRun(runStart, i, pts[runStart]!.c, false);
          runStart = i;
        }
      }
      fillRun(runStart, n - 1, pts[runStart]!.c, true);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    gsap.ticker.add(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      gsap.ticker.remove(render);
    };
  }, [color, maxWidth, minWidth, length, speedForMin]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
