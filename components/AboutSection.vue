<template>
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      <!-- Left: Info -->
      <div>
        <h2 class="text-3xl font-bold mb-4">I'm a creative Web Developer</h2>
        <p 
          class="mb-6 leading-relaxed
          bg-gray-100 text-gray-900 
          dark:bg-gray-800 dark:text-gray-100 transition-colors duration-300
          ">
          I began my programming journey in college, sneaking in code between lectures and soon earning the trust of my thesis instructor to dive into real-world development—balancing my thesis and a first full-time role all at once. 
          That period culminated in my proudest academic achievement: a thesis weaving together technologies I’d never touched before—NLP, AI/ML, and Python—with a project I was building. 
          Then, alongside friends, I took the leap into entrepreneurship as a startup’s lead frontend developer—researching and designing fresh features that brought our vision to life. 
          All this while navigating life as a newcomer in a different city—building acceptance and trust in a foreign environment without losing who I am. 
          These experiences taught me that growth isn’t just about technology—it’s about resilience, collaboration, and staying true to yourself.
        </p>

        <!-- Details -->
        <div 
          class="space-y-3">
          <div class="flex justify-between border-b pb-2">
            <Label class="py-1">Age</Label>
            <Label class="py-1">{{ getAge() }} years</Label>
          </div>
          <div class="flex justify-between border-b pb-2">
            <Label class="py-1">Location</Label>
            <Label class="py-1">Jakarta, Indonesia</Label>
          </div>
          <div class="flex justify-between border-b pb-2">
            <Label class="py-1">Phone</Label>
            <Label class="py-1">(+62) 822 2941 9256</Label>
          </div>
          <div class="flex justify-between border-b pb-2">
            <Label class="py-1">Mail</Label>
            <a href="mailto:dimasfr918@gmail.com" class="text-blue-500 hover:underline">
              dimasfr918@gmail.com
            </a>
          </div>
          <div class="flex justify-between items-center border-b pb-2">
            <Label class="py-1">Socials</Label>
            <div class="flex space-x-2">
              <a 
                href="https://www.linkedin.com/in/dimas-fajar-ramadhan-62107620b/" 
                target="_blank"
                class="flex items-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
                <i class="fab fa-linkedin mr-1 mt-1" /> LinkedIn
              </a>
              <a 
                href="https://github.com/dimasfr" 
                target="_blank"
                class="flex items-center bg-gray-900 text-white px-3 py-1 rounded hover:bg-black text-sm">
                <i class="fab fa-github mr-1 mt-1" /> Github
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Photo -->
      <div class="flex justify-center">
        <img 
          src="../public/profile/about-screen.jpg"
          alt="Profile photo"
          class="rounded-xl shadow-lg w-full max-w-md object-cover"
        >
      </div>

    </div>
  </div>
</template>

<script setup>
import Label from './ui/label/Label.vue';

function getAge() {
  const birthDate = new Date("1998-01-09");
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
