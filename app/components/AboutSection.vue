<template>
  <div ref="root" class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
      <!-- Left: Info -->
      <div ref="info">
        <p class="about-eyebrow">Who I am</p>
        <h2 class="about-title font-display">A creative web developer</h2>

        <p class="about-bio">
          I started coding in college, sneaking in projects between lectures
          until my thesis advisor trusted me with real-world development —
          juggling a thesis and my first full-time role at once. That thesis
          became my proudest academic work: NLP, AI/ML, and Python woven into
          something I'd never attempted before. Then I jumped into a startup as
          lead frontend developer, researching and shaping new features — all
          while building a life in a new city. Growth, it turns out, is less
          about tech and more about resilience, collaboration, and staying
          true to yourself.
        </p>

        <dl class="about-details">
          <div class="about-row">
            <dt>Age</dt>
            <dd>{{ age }} years</dd>
          </div>
          <div class="about-row">
            <dt>Location</dt>
            <dd>Jakarta, Indonesia</dd>
          </div>
          <div class="about-row">
            <dt>Phone</dt>
            <dd>(+62) 822 2941 9256</dd>
          </div>
          <div class="about-row">
            <dt>Mail</dt>
            <dd>
              <a href="mailto:dimasfr918@gmail.com" class="about-mail">
                dimasfr918@gmail.com
              </a>
            </dd>
          </div>
          <div class="about-row about-row--socials">
            <dt>Socials</dt>
            <dd class="about-socials">
              <a
                href="https://www.linkedin.com/in/dimas-fajar-ramadhan-62107620b/"
                target="_blank"
                rel="noopener noreferrer"
                class="social social--linkedin"
              >
                <Linkedin class="w-4 h-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/dimasfr"
                target="_blank"
                rel="noopener noreferrer"
                class="social social--github"
              >
                <Github class="w-4 h-4" /> GitHub
              </a>
            </dd>
          </div>
        </dl>

        <a
          href="/cv.pdf"
          download
          class="about-cv-btn"
        >
          <Download class="w-4 h-4" />
          Download CV
        </a>
      </div>

      <!-- Right: Photo -->
      <div ref="photo" class="about-photo-wrap">
        <div class="about-photo-glow" aria-hidden="true" />
        <img
          src="/profile/about-screen.jpg"
          alt="Dimas Fajar Ramadhan"
          class="about-photo"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Linkedin, Github, Download } from "lucide-vue-next";
import { gsap } from "gsap";

const root = ref<HTMLElement | null>(null);
const info = ref<HTMLElement | null>(null);
const photo = ref<HTMLElement | null>(null);

const age = (() => {
  const birth = new Date("1998-01-09");
  const now = new Date();
  let a = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) a--;
  return a;
})();

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !root.value) return;

  const ctx = gsap.context(() => {
    gsap.from(info.value, {
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: root.value, start: "top 75%" },
    });
    gsap.from(photo.value, {
      x: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: root.value, start: "top 75%" },
    });
  }, root.value);

  return () => ctx.revert();
});
</script>

<style scoped>
.about-eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 700;
  color: #6366f1;
}
.about-title {
  font-size: clamp(1.9rem, 4.5vw, 2.7rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-top: 0.4rem;
}
.about-bio {
  margin-top: 1.25rem;
  line-height: 1.75;
  color: #475569;
}
:global(.dark .about-bio) { color: #cbd5e1; }

.about-details { margin-top: 1.75rem; }
.about-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(100, 116, 139, 0.18);
  font-size: 0.95rem;
}
.about-row dt { color: #94a3b8; font-weight: 500; }
.about-row dd { color: #1e293b; font-weight: 600; }
:global(.dark .about-row dd) { color: #e2e8f0; }
.about-mail { color: #6366f1; }
.about-mail:hover { text-decoration: underline; }

.about-socials { display: flex; gap: 0.5rem; }
.social {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #fff;
  padding: 0.3rem 0.7rem;
  border-radius: 0.5rem;
  transition: transform 0.15s ease, opacity 0.15s ease;
}
.social:hover { transform: translateY(-1px); opacity: 0.92; }
.social--linkedin { background: #0a66c2; }
.social--github { background: #1e293b; }

.about-cv-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.75rem;
  padding: 0.65rem 1.35rem;
  border-radius: 0.7rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #6366f1;
  border: 1.5px solid #6366f1;
  transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
}
.about-cv-btn:hover {
  background: #6366f1;
  color: #fff;
  transform: translateY(-2px);
}
:global(.dark .about-cv-btn) {
  color: #818cf8;
  border-color: #818cf8;
}
:global(.dark .about-cv-btn:hover) {
  background: #818cf8;
  color: #0f172a;
}
.about-photo-wrap {
  position: relative;
  display: flex;
  justify-content: center;
}
.about-photo-glow {
  position: absolute;
  inset: -10% 10% 10% -10%;
  background: radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.35), transparent 60%);
  filter: blur(50px);
  z-index: 0;
}
.about-photo {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 26rem;
  border-radius: 1.25rem;
  object-fit: cover;
  box-shadow: 0 30px 60px -30px rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>