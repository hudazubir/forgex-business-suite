<script setup>
import StatusBadge from '../common/StatusBadge.vue'
import { formatCurrency } from '../../composables/useCurrency'

defineProps({
  clients: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[920px] text-left">
        <thead class="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
          <tr>
            <th class="px-6 py-4">Client</th>
            <th class="px-6 py-4">Primary contact</th>
            <th class="px-6 py-4">Contact details</th>
            <th class="px-6 py-4">Projects</th>
            <th class="px-6 py-4">Total value</th>
            <th class="px-6 py-4">Status</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr v-for="client in clients" :key="client.id" class="hover:bg-slate-50">
            <td class="px-6 py-4">
              <p class="font-semibold text-core-950">{{ client.company }}</p>
              <p class="mt-1 text-xs text-slate-500">{{ client.industry }}</p>
            </td>

            <td class="px-6 py-4 text-sm text-slate-700">
              {{ client.contactName }}
            </td>

            <td class="px-6 py-4">
              <a :href="`mailto:${client.email}`" class="block text-sm text-core-blue hover:underline">
                {{ client.email }}
              </a>
              <p class="mt-1 text-xs text-slate-500">{{ client.phone }}</p>
            </td>

            <td class="px-6 py-4 text-sm font-semibold text-core-950">
              {{ client.activeProjects }}
            </td>

            <td class="px-6 py-4 text-sm font-semibold text-core-950">
              {{ formatCurrency(client.totalValue) }}
            </td>

            <td class="px-6 py-4">
              <StatusBadge :status="client.status" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>