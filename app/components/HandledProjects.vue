<template>
  <div ref="root" class="projects container mx-auto px-4">
    <header class="projects-head">
      <p class="projects-eyebrow">~/projects</p>
      <h2 class="projects-title font-display">Things I've built</h2>
      <p class="projects-sub">
        Browse the folder. Open any file for a closer look.
      </p>
    </header>

    <!-- Finder-style window -->
    <div ref="windowEl" class="finder">
      <!-- Title bar -->
      <div class="finder-bar">
        <div class="traffic">
          <span class="tdot tdot--red" />
          <span class="tdot tdot--amber" />
          <span class="tdot tdot--green" />
        </div>
        <div class="finder-path">
          <Folder class="w-3.5 h-3.5" />
          <span>dimasfr</span>
          <ChevronRight class="w-3 h-3 opacity-50" />
          <span>{{ selectedTag === "All" ? "projects" : selectedTag }}</span>
        </div>
        <div class="finder-count">{{ filteredProjects.length }} items</div>
      </div>

      <div class="finder-body">
        <!-- Sidebar: tags as locations -->
        <aside class="finder-side">
          <p class="side-heading">Filters</p>
          <button
            v-for="tag in tags"
            :key="tag"
            class="side-item"
            :class="{ 'side-item--active': selectedTag === tag }"
            @click="setTag(tag)"
          >
            <Folder v-if="tag === 'All'" class="w-4 h-4" />
            <Tag v-else class="w-4 h-4" />
            <span class="side-label">{{ tag }}</span>
          </button>
        </aside>

        <!-- Main file grid -->
        <div ref="grid" class="finder-main" data-lenis-prevent>
          <!-- Spinner overlay -->
          <Transition name="spinner-fade">
            <div v-if="isLoading" class="finder-loading">
              <span class="finder-spinner" />
            </div>
          </Transition>

          <div v-show="!isLoading">
            <TransitionGroup name="file" tag="div" class="file-grid">
              <button
                v-for="project in filteredProjects"
                :key="project.title"
                class="file"
                @click="openModal(project)"
              >
                <div class="file-thumb">
                  <img :src="project.image" :alt="project.title" >
                  <span class="file-ext">{{ extOf(project.language) }}</span>
                </div>
                <p class="file-name">{{ project.title }}</p>
              </button>
            </TransitionGroup>

            <p v-if="!filteredProjects.length" class="finder-empty">
              No files in this folder yet.
            </p>
          </div>
        </div>
      </div>

      <!-- Status bar -->
      <div class="finder-status">
        <span>{{ filteredProjects.length }} of {{ projects.length }} projects</span>
        <span class="status-hint">Click a file to preview</span>
      </div>
    </div>

    <!-- Preview modal —  Teleport to body so fixed = full viewport -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="active" class="modal-overlay" @click.self="closeModal">
        <div class="preview">
          <div class="preview-bar">
            <div class="traffic">
              <span class="tdot tdot--red" @click="closeModal" />
              <span class="tdot tdot--amber" />
              <span class="tdot tdot--green" />
            </div>
            <span class="preview-filename">{{ active.title }}</span>
            <button class="preview-x" aria-label="Close" @click="closeModal">
              <X class="w-4 h-4" />
            </button>
          </div>

          <div class="preview-stage">
            <img :src="active.image" class="preview-bg" alt="" aria-hidden="true" >
            <img :src="active.image" class="preview-img" :alt="active.title" >
          </div>

          <div class="preview-info">
            <div class="preview-titlerow">
              <h4>{{ active.title }}</h4>
              <a
                v-if="active.link"
                :href="active.link"
                target="_blank"
                rel="noopener noreferrer"
                class="preview-link"
                @click.stop
              >
                <ExternalLink class="w-4 h-4" /> Visit
              </a>
            </div>
            <div v-if="active.tags?.length" class="preview-tags">
              <span v-for="t in active.tags" :key="t" class="preview-tag">{{ t }}</span>
            </div>
            <div v-if="active.language" class="preview-lang">
              <span class="preview-lang-label">Stack</span>
              <span class="preview-lang-value">{{ active.language }}</span>
            </div>
            <p class="preview-desc">{{ active.description }}</p>
          </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { projects } from "~/data/projects";
import { ExternalLink, X, Folder, Tag, ChevronRight } from "lucide-vue-next";
import { gsap } from "gsap";

interface Project {
  image: string;
  title: string;
  language?: string;
  description?: string;
  link?: string;
  tags?: string[];
}

const selectedTag = ref("All");
const active = ref<Project | null>(null);
const isLoading = ref(false);

const root = ref<HTMLElement | null>(null);
const windowEl = ref<HTMLElement | null>(null);

const tags = [
  "All",
  ...new Set(
    (projects as Project[])
      .flatMap((p) => p.tags || [])
      .map((t) => t?.trim())
      .filter(Boolean)
  ),
];

