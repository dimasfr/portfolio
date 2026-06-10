<template>
  <header
    :class="[
      'sticky top-0 z-50 backdrop-blur-md transition-colors duration-300',
      isScrolled
        ? 'bg-white/80 dark:bg-[#0a0e1a]/80 border-b border-gray-200/60 dark:border-white/10 shadow-sm'
        : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <!-- Logo -->
      <Button variant="ghost" class="px-1" @click="scrollToTop">
        <div class="relative inline-block">
          <img src="/logo-black.png" alt="Logo" class="h-9 relative z-10 dark:hidden" >
          <img src="/logo-white.png" alt="Logo" class="h-9 relative z-10 hidden dark:block" >
        </div>
      </Button>

      <!-- Navigation -->
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem v-for="item in links" :key="item.id">
            <NavigationMenuLink as-child>
              <Button
                variant="ghost"
                :class="active === item.id ? 'text-blue-500 font-semibold' : ''"
                @click="scrollToSection('#' + item.id)"
              >
                {{ item.label }}
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <!-- Theme toggle -->
      <Button variant="outline" size="icon" class="relative" @click="toggleTheme">
        <Icon
          icon="radix-icons:moon"
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Icon
          icon="radix-icons:sun"
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";
import { useSmoothScroll } from "~/composables/useSmoothScroll";

const { scrollToSection, scrollToTop } = useSmoothScroll();

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const isScrolled = ref(false);
const active = ref("");

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Scrollspy: highlight the section currently in view.
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) active.value = entry.target.id;
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  links.forEach((l) => {
    const el = document.getElementById(l.id);
    if (el) observer?.observe(el);
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  observer?.disconnect();
});
</script>