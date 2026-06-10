<template>
  <div ref="root" class="journey container mx-auto px-4">
    <header class="journey-head">
      <p class="journey-eyebrow">The Quest Log</p>
      <h2 class="journey-title font-display">My Journey</h2>
      <p class="journey-sub">
        Each checkpoint is a chapter — scroll to walk the path from where it
        started to where it's heading.
      </p>
    </header>

    <div ref="map" class="journey-map">
      <!-- Trail spine -->
      <div class="trail" aria-hidden="true">
        <div class="trail-base" />
        <div ref="trailFill" class="trail-fill" />
      </div>

      <!-- Start flag -->
      <div class="checkpoint checkpoint--flag">
        <span class="flag">🚩</span>
        <span class="flag-label">Start</span>
      </div>

      <!-- Milestones -->
      <div
        v-for="(exp, index) in experiences"
        :key="index"
        :ref="setStepRef"
        class="step"
        :class="index % 2 === 0 ? 'step--left' : 'step--right'"
      >
        <!-- Level node -->
        <div class="node">
          <span class="node-level">Lv.{{ index + 1 }}</span>
          <div class="node-badge">
            <img :src="exp.icon" :alt="exp.title + ' icon'" class="node-icon" >
          </div>
        </div>

        <!-- Card -->
        <div
          class="card"
          :class="exp.image ? 'card--clickable' : ''"
          :role="exp.image ? 'button' : undefined"
          :tabindex="exp.image ? 0 : undefined"
          @click="exp.image && openModal(exp.image)"
          @keydown.enter="exp.image && openModal(exp.image)"
        >
          <div v-if="exp.image" class="card-photo-hint" title="View proof">
            <Camera class="w-4 h-4" />
          </div>
          <h3 class="card-title">{{ exp.title }}</h3>
          <h4 class="card-subtitle">{{ exp.subtitle }}</h4>
          <p class="card-desc">{{ exp.description }}</p>
        </div>
      </div>

      <!-- Finish flag -->
      <div class="checkpoint checkpoint--flag checkpoint--finish">
        <span class="flag">🏆</span>
        <span class="flag-label">To be continued…</span>
      </div>
    </div>

    <!-- Image modal — Teleport ensures fixed covers full viewport -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showModal"
          class="modal-overlay"
          @click.self="closeModal"
        >
          <div class="modal-frame">
            <button class="modal-close" aria-label="Close" @click="closeModal">
              <X class="w-5 h-5" />
            </button>
            <div class="modal-inner">
              <img :src="selectedImage" alt="Experience proof" class="modal-img" >
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUpdate, computed, type ComponentPublicInstance } from "vue";
import { experiences as rawExperiences } from "~/data/experience";
const experiences = computed(() => [...rawExperiences].reverse());
import { Camera, X } from "lucide-vue-next";
import { gsap } from "gsap";

const showModal = ref(false);
const selectedImage = ref("");

const root = ref<HTMLElement | null>(null);
const map = ref<HTMLElement | null>(null);
const trailFill = ref<HTMLElement | null>(null);
const stepRefs = ref<HTMLElement[]>([]);

// reset refs before each re-render so we don't accumulate stale nodes
onBeforeUpdate(() => {
  stepRefs.value = [];
});
const setStepRef = (el: Element | ComponentPublicInstance | null) => {
  if (el && el instanceof Element) stepRefs.value.push(el as HTMLElement);
};

const openModal = (image: string) => {
  selectedImage.value = image;
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
  selectedImage.value = "";
};

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !map.value) {
    // Without motion, just show everything.
    if (trailFill.value) trailFill.value.style.height = "100%";
    return;
  }

  const ctx = gsap.context(() => {
    // Trail fills as you progress through the section.
    gsap.fromTo(
      trailFill.value,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: map.value,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      }
    );

    // Reveal each step + light up its node when reached.
    stepRefs.value.forEach((step) => {
      const node = step.querySelector(".node-badge");
      const card = step.querySelector(".card");
      const fromX = step.classList.contains("step--left") ? -40 : 40;

      gsap.fromTo(
        card,
        { x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 80%" },
        }
      );

      gsap.fromTo(
        node,
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: step,
            start: "top 78%",
            onEnter: () => node?.classList.add("node-badge--reached"),
            onLeaveBack: () => node?.classList.remove("node-badge--reached"),
          },
        }
      );
    });
  }, root.value!);

  return () => ctx.revert();
});
</script>

<style scoped>
.journey {
  --accent: #6366f1;
  --accent-2: #22d3ee;
  position: relative;
  padding-top: 1rem;
  padding-bottom: 2rem;
}

