<template>
  <div class="bg-gray-50 text-gray-900 dark:bg-[#0a0e1a] dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
    <NavBar />

    <main>
      <!-- Hero -->
      <section id="top" class="w-full">
        <HeroSection />
      </section>

      <!-- About -->
      <section
        id="about"
        class="reveal-section w-full py-16 sm:py-24 px-4 sm:px-8 md:px-32 bg-gray-100 dark:bg-[#0f1424] transition-colors duration-300"
      >
        <AboutSection />
      </section>

      <!-- Experience -->
      <section
        id="experience"
        class="reveal-section w-full py-16 sm:py-24 px-4 sm:px-8 md:px-16 bg-white dark:bg-[#0a0e1a] transition-colors duration-300"
      >
        <ExperienceTimeline />
      </section>

      <!-- Projects -->
      <section
        id="projects"
        class="reveal-section w-full py-16 sm:py-24 px-4 sm:px-8 md:px-16 bg-gray-100 dark:bg-[#0f1424] transition-colors duration-300"
      >
        <HandledProjects />
      </section>
    </main>

    <TopPage />

    <footer class="bg-gray-900 text-white text-center py-6 text-sm sm:text-base">
      <p>&copy; {{ yearText }} dimasfr. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const yearText = new Date().getFullYear();

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  // Gentle reveal for each content section as it enters the viewport.
  gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
    gsap.from(section, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 85%" },
    });
  });

  // Make sure positions are correct after fonts/images settle.
  ScrollTrigger.refresh();
});
</script>

<style>
/* ---- Lenis recommended base styles ---- */
html.lenis,
html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
.lenis.lenis-smooth iframe {
  pointer-events: none;
}

/* ---- Display font (loaded via app.head in nuxt.config or here) ---- */
.font-display {
  font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
}
:root {
  --font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
}
</style>