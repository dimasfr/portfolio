<template>
  <div class="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
    <NavBar />

    <!-- Hero Section -->
    <section
      class="w-full px-4 sm:px-8 md:px-16 py-16 text-center 
      bg-white text-gray-900 
      dark:bg-black dark:text-gray-100 transition-colors duration-300"
    >
      <h2 class="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
        Hi, I'm 
        <span class="text-blue-500 dark:text-blue-400">
          Dimas Fajar Ramadhan
        </span>
      </h2>

      <p class="text-base sm:text-lg mb-8 max-w-2xl mx-auto">
        I’m a web developer passionate about creating beautiful and functional websites. Here are some of my works.
      </p>

      <Button @click="scrollTo('#projects')">
        View My Work
      </Button>
    </section>

    <!-- About Section -->
    <section
      id="about"
      data-scroll-section
      class="w-full py-12 sm:py-16 px-4 sm:px-8 md:px-32 gray-section"
    >
      <AboutSection />
    </section>

    <!-- Experience Section -->
    <section
      id="experience"
      data-scroll-section
      class="w-full py-12 sm:py-16 px-4 sm:px-8 md:px-32 
      bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300"
    >
      <ExperienceTimeline />
    </section>

    <!-- Projects Section -->
    <section
      id="projects"
      data-scroll-section
      class="w-full py-12 sm:py-16 px-4 sm:px-8 md:px-16 gray-section"
    >
      <HandledProjects />
    </section>

    <!-- Scroll to Top Button -->
    <button
      v-show="showButton"
      class="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition"
      @click="scrollTop"
    >
      ↑ Top
    </button>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white text-center py-6 text-sm sm:text-base">
      <p>&copy; 2025 dimasfr. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const showButton = ref(false);

interface LocomotiveScroll {
  scrollTo: (element: Element | string, options?: object) => void;
}

const { $locomotive } = useNuxtApp() as unknown as { $locomotive: LocomotiveScroll };

const scrollTo = (target: string) => {
  const el = document.querySelector(target);
  if (el) $locomotive.scrollTo(el);
};

const scrollTop = () => {
  $locomotive.scrollTo("body", { duration: 1 });
};

const handleScroll = () => {
  showButton.value = window.scrollY > 300;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
