<template>
  <nav
    aria-label="Main"
    class="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200/70 dark:border-white/10
           bg-white/85 dark:bg-[#0a0e1a]/85 pb-safe backdrop-blur-xl
           shadow-[0_-10px_28px_-14px_rgba(0,0,0,0.35)] md:hidden"
  >
    <div class="mx-auto grid max-w-md grid-cols-5 px-1 pt-1.5">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="app-press flex flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[11px] font-medium"
        :class="active === tab.id ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'"
        :aria-current="active === tab.id ? 'true' : undefined"
        @click="go(tab.id)"
      >
        <span
          class="rounded-full px-4 py-1 transition-colors"
          :class="active === tab.id ? 'bg-blue-500/15' : ''"
        >
          <component :is="tab.icon" class="h-[22px] w-[22px]" :stroke-width="1.8" />
        </span>
        {{ tab.label }}
      </button>

      <button
        type="button"
        class="app-press flex flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[11px] font-medium"
        :class="moreOpen ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'"
        @click="moreOpen = true"
      >
        <span class="rounded-full px-4 py-1 transition-colors" :class="moreOpen ? 'bg-blue-500/15' : ''">
          <Ellipsis class="h-[22px] w-[22px]" :stroke-width="1.8" />
        </span>
        More
      </button>
    </div>
  </nav>

  <!-- "More" sheet: slides up from the bottom, closes on backdrop tap / Escape. -->
  <Teleport to="body">
    <Transition name="sheet">
      <div
        v-if="moreOpen"
        class="fixed inset-0 z-[60] flex items-end justify-center md:hidden"
        @click.self="moreOpen = false"
      >
        <div class="sheet-backdrop pointer-events-none absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="More"
          class="sheet-panel relative flex max-h-[85dvh] w-full max-w-lg flex-col rounded-t-3xl
                 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f1424] shadow-lg"
        >
          <div class="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-gray-300 dark:bg-white/15" />
          <div class="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <div class="grid grid-cols-2 gap-2.5">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="app-press flex items-center gap-2.5 rounded-2xl border border-gray-200 dark:border-white/10
                       bg-gray-50 dark:bg-white/5 px-3.5 py-3 text-sm"
              >
                <Download class="h-[18px] w-[18px] shrink-0 text-blue-500" :stroke-width="1.8" />
                Download CV
              </a>
              <button
                type="button"
                class="app-press flex items-center gap-2.5 rounded-2xl border border-gray-200 dark:border-white/10
                       bg-gray-50 dark:bg-white/5 px-3.5 py-3 text-sm"
                @click="toggleTheme"
              >
                <Sun v-if="colorMode === 'dark'" class="h-[18px] w-[18px] shrink-0 text-blue-500" :stroke-width="1.8" />
                <Moon v-else class="h-[18px] w-[18px] shrink-0 text-blue-500" :stroke-width="1.8" />
                {{ colorMode === 'dark' ? 'Light mode' : 'Dark mode' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { House, User, Briefcase, FolderKanban, Ellipsis, Download, Sun, Moon } from "lucide-vue-next";
import { useColorMode } from "@vueuse/core";
import { useSmoothScroll } from "~/composables/useSmoothScroll";

const { scrollToSection, scrollToTop } = useSmoothScroll();

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};

const tabs = [
  { id: "top", label: "Home", icon: House },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Work", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderKanban },
];

const active = ref("top");
const moreOpen = ref(false);

const go = (id: string) => {
  active.value = id;
  if (id === "top") scrollToTop();
  else scrollToSection("#" + id);
};

// Scrollspy: highlight the section currently in view.
let observer: IntersectionObserver | null = null;

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") moreOpen.value = false;
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) active.value = entry.target.id;
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  tabs.forEach((t) => {
    const el = document.getElementById(t.id);
    if (el) observer?.observe(el);
  });
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  observer?.disconnect();
  document.documentElement.classList.remove("lenis-stopped");
});

// Lock page scroll behind the open sheet.
watch(moreOpen, (open) => {
  document.documentElement.classList.toggle("lenis-stopped", open);
});
</script>

<style scoped>
.sheet-enter-active .sheet-backdrop,
.sheet-leave-active .sheet-backdrop {
  transition: opacity 0.2s ease-out;
}
.sheet-enter-active .sheet-panel,
.sheet-leave-active .sheet-panel {
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.sheet-enter-from .sheet-backdrop,
.sheet-leave-to .sheet-backdrop {
  opacity: 0;
}
.sheet-enter-from .sheet-panel,
.sheet-leave-to .sheet-panel {
  transform: translateY(100%);
}
</style>
