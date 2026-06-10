<template>
  <Transition name="top-fade">
    <button
      v-show="showButton"
      class="fixed bottom-6 right-6 z-40 grid place-items-center h-12 w-12 rounded-full
             bg-blue-500 text-white shadow-lg shadow-blue-500/40
             hover:bg-blue-600 hover:-translate-y-0.5 active:translate-y-0 transition"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      <ArrowUp class="w-5 h-5" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ArrowUp } from "lucide-vue-next";
import { useSmoothScroll } from "~/composables/useSmoothScroll";

const { scrollToTop } = useSmoothScroll();
const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 400;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.top-fade-enter-active,
.top-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.top-fade-enter-from,
.top-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>