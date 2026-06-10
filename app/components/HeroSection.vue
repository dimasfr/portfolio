<template>
  <div ref="root" class="hero-root relative w-full overflow-hidden">
    <!-- Ambient background grid + glow -->
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-grid" />
      <div class="hero-glow hero-glow--one" />
      <div class="hero-glow hero-glow--two" />
    </div>

    <div
      class="relative z-10 container mx-auto px-4 sm:px-8
             grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center
             min-h-[calc(100vh-80px)] py-20"
    >
      <!-- Left: copy -->
      <div class="max-w-xl">
        <p ref="eyebrow" class="hero-eyebrow">
          <span class="hero-status-dot" />
          Open to new opportunities
        </p>

        <h1 class="hero-title font-display">
          <span class="hero-line"><span>Dimas Fajar</span></span>
          <span class="hero-line"><span class="hero-accent">Ramadhan</span></span>
        </h1>

        <p ref="role" class="hero-role">
          Web Developer<span class="hero-divider">/</span>Full Stack Engineer
        </p>

        <p ref="lede" class="hero-lede">
          I build interfaces that feel considered — fast, accessible, and
          finished down to the last interaction. From NLP-driven theses to
          production applications, I turn ideas into things people
          actually use.
        </p>

        <div ref="cta" class="hero-actions">
          <button class="btn btn--solid" @click="scrollToSection('#projects')">
            View my work
            <ArrowDown class="w-4 h-4" />
          </button>
          <button class="btn btn--ghost" @click="scrollToSection('#about')">
            About me
          </button>
        </div>

        <div ref="stats" class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat-num">6+</span>
            <span class="hero-stat-label">years building</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-num">20+</span>
            <span class="hero-stat-label">projects shipped</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-num">∞</span>
            <span class="hero-stat-label">cups of coffee</span>
          </div>
        </div>
      </div>

      <!-- Right: terminal window (signature element, echoes Projects window) -->
      <div ref="terminal" class="terminal" role="img" aria-label="Terminal introducing Dimas Fajar Ramadhan">
        <div class="terminal-bar">
          <span class="dot dot--red" />
          <span class="dot dot--amber" />
          <span class="dot dot--green" />
          <span class="terminal-titlebar">dimasfr — zsh</span>
        </div>
        <div class="terminal-body font-mono">
          <p><span class="t-prompt">➜</span> <span class="t-path">~</span> whoami</p>
          <p class="t-out">dimas_fajar_ramadhan</p>
          <p><span class="t-prompt">➜</span> <span class="t-path">~</span> cat stack.txt</p>
          <p class="t-out">Vue · Nuxt · TypeScript · Tailwind · Python · NLP</p>
          <p><span class="t-prompt">➜</span> <span class="t-path">~</span> echo $LOCATION</p>
          <p class="t-out">Jakarta, Indonesia 🇮🇩</p>
          <p>
            <span class="t-prompt">➜</span> <span class="t-path">~</span>
            <span class="t-cursor">▋</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <button
      ref="scrollHint"
      class="hero-scroll-hint"
      aria-label="Scroll to about section"
      @click="scrollToSection('#about')"
    >
      <span>Scroll</span>
      <span class="hero-scroll-track"><span class="hero-scroll-thumb" /></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ArrowDown } from "lucide-vue-next";
import { gsap } from "gsap";
import { useSmoothScroll } from "~/composables/useSmoothScroll";

const { scrollToSection } = useSmoothScroll();

const root = ref<HTMLElement | null>(null);
const eyebrow = ref<HTMLElement | null>(null);
const role = ref<HTMLElement | null>(null);
const lede = ref<HTMLElement | null>(null);
const cta = ref<HTMLElement | null>(null);
const stats = ref<HTMLElement | null>(null);
const terminal = ref<HTMLElement | null>(null);
const scrollHint = ref<HTMLElement | null>(null);

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !root.value) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.9 },
    });

    tl.from(eyebrow.value, { y: 18, opacity: 0, duration: 0.6 })
      .from(
        ".hero-line span",
        { yPercent: 110, opacity: 0, stagger: 0.12, duration: 1 },
        "-=0.2"
      )
      .from(role.value, { y: 20, opacity: 0 }, "-=0.5")
      .from(lede.value, { y: 20, opacity: 0 }, "-=0.6")
      .from(cta.value, { y: 20, opacity: 0 }, "-=0.6")
      .from(
        stats.value?.children ? [...stats.value.children] : [],
        { y: 16, opacity: 0, stagger: 0.1 },
        "-=0.6"
      )
      .from(
        terminal.value,
        { y: 40, opacity: 0, scale: 0.96, duration: 1 },
        "-=1.1"
      )
      .from(
        ".terminal-body p",
        { opacity: 0, x: -8, stagger: 0.12, duration: 0.4 },
        "-=0.5"
      )
      .from(scrollHint.value, { opacity: 0, y: 10 }, "-=0.2");
  }, root.value);

  return () => ctx.revert();
});
</script>

