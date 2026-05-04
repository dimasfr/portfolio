<template>
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-3xl font-bold text-center mb-6">My Journey</h2>

    <!-- Scrollable wrapper -->
    <div 
      ref="scrollContainer" 
      class="max-h-[60vh] overflow-y-auto pr-2 overscroll-contain scroll-smooth" 
      @wheel="handleWheel"
    >
      <div class="relative border-l border-gray-300">

        <div 
          v-for="(exp, index) in experiences" 
          :key="index" 
          :class="['mb-12 ml-8 relative group', exp.image ? 'cursor-pointer' : 'cursor-default']"
          @click="exp.image ? openModal(exp.image) : null"
        >
          <!-- Icon -->
          <div class="absolute w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full -left-5 shadow">
            <img :src="exp.icon" alt="icon" class="w-6 h-6 object-contain">
          </div>

          <!-- Content -->
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <!-- Image indicator -->
            <div 
              v-if="exp.image"
              class="absolute top-3 right-3 bg-gray-100 group-hover:bg-blue-100 p-1.5 rounded-full text-gray-500 group-hover:text-blue-600 transition"
            >
              <Camera class="w-5 h-5" />
            </div>
            <h3 class="text-xl font-bold text-gray-900">{{ exp.title }}</h3>
            <h4 class="text-gray-600 text-sm mb-2">{{ exp.subtitle }}</h4>
            <p class="text-gray-700 leading-relaxed">{{ exp.description }}</p>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal tetap sama -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div class="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl w-[90%] p-6">
        
        <button
          class="absolute -top-3 -right-3 bg-gray-500 rounded-xl text-white p-2 shadow-md hover:bg-red-600 transition"
          @click="closeModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-x-icon lucide-square-x"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        </button>

        <div class="border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800">
          <img
            :src="selectedImage"
            alt="Bukti pengalaman"
            class="w-full max-h-[80vh] object-contain rounded-md"
          >
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue"
import { experiences } from "~/data/experience"
import { Camera } from "lucide-vue-next"

const showModal = ref(false)
const selectedImage = ref("")
const scrollContainer = ref(null)

const openModal = (image) => {
  selectedImage.value = image
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedImage.value = ""
}

const handleWheel = (e) => {
  const el = scrollContainer.value

  if (!el) return

  const atTop = el.scrollTop === 0
  const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight

  // kalau masih bisa scroll di dalam, tahan event
  if (
    (e.deltaY < 0 && !atTop) ||
    (e.deltaY > 0 && !atBottom)
  ) {
    e.stopPropagation()
  }
}

</script>
