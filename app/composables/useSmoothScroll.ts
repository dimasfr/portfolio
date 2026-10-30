// composables/useSmoothScroll.ts
// Single source of truth for programmatic scrolling.
// Use everywhere instead of reaching into $locomotive / window.scrollTo.

import type Lenis from "lenis";

export function useSmoothScroll() {
  const { $lenis } = useNuxtApp() as unknown as { $lenis: Lenis };

  // Sticky navbar height — sections land just below it.
  // The header is shorter on phones (no link row), so land closer to the top there.
  const navOffset = () => (window.matchMedia("(max-width: 767px)").matches ? -64 : -84);

  const scrollToSection = (target: string) => {
    if (!$lenis) {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    $lenis.scrollTo(target, { offset: navOffset(), duration: 1.4 });
  };

  const scrollToTop = () => {
    if (!$lenis) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    $lenis.scrollTo(0, { duration: 1.2 });
  };

  return { scrollToSection, scrollToTop };
}