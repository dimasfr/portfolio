<template>
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-3xl font-bold text-center mb-12">Projects</h2>

    <!-- Swiper -->
    <div class="relative">
      <Swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="30"
        navigation
        :pagination="{ el: '.custom-pagination', clickable: true }"
        :breakpoints="{
          0: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 }
        }"
      >
        <SwiperSlide
          v-for="(project, index) in projects"
          :key="index"
          @click="openModal(index)"
        >
          <div
            class="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h4 class="text-lg font-bold text-gray-900">{{ project.title }}</h4>
              <p class="text-gray-600">{{ project.language }}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div class="custom-pagination mt-4 flex justify-center" />
    </div>

    <!-- Modal -->
    <div
      v-if="selectedIndex !== null"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative max-w-3xl w-[90%] p-6"
      >
        <!-- Close Button -->
       <button
          class="absolute -top-3 -right-3 bg-gray-500 rounded-xl text-white p-2 shadow-md hover:bg-red-600 transition"
          @click="closeModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-x-icon lucide-square-x"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        </button>

        <!-- Image -->
        <img
          :src="projects[selectedIndex].image"
          :alt="projects[selectedIndex].title"
          class="w-full h-64 sm:h-80 object-cover rounded-md"
        />

        <!-- Title & Desc -->
        <h4 class="text-2xl font-bold mt-4 text-gray-900">
          {{ projects[selectedIndex].title }}
        </h4>
        <p class="text-gray-600 mt-2">{{ projects[selectedIndex].description }}</p>
        <p class="mt-2 text-sm text-blue-600 italic">
          Language: {{ projects[selectedIndex].language || 'Coming soon' }}
        </p>

        <!-- Navigation inside modal -->
        <div class="flex justify-between mt-6">
          <button
            @click="prevProject"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md disabled:opacity-50"
            :disabled="selectedIndex === 0"
          >
            ← Prev
          </button>

          <button
            @click="nextProject"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            :disabled="selectedIndex === projects.length - 1"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const modules = [Navigation, Pagination]

// state
const selectedIndex = ref(null)

// open modal by index
const openModal = (index) => {
  selectedIndex.value = index
}

const closeModal = () => {
  selectedIndex.value = null
}

// modal navigation
const nextProject = () => {
  if (selectedIndex.value < projects.length - 1) {
    selectedIndex.value++
  }
}

