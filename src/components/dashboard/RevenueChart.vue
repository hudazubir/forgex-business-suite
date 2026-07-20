<script setup>
import { computed } from 'vue'
import { formatCurrency } from '../../composables/useCurrency'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const maxValue = computed(() => Math.max(...props.data.map((item) => item.value)))
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex items-start justify-between">
      <div>
        <h2 class="font-bold text-core-950">Revenue performance</h2>
        <p class="mt-1 text-sm text-slate-500">Monthly revenue for 2026</p>
      </div>

      <span class="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-core-green">
        +12.8% this month
      </span>
    </div>

    <div class="mt-8 flex h-64 items-end justify-between gap-3">
      <div
        v-for="item in data"
        :key="item.month"
        class="group flex h-full flex-1 flex-col justify-end"
      >
        <div class="relative flex flex-1 items-end">
          <div
            class="w-full rounded-t-lg bg-core-blue/80 transition hover:bg-core-blue"
            :style="{ height: `${(item.value / maxValue) * 100}%` }"
            :title="formatCurrency(item.value)"
          />
        </div>

        <p class="mt-3 text-center text-xs font-medium text-slate-500">
          {{ item.month }}
        </p>
      </div>
    </div>
  </section>
</template>