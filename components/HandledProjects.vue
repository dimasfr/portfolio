<template>
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-3xl font-bold text-center mb-8">Projects</h2>

    <!-- FILTER BUTTON -->
    <div class="flex flex-wrap gap-2 justify-center mb-6">
      <button
        v-for="tag in tags"
        :key="tag"
        @click="selectedTag = tag"
        :class="[
          'px-4 py-1.5 rounded-full text-sm transition',
          selectedTag === tag
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        ]"
      >
        {{ tag }}
      </button>
    </div>

    <!-- FOLDER WINDOW -->
    <div class="bg-white rounded-xl shadow border p-4">
      
      <!-- Scrollable area -->
      <div 
        ref="scrollContainer" 
        class="max-h-[60vh] overflow-y-auto pr-2 overscroll-contain scroll-smooth"
        @wheel="handleWheel"
      >
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

          <div
            v-for="(project, index) in filteredProjects"
            :key="index"
            @click="openModal(index)"
            class="group cursor-pointer"
          >
            <!-- Folder style card -->
            <div class="flex flex-col items-center text-center p-3 rounded-lg hover:bg-gray-100 transition">
              
              <img
                :src="project.image"
                class="w-full h-24 object-cover rounded-md mb-2"
              />

              <p class="text-sm font-medium text-gray-800 truncate w-full">
                {{ project.title }}
              </p>

              <p class="text-xs text-gray-500">
                {{ project.language }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- MODAL (tetap sama) -->
    <div
      v-if="selectedIndex !== null"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-3xl w-[90%] p-6 relative">

        <div class="w-full h-[320px] sm:h-[400px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
  
          <!-- Background blur (illusion frame) -->
          <img
            :src="filteredProjects[selectedIndex].image"
            class="absolute w-full h-full object-cover blur-xl scale-110 opacity-40 pointer-events-none"
          />

          <!-- Main image -->
          <img
            :src="filteredProjects[selectedIndex].image"
            class="relative max-h-full max-w-full object-contain rounded-md shadow"
          />
          
        </div>

        <div class="flex items-center gap-2 mt-4">
          <h4 class="text-2xl font-bold text-gray-900">
            {{ filteredProjects[selectedIndex].title }}
          </h4>

          <!-- Link Icon -->
          <a
            v-if="filteredProjects[selectedIndex].link"
            :href="filteredProjects[selectedIndex].link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-blue-500 transition"
            @click.stop
          >
            <ExternalLink class="w-5 h-5" />
          </a>
        </div>

        <p class="text-gray-600 mt-2">
          {{ filteredProjects[selectedIndex].description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { projects } from "~/data/projects"
import { ExternalLink } from "lucide-vue-next"

const selectedTag = ref("All")
const selectedIndex = ref(null)
const scrollContainer = ref(null)

const tags = [
  "All",
  ...new Set(
    projects
      .flatMap(p => p.tags || [])
      .map(tag => tag?.trim())
      .filter(Boolean)
  )
]

// filter logic
const filteredProjects = computed(() => {
  if (selectedTag.value === "All") return projects

  return projects.filter(p =>
    p.tags?.includes(selectedTag.value)
  )
})

const openModal = (index) => {
  selectedIndex.value = index
}

const closeModal = () => {
  selectedIndex.value = null
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