const prevProject = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const projects = [
  { 
    title: 'E-Procurement', 
    description: 'The E-Procurement platform is a digital system used by BPJSTK to manage the procurement of goods and services online. It connects Vendors with BPJSTK in tender activities, ensuring the process is more transparent, efficient, and well-documented.', 
    image: '/portfolio/eprocurement.png',
    language: "Vue, Express"
  },
  { 
    title: 'Smile', 
    description: 'Smile is an integrated application owned by BPJSTK, consisting of various internal modules to support organizational operations. Among these modules, I focus primarily on the E-Procurement and Vendor Management System (VMS).', 
    image: '/portfolio/smile.png',
    language: "jQuery, CSS, PHP"
  },
  { 
    title: 'INOAC', 
    description: 'INOAC is a manufacturing application that focuses on managing production processes for foam (busa) products. The system is designed to support the end-to-end manufacturing workflow, including order management, production tracking, inventory handling, and quality control.', 
    image: '/portfolio/inoac.png',
    language: "React, TailwindCSS"
  },
  { 
    title: 'DevConnector', 
    description: 'DevConnector is a social media–like platform built as part of a comprehensive Udemy course project. The application allows developers to create profiles, share posts, connect with other developers, and engage in discussions, mimicking the core functionality of a professional networking site.', 
    image: '/portfolio/devconnector.png',
    language: "React, SCSS, Node, Expess, MongoDb"
  },
  { 
    title: 'HRIS', 
    description: 'HRIS (Human Resource Information System) is a web-based application designed to manage and streamline various HR functions within an organization.', 
    image: '/portfolio/hris.png',
    language: "Vite, Vue, SCSS, Node, Express, MySQL"
  },
  { 
    title: 'Schoolease', 
    description: 'Schoolease is an academic management website designed to support schools and educational institutions. Beyond its core focus on information management, the platform also provides essential features such as attendance tracking and online examinations.', 
    image: '/portfolio/schoolease.png',
    language: "Vite, Vue, SCSS, Node, Express, MySQL"
  },
  { 
    title: 'Datastore', 
    description: 'School Datastore is a platform focused on centralized document storage for schools. It allows educational institutions to securely manage, organize, and access important documents in one place, ensuring efficiency, and easy retrieval.', 
    image: '/portfolio/datastore.png',
    language: "Vue, Typescript, SCSS, Node, Express, MySQL"
  },
  { 
    title: 'Medeva', 
    description: 'Medeva is a clinic management application designed to streamline healthcare operations. The system includes features for doctor data management, duty scheduling, outpatient services, and pharmacy integration.', 
    image: '/portfolio/medeva.png',
    language: "jQuery, Bootstrap, CodeIgniter, MySQL"
  },
  { 
    title: 'SPC', 
    description: 'SPC or Statistical Process Control is a manufacturing application module developed to monitor and control production quality using statistical methods. The system tracks process data in real time, analyzes variations, and generates insights to ensure products consistently meet quality standards.', 
    image: '/portfolio/spc.png',
    language: "jQuery, Bootstrap, CodeIgniter, MySQL"
  },
  { 
    title: 'Manufacture Quality', 
    description: 'Manufacture Quality is an application module designed to ensure that production outputs consistently meet defined standards. It focuses on quality control, inspection, and reporting across different stages of the manufacturing process.', 
    image: '/portfolio/man-qlt.png',
    language: "CSS, jQuery, CodeIgniter, MySQL"
  },
  { 
    title: 'Manufacture Production', 
    description: 'Manufacture Production is an application module that manages and monitors the end-to-end production process in a manufacturing environment. It covers areas such as production planning, scheduling, BOM, tracking, and reporting, ensuring that resources are utilized efficiently and output targets are achieved.', 
    image: '/portfolio/man-prd.png',
    language: "CSS, jQuery, CodeIgniter, MySQL"
  },
  { 
    title: 'Fishing Vessel Recording System', 
    description: 'The Fishing Vessel Recording System is an application designed to digitally record and manage fishing vessel activities. It supports features such as vessel registration, trip logging, catch reporting, and compliance tracking with maritime regulations.', 
    image: '/portfolio/pondokdadap.png',
    language: "CSS, jQuery, CodeIgniter, MySQL"
  },
  { 
    title: 'Edsen', 
    description: 'This project focuses on developing a Vendor Evaluation System for the Ministry of Public Works and Housing (PUPR). The application is designed to assess vendor performance based on multiple criteria such as project delivery, quality of work, compliance, and service reliability.', 
    image: '/portfolio/edsen.png',
    language: "Vue, Bootstrap, PHP, MySQL"
  },
  { 
    title: 'SIDukcapil', 
    description: 'Sidukcapil is an application developed for the Department of Population and Civil Registration (Dispenduk) to manage population and civil registry data. The system covers key services such as resident data management, civil documents (birth, marriage, death certificates), and identity records.', 
    image: '/portfolio/sidukcapil.png',
    language: "CSS, jQuery, CodeIgniter, MySQL"
  },
  { 
    title: 'MasterWeb', 
    description: 'The Academic Information System is a web-based platform designed to manage and streamline various academic activities within educational institutions. Its features include student information management, course and curriculum administration, attendance tracking, examinations, and academic reporting.', 
    image: '/portfolio/siakad.png',
    language: "CSS, jQuery, CodeIgniter, MySQL"
  },
  { 
    title: 'MasterITN', 
    description: 'MasterITN is a campus management system designed to support rectorate-level operations. Unlike a standard Academic Information System that focuses primarily on student and academic activities, MasterITN extends its scope to include budget planning (RKAT), employee management, human resources, and other administrative processes.', 
    image: '/portfolio/masteritn.png',
    language: "CSS, jQuery, CodeIgniter, MySQL"
  },
  { 
    title: 'ChatBot Whatsapp', 
    description: 'The WhatsApp Chatbot is an automation system built on top of Web WhatsApp and enhanced with Natural Language Processing (NLP) concepts. It enables automated interactions with users, such as answering queries, processing requests, and providing real-time information through conversational flows.', 
    image: '/portfolio/chatbot.png',
    language: "Python, Selenium, AIML, NLP"
  },
  { 
    title: 'SILab', 
    description: 'SI Lab (Laboratory Information System) is a platform designed to manage and store practicum assessment data. The system allows lecturers and laboratory staff to record, organize, and track students’ performance in laboratory sessions efficiently.', 
    image: '/portfolio/silab.png',
    language: "Bootstrap, Javascript, PHP, MySQL"
  },
  { 
    title: 'Konco Kost', 
    description: 'Konco Kost is a web-based platform that helps users find boarding houses (kost) nearby, integrated with the Google Maps API. The system provides detailed information about available boarding houses and includes a distance calculation feature to help users determine proximity to campuses, offices, or other key locations.', 
    image: '/portfolio/konco-kost.png',
    language: "G-Maps API, Bootstrap, Javascript, PHP, MySQL"
  },
  { 
    title: 'Al Manahij', 
    description: 'Al-Manahij is a web-based platform designed to assist users in selecting appropriate methods for learning the Qur’an. The system provides guidance on different Qur’anic learning methodologies, helping students and teachers choose the approach that best suits their needs and learning styles.', 
    image: '/portfolio/al-manahij.png',
    language: "Bootstrap, Javascript, PHP, MySQL"
  },
  { 
    title: 'Masail Fiqhiyyah', 
    description: 'Masail Fiqhiyyah is an information platform that provides access to a wide range of Islamic jurisprudence (fiqh) discussions. The platform organizes various fiqh topics into structured content, making it easier for users to learn, reference, and explore different perspectives on religious rulings.', 
    image: '/portfolio/masail.png',
    language: "Bootstrap, Javascript, PHP, MySQL"
  },
]
</script>

<style scoped>
:deep(.swiper-pagination) {
  bottom: 0 !important;
  text-align: center;
}
</style>
