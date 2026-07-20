<script setup>
defineProps({
  projects: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="font-bold text-core-950">Active projects</h2>
        <p class="mt-1 text-sm text-slate-500">Current delivery progress</p>
      </div>

      <RouterLink to="/projects" class="text-sm font-semibold text-core-blue hover:text-blue-800">
        View all
      </RouterLink>
    </div>

    <div class="mt-6 space-y-5">
      <article v-for="project in projects.slice(0, 4)" :key="project.id">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="font-semibold text-core-950">{{ project.name }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ project.client }}</p>
          </div>

          <span class="text-sm font-semibold text-core-blue">{{ project.progress }}%</span>
        </div>

        <div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-full rounded-full bg-core-blue"
            :style="{ width: `${project.progress}%` }"
          />
        </div>
      </article>
    </div>
  </section>
</template>