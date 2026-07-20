<script setup>
import { formatCurrency } from '../../composables/useCurrency'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  colorClass: {
    type: String,
    default: 'bg-core-blue',
  },
})
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="font-bold text-core-950">{{ title }}</h2>
    <p class="mt-1 text-sm text-slate-500">{{ description }}</p>

    <div class="mt-6 space-y-5">
      <article v-for="item in items" :key="item.label">
        <div class="flex items-center justify-between gap-4">
          <p class="text-sm font-medium text-slate-700">{{ item.label }}</p>
          <p class="text-sm font-semibold text-core-950">
            {{ formatCurrency(item.amount) }}
          </p>
        </div>

        <div class="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            :class="colorClass"
            class="h-full rounded-full"
            :style="{ width: `${item.percentage}%` }"
          />
        </div>
      </article>
    </div>
  </section>
</template>