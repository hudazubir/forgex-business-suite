<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const styles = {
  Paid: 'bg-green-50 text-core-green',
  Approved: 'bg-green-50 text-core-green',
  Pending: 'bg-amber-50 text-core-amber',
  Overdue: 'bg-red-50 text-core-red',
  'In Progress': 'bg-blue-50 text-core-blue',
  Review: 'bg-violet-50 text-violet-700',
  Planning: 'bg-slate-100 text-slate-600',
}

const statusClass = computed(() => {
  const styles = {
    Paid: 'bg-green-50 text-core-green',
    Approved: 'bg-green-50 text-core-green',
    Pending: 'bg-amber-50 text-core-amber',
    Overdue: 'bg-red-50 text-core-red',
    Active: 'bg-green-50 text-core-green',
    Prospect: 'bg-blue-50 text-core-blue',
  }

  return styles[props.status] || 'bg-slate-100 text-slate-600'
})
</script>

<template>
  <span :class="statusClass" class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold">
    {{ status }}
  </span>
</template>