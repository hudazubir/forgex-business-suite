<script setup>
defineProps({
  label: String,
  value: String,
  change: Number,
  icon: Object,
  positive: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-slate-500">{{ label }}</p>
        <p class="mt-2 text-2xl font-bold tracking-tight text-core-950">
          {{ value }}
        </p>
      </div>

      <div class="rounded-xl bg-blue-50 p-3 text-core-blue">
        <component :is="icon" class="size-5" />
      </div>
    </div>

    <p class="mt-4 text-sm">
      <span :class="positive ? 'text-core-green' : 'text-core-red'" class="font-semibold">
        {{ positive ? '+' : '-' }}{{ change }}%
      </span>
      <span class="ml-1 text-slate-500">vs. last month</span>
    </p>
  </article>
</template>