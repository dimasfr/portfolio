<template>
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-3xl font-bold text-center mb-12">My Journey</h2>
    <div class="relative border-l border-gray-300">

      <div 
        v-for="(exp, index) in experiences" 
        :key="index" 
        :class="['mb-12 ml-8 relative group', exp.image ? 'cursor-pointer' : 'cursor-default']"
        @click="exp.image ? openModal(exp.image) : null">
        <!-- Icon -->
        <div class="absolute w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full -left-5 shadow">
          <img :src="exp.icon" alt="icon" class="w-6 h-6 object-contain">
        </div>

        <!-- Content -->
        <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-xl font-bold text-gray-900">{{ exp.title }}</h3>
          <h4 class="text-gray-600 text-sm mb-2">{{ exp.subtitle }}</h4>
          <p class="text-gray-700 leading-relaxed">{{ exp.description }}</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div
        class="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl w-[90%] p-6"
      >
        <!-- Close Button -->
        <button
          class="absolute -top-3 -right-3 bg-red-500 rounded-xl text-white p-2 shadow-md hover:bg-red-600 transition"
          @click="closeModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-x-icon lucide-square-x"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        </button>

        <!-- Image inside frame -->
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

const showModal = ref(false)
const selectedImage = ref("")

const openModal = (image) => {
  selectedImage.value = image
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedImage.value = ""
}

const experiences = [
  {
    title: "Move to Big City",
    subtitle: "BPJS Ketenagakerjaan (Via PT. Adi Data Informatika) • South Jakarta • Nov 2023",
    icon: "/icon/insurance.png",
    description: "Relocating to the capital opened a new chapter in my career, where I joined a major company to develop and maintain the Eprocurement and Vendor Management Systems.",
    image: "/experience/exp-5.jpeg"
  },
  {
    title: "Promoted as Lead Engineer",
    subtitle: "PT. Sekawan Media Informatika • Malang • Sept 2022",
    icon: "/icon/leadership.png",
    description: "Leading a team of developers to maintain and develop new features of Manufacture Production and Quality Control System.",
    image: "/experience/exp-4.jpg"
  },
  {
    title: "From Dream to Doorstep",
    subtitle: "Co-Founder & Fullstack Developer • Bramara • Malang • Jun 2022",
    icon: "/icon/apitherapy.png",
    description: "Together with my team, we create diverse projects, including Unity-based games, Academic Information Systems, and Human Resource Information Management Systems (HRIS).",
    image: "/experience/exp-3.jpg"
  },
  {
    title: "Redefining Myself in a New Journey",
    subtitle: "Fullstack Developer • PT. Sekawan Media Informatika • Malang • Jan 2022",
    icon: "/icon/clover.png",
    description: "Joined Sekawan Media Informatika, where I took on the challenge of building and nurturing digital systems — from Clinic Management and Statistical Process Control to Fishing Vessel Recording, Manufacturing Production, and Quality Control.",
    image: "/experience/exp-2.jpg"
  },
  {
    title: "Graduated right before New Normal Era Started",
    subtitle: "Graduate • Institute Of Technology • Malang • Feb 2020",
    icon: "/icon/education.png",
    description: "Graduated with a Bachelor's degree in Informatic Engineering, specializing in software development and data management.",
    image: ""
  },
  {
    title: "From Campus to Career",
    subtitle: "Fullstack Developer • PT. Maestro Manajemen Nusantara • Malang • Oct 2019",
    icon: "/icon/back-to-school.png",
    description: "Scouted by Maestro, I began my journey as a newcomer, contributing to diverse projects such as the Hospital Management System and the Academic Information System.",
    image: "/experience/exp-1.jpg"
  },
  {
    title: "Start my college journey",
    subtitle: "Student • Institute Of Technology • Malang • Sept 2016",
    icon: "/icon/school-bag.png",
    description: "Actively involved in various student organizations and projects, enhancing my skills in software development and teamwork.",
    image: ""
  }
]
</script>