/* ---------- header ---------- */
.journey-head {
  text-align: center;
  max-width: 40rem;
  margin: 0 auto 4rem;
}
.journey-eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--accent);
}
.journey-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-top: 0.5rem;
}
.journey-sub {
  margin-top: 0.75rem;
  color: #64748b;
  line-height: 1.6;
}
:global(.dark) .journey-sub { color: #94a3b8; }

/* ---------- map / trail ---------- */
.journey-map {
  position: relative;
  padding: 1rem 0 0;
}
.trail {
  position: absolute;
  top: calc(1rem + 44px);
  bottom: calc(2.5rem + 22px);
  left: 28px;
  width: 4px;
}
.trail-base,
.trail-fill {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-radius: 9999px;
}
.trail-base {
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(100, 116, 139, 0.28) 0,
    rgba(100, 116, 139, 0.28) 8px,
    transparent 8px,
    transparent 16px
  );
  background-size: 100% 16px;
}
.trail-fill {
  height: 0%;
  background: linear-gradient(to bottom, var(--accent), var(--accent-2));
  box-shadow: 0 0 14px rgba(99, 102, 241, 0.55);
}

/* ---------- checkpoints / flags ---------- */
.checkpoint--flag {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 8px;
  margin-bottom: 2.5rem;
}
.checkpoint--finish { margin-top: 2.5rem; margin-bottom: 2rem; }
.flag {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  background: #fff;
  border: 2px solid var(--accent);
  border-radius: 9999px;
  box-shadow: 0 8px 20px -10px rgba(99, 102, 241, 0.6);
}
:global(.dark) .flag { background: #0f172a; }
.flag-label {
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--accent);
}

/* ---------- steps ---------- */
.step {
  position: relative;
  padding-left: 76px;
  margin-bottom: 3rem;
}
.node {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  z-index: 2;
}
.node-level {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--accent);
  background: rgba(99, 102, 241, 0.12);
  border-radius: 9999px;
  padding: 1px 7px;
}
.node-badge {
  width: 58px;
  height: 58px;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 3px solid rgba(100, 116, 139, 0.3);
  box-shadow: 0 8px 18px -10px rgba(15, 23, 42, 0.35);
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.2s ease;
}
:global(.dark) .node-badge { background: #0f172a; }
.node-badge--reached {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.18),
    0 10px 24px -10px rgba(99, 102, 241, 0.7);
}
.node-icon { width: 30px; height: 30px; object-fit: contain; }

/* ---------- card ---------- */
.card {
  position: relative;
  background: #fff;
  border: 1px solid rgba(100, 116, 139, 0.15);
  border-radius: 1rem;
  padding: 1.4rem 1.5rem;
  box-shadow: 0 18px 40px -28px rgba(15, 23, 42, 0.5);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
:global(.dark) .card {
  background: #111827;
  border-color: rgba(148, 163, 184, 0.14);
}
.card--clickable { cursor: pointer; }
.card--clickable:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
  box-shadow: 0 24px 50px -28px rgba(99, 102, 241, 0.6);
}
.card--clickable:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
.card-photo-hint {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  color: var(--accent);
  background: rgba(99, 102, 241, 0.1);
}
.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  padding-right: 2.5rem;
}
:global(.dark) .card-title { color: #f1f5f9; }
.card-subtitle {
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 600;
  margin-top: 0.15rem;
}
.card-desc {
  margin-top: 0.65rem;
  color: #475569;
  line-height: 1.65;
  font-size: 0.95rem;
}
:global(.dark) .card-desc { color: #cbd5e1; }

/* ---------- alternating layout (desktop) ---------- */
@media (min-width: 768px) {
  .trail { left: 50%; transform: translateX(-50%); top: calc(1rem + 56px); bottom: calc(2.5rem + 22px); }
  .checkpoint--flag {
    justify-content: center;
    padding-left: 0;
  }
  .step {
    padding-left: 0;
    display: grid;
    grid-template-columns: 1fr 116px 1fr;
    align-items: center;
    margin-bottom: 3.5rem;
  }
  .node {
    grid-column: 2;
    left: auto;
    position: relative;
    top: auto;
  }
  .step--left .card { grid-column: 1; text-align: right; }
  .step--left .card-title { padding-right: 0; padding-left: 2.5rem; }
  .step--left .card-photo-hint { right: auto; left: 1rem; }
  .step--right .card { grid-column: 3; }
}

/* ---------- modal ---------- */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(6px);
  padding: 1rem;
}
.modal-frame {
  position: relative;
  background: #fff;
  border-radius: 1rem;
  padding: 1.25rem;
  max-width: 48rem;
  width: 100%;
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.6);
}
:global(.dark) .modal-frame { background: #0f172a; }
.modal-close {
  position: absolute;
  top: -14px;
  right: -14px;
  background: #475569;
  color: #fff;
  border-radius: 0.7rem;
  padding: 0.5rem;
  box-shadow: 0 6px 16px -6px rgba(0, 0, 0, 0.5);
  transition: background 0.2s ease;
}
.modal-close:hover { background: #dc2626; }
.modal-inner {
  border: 1px solid rgba(100, 116, 139, 0.25);
  border-radius: 0.7rem;
  padding: 0.5rem;
  background: #f8fafc;
}
:global(.dark) .modal-inner { background: #1e293b; }
.modal-img {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 0.5rem;
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>