<style scoped>
.hero-root {
  --hero-accent: #6366f1;
  --hero-accent-2: #22d3ee;
}

/* ---------- background ---------- */
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(99, 102, 241, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(99, 102, 241, 0.07) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%);
}
.hero-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  opacity: 0.5;
}
.hero-glow--one {
  width: 380px;
  height: 380px;
  top: -80px;
  right: 8%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.55), transparent 70%);
}
.hero-glow--two {
  width: 320px;
  height: 320px;
  bottom: 0;
  left: -60px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.4), transparent 70%);
}

/* ---------- copy ---------- */
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  color: #475569;
  border: 1px solid rgba(99, 102, 241, 0.25);
  border-radius: 9999px;
  padding: 0.35rem 0.8rem;
  background: rgba(99, 102, 241, 0.06);
}
:global(.dark .hero-eyebrow) {
  color: #cbd5e1;
}
.hero-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

.hero-title {
  margin-top: 1.25rem;
  font-size: clamp(2.75rem, 7vw, 4.75rem);
  line-height: 0.98;
  font-weight: 700;
  letter-spacing: -0.03em;
}
.hero-line {
  display: block;
  overflow: hidden;
}
.hero-line > span {
  display: inline-block;
}
.hero-accent {
  background: linear-gradient(120deg, var(--hero-accent), var(--hero-accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-role {
  margin-top: 1rem;
  font-size: 1.05rem;
  font-weight: 500;
  color: #475569;
}
:global(.dark .hero-role) {
  color: #94a3b8;
}
.hero-divider {
  color: var(--hero-accent);
  margin: 0 0.6rem;
  font-weight: 700;
}

.hero-lede {
  margin-top: 1.5rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #475569;
  max-width: 34rem;
}
:global(.dark .hero-lede) {
  color: #cbd5e1;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  border-radius: 0.7rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(0); }
.btn--solid {
  background: linear-gradient(120deg, var(--hero-accent), #818cf8);
  color: white;
  box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.7);
}
.btn--ghost {
  background: transparent;
  color: #334155;
  border: 1px solid rgba(100, 116, 139, 0.35);
}
:global(.dark .btn--ghost) {
  color: #e2e8f0;
  border-color: rgba(148, 163, 184, 0.3);
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2.75rem;
}
.hero-stat {
  display: flex;
  flex-direction: column;
}
.hero-stat-num {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
  font-family: var(--font-display, inherit);
}
:global(.dark .hero-stat-num) {
  color: #f1f5f9;
}
.hero-stat-label {
  font-size: 0.78rem;
  color: #64748b;
  letter-spacing: 0.02em;
}

/* ---------- terminal ---------- */
.terminal {
  border-radius: 1rem;
  overflow: hidden;
  background: #0b1020;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 30px 60px -25px rgba(2, 6, 23, 0.65),
    0 0 0 1px rgba(99, 102, 241, 0.08);
  transform: perspective(1200px) rotateY(-4deg) rotateX(2deg);
}
.terminal-bar {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.7rem 0.9rem;
  background: #11182e;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  position: relative;
}
.dot { width: 12px; height: 12px; border-radius: 9999px; }
.dot--red { background: #ff5f57; }
.dot--amber { background: #febc2e; }
.dot--green { background: #28c840; }
.terminal-titlebar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.78rem;
  color: #64748b;
  letter-spacing: 0.02em;
}
.terminal-body {
  padding: 1.3rem 1.4rem 1.6rem;
  font-size: 0.92rem;
  line-height: 1.85;
  color: #cbd5e1;
}
.t-prompt { color: #34d399; font-weight: 700; }
.t-path { color: #60a5fa; }
.t-out { color: #e2e8f0; padding-left: 0.2rem; }
.t-cursor {
  color: #818cf8;
  animation: blink 1.05s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0; } }

/* ---------- scroll hint ---------- */
.hero-scroll-hint {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #64748b;
  z-index: 10;
}
.hero-scroll-track {
  width: 22px;
  height: 36px;
  border: 2px solid rgba(100, 116, 139, 0.45);
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}
.hero-scroll-thumb {
  width: 4px;
  height: 8px;
  border-radius: 9999px;
  background: var(--hero-accent);
  animation: scroll-bounce 1.6s ease-in-out infinite;
}
@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(10px); opacity: 0.3; }
}

@media (max-width: 1023px) {
  .terminal { transform: none; }
  .hero-scroll-hint { display: none; }
}
@media (max-width: 420px) {
  .hero-stats { gap: 1.25rem; }
}
</style>