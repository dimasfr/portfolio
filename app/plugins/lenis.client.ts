// plugins/lenis.client.ts
// Smooth scrolling with Lenis, synced to GSAP's ticker + ScrollTrigger.
// Replaces the old locomotive.client.ts plugin.

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Respect users who prefer reduced motion: keep native scroll, skip smoothing.
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lenis = new Lenis({
    duration: prefersReduced ? 0 : 1.15,
    // easeOutExpo-ish curve for a premium, weighty feel
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !prefersReduced,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  });

  // Keep ScrollTrigger in sync with Lenis position.
  lenis.on("scroll", ScrollTrigger.update);

  // Drive Lenis from GSAP's RAF ticker so animations and scroll share one clock.
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Refresh triggers once the DOM has painted.
  ScrollTrigger.refresh();

  return {
    provide: {
      lenis,
      gsap,
      ScrollTrigger,
    },
  };
});