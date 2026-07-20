<script setup>
defineProps({
  activities: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="font-bold text-core-950">Recent activity</h2>
    <p class="mt-1 text-sm text-slate-500">Latest updates across ForgeX Core</p>

    <div class="mt-6 space-y-6">
      <article v-for="activity in activities" :key="activity.title" class="flex gap-4">
        <div class="mt-1 size-2 shrink-0 rounded-full bg-core-blue" />

        <div>
          <p class="text-sm font-semibold text-core-950">{{ activity.title }}</p>
          <p class="mt-1 text-sm leading-6 text-slate-500">{{ activity.description }}</p>
          <p class="mt-1 text-xs text-slate-400">{{ activity.time }}</p>
        </div>
      </article>
    </div>
  </section>
</template>