const filteredProjects = computed<Project[]>(() => {
  if (selectedTag.value === "All") return projects as Project[];
  return (projects as Project[]).filter((p) =>
    p.tags?.includes(selectedTag.value)
  );
});

const setTag = (tag: string) => {
  if (tag === selectedTag.value) return;
  isLoading.value = true;
  setTimeout(() => {
    selectedTag.value = tag;
    setTimeout(() => {
      isLoading.value = false;
    }, 50);
  }, 400);
};

// Turn a language string into a short file-extension-style badge.
const extOf = (lang?: string) => {
  if (!lang) return "app";
  const map: Record<string, string> = {
    vue: "vue",
    react: "jsx",
    javascript: "js",
    typescript: "ts",
    python: "py",
    php: "php",
    laravel: "php",
    flutter: "dart",
    html: "html",
  };
  const key = lang.toLowerCase().split(/[\s,/]+/)[0];
  return map[key] || key.slice(0, 4);
};

const openModal = (project: Project) => {
  active.value = project;
};
const closeModal = () => {
  active.value = null;
};

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !windowEl.value) return;

  const ctx = gsap.context(() => {
    gsap.from(windowEl.value, {
      y: 48,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: windowEl.value, start: "top 82%" },
    });
  }, root.value!);

  return () => ctx.revert();
});
</script>

