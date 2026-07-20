<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const statusClass = computed(() => {
  const styles = {
    Paid: 'bg-green-50 text-core-green',
    Approved: 'bg-green-50 text-core-green',
    Pending: 'bg-amber-50 text-core-amber',
    Overdue: 'bg-red-50 text-core-red',
  }

  return styles[props.status] || 'bg-slate-100 text-slate-600'
})
</script>

<template>
  <span :class="statusClass" class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold">
    {{ status }}
  </span>
</template>