<style scoped>
.projects {
  --accent: #6366f1;
  padding-top: 1rem;
}
.projects-head { text-align: center; max-width: 40rem; margin: 0 auto 2.5rem; }
.projects-eyebrow {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.8rem;
  color: var(--accent);
  letter-spacing: 0.05em;
}
.projects-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-top: 0.4rem;
}
.projects-sub { margin-top: 0.6rem; color: #64748b; }
:global(.dark .projects-sub) { color: #94a3b8; }

/* ---------- window ---------- */
.finder {
  max-width: 64rem;
  margin: 0 auto;
  border-radius: 0.9rem;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(100, 116, 139, 0.2);
  box-shadow: 0 40px 80px -40px rgba(15, 23, 42, 0.55);
}
:global(.dark .finder) {
  background: #0f172a;
  border-color: rgba(148, 163, 184, 0.16);
}
.finder-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1rem;
  background: #f1f5f9;
  border-bottom: 1px solid rgba(100, 116, 139, 0.18);
}
:global(.dark .finder-bar) {
  background: #1e293b;
  border-color: rgba(148, 163, 184, 0.14);
}
.traffic { display: flex; gap: 0.45rem; }
.tdot { width: 12px; height: 12px; border-radius: 9999px; }
.tdot--red { background: #ff5f57; }
.tdot--amber { background: #febc2e; }
.tdot--green { background: #28c840; }
.finder-path {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: #475569;
  background: rgba(148, 163, 184, 0.16);
  padding: 0.25rem 0.7rem;
  border-radius: 0.5rem;
  margin: 0 auto;
}
:global(.dark .finder-path) { color: #cbd5e1; }
.finder-count {
  font-size: 0.75rem;
  color: #94a3b8;
  white-space: nowrap;
}

.finder-body {
  display: grid;
  grid-template-columns: 180px 1fr;
  min-height: 420px;
}

/* sidebar */
.finder-side {
  border-right: 1px solid rgba(100, 116, 139, 0.16);
  padding: 0.9rem 0.6rem;
  background: #f8fafc;
}
:global(.dark .finder-side) {
  background: #131c2e;
  border-color: rgba(148, 163, 184, 0.12);
}
.side-heading {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #94a3b8;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
}
.side-item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  text-align: left;
  padding: 0.45rem 0.6rem;
  border-radius: 0.55rem;
  font-size: 0.85rem;
  color: #475569;
  transition: background 0.15s ease, color 0.15s ease;
}
:global(.dark .side-item) { color: #cbd5e1; }
.side-item:hover { background: rgba(99, 102, 241, 0.1); }
.side-item--active {
  background: var(--accent);
  color: #fff;
}
:global(.dark .side-item--active) { color: #fff; }
.side-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* main file area */
.finder-main {
  position: relative;
  padding: 1.25rem;
  max-height: 60vh;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.file-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
}
.file {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.75rem 0.5rem;
  border-radius: 0.7rem;
  transition: background 0.15s ease, transform 0.15s ease;
}
.file:hover { background: rgba(99, 102, 241, 0.1); transform: translateY(-2px); }
.file:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.file-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 0.55rem;
  overflow: hidden;
  background: #e2e8f0;
  box-shadow: 0 6px 16px -10px rgba(15, 23, 42, 0.5);
}
:global(.dark .file-thumb) { background: #1e293b; }
.file-thumb img { width: 100%; height: 100%; object-fit: cover; }
.file-ext {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-family: ui-monospace, monospace;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  background: rgba(15, 23, 42, 0.8);
  padding: 1px 5px;
  border-radius: 4px;
}
.file-name {
  margin-top: 0.55rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #1e293b;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
:global(.dark .file-name) { color: #e2e8f0; }
.file-meta { font-size: 0.7rem; color: #94a3b8; }
.finder-empty {
  text-align: center;
  color: #94a3b8;
  padding: 3rem 0;
  grid-column: 1 / -1;
}

/* status bar */
.finder-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 1rem;
  font-size: 0.72rem;
  color: #94a3b8;
  background: #f1f5f9;
  border-top: 1px solid rgba(100, 116, 139, 0.16);
}
:global(.dark .finder-status) {
  background: #1e293b;
  border-color: rgba(148, 163, 184, 0.12);
}
.status-hint { font-style: italic; }

/* spinner overlay */
.finder-loading {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2px);
  border-radius: 0;
}
:global(.dark .finder-loading) {
  background: rgba(15, 23, 42, 0.65);
}
.finder-spinner {
  width: 28px;
  height: 28px;
  border: 3px solid rgba(99, 102, 241, 0.2);
  border-top-color: var(--accent);
  border-radius: 9999px;
  animation: spin 0.65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.spinner-fade-enter-active,
.spinner-fade-leave-active { transition: opacity 0.15s ease; }
.spinner-fade-enter-from,
.spinner-fade-leave-to { opacity: 0; }

/* transition for filtering */
.file-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.file-leave-active { transition: opacity 0.15s ease; position: absolute; }
.file-enter-from { opacity: 0; transform: translateY(8px) scale(0.95); }
.file-leave-to { opacity: 0; }

@media (max-width: 640px) {
  .finder-body { grid-template-columns: 1fr; }
  .finder-side {
    display: flex;
    gap: 0.4rem;
    overflow-x: auto;
    border-right: none;
    border-bottom: 1px solid rgba(100, 116, 139, 0.16);
  }
  .side-heading { display: none; }
  .side-item { width: auto; white-space: nowrap; }
  .finder-count { display: none; }
}

/* ---------- preview modal ---------- */
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
.preview {
  width: 100%;
  max-width: 46rem;
  border-radius: 0.9rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.65);
}
:global(.dark .preview) { background: #0f172a; }
.preview-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.65rem 0.9rem;
  background: #f1f5f9;
  border-bottom: 1px solid rgba(100, 116, 139, 0.16);
}
:global(.dark .preview-bar) { background: #1e293b; }
.preview .tdot--red { cursor: pointer; }
.preview-filename {
  margin: 0 auto;
  font-size: 0.82rem;
  color: #475569;
  font-weight: 600;
}
:global(.dark .preview-filename) { color: #cbd5e1; }
.preview-x { color: #94a3b8; }
.preview-x:hover { color: #dc2626; }
.preview-stage {
  position: relative;
  height: 320px;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #0b1020;
}
.preview-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(28px);
  transform: scale(1.15);
  opacity: 0.4;
}
.preview-img {
  position: relative;
  max-width: 92%;
  max-height: 92%;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.7);
}
.preview-info { padding: 1.25rem 1.4rem 1.5rem; }
.preview-titlerow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.preview-titlerow h4 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
}
:global(.dark .preview-titlerow h4) { color: #f1f5f9; }
.preview-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--accent);
  border: 1px solid rgba(99, 102, 241, 0.4);
  padding: 0.25rem 0.7rem;
  border-radius: 0.5rem;
  transition: background 0.15s ease;
}
.preview-link:hover { background: rgba(99, 102, 241, 0.12); }
:global(.dark .preview-link) {
  color: #a5b4fc;
  border-color: rgba(165, 180, 252, 0.4);
}
:global(.dark .preview-link:hover) {
  background: rgba(165, 180, 252, 0.12);
}
.preview-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.7rem;
}
.preview-tag {
  font-size: 0.72rem;
  color: #475569;
  background: rgba(148, 163, 184, 0.2);
  padding: 0.15rem 0.6rem;
  border-radius: 9999px;
}
:global(.dark .preview-tag) { color: #cbd5e1; }
.preview-desc {
  margin-top: 0.85rem;
  color: #475569;
  line-height: 1.65;
  font-size: 0.95rem;
}
:global(.dark .preview-desc) { color: #cbd5e1; }

.preview-lang {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: rgba(99, 102, 241, 0.07);
  border-radius: 0.5rem;
  border: 1px solid rgba(99, 102, 241, 0.15);
}
.preview-lang-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6366f1;
  white-space: nowrap;
}
.preview-lang-value {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.82rem;
  color: #475569;
  line-height: 1.5;
}
:global(.dark .preview-lang-value) { color: #cbd5e1; }

.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>