<script setup>
import StatusBadge from '../common/StatusBadge.vue'
import { formatCurrency } from '../../composables/useCurrency'

defineProps({
  transactions: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    default: 'revenue',
  },
})
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[720px] text-left">
        <thead class="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
          <tr>
            <th class="px-6 py-4">Reference</th>
            <th class="px-6 py-4">{{ type === 'revenue' ? 'Client' : 'Vendor' }}</th>
            <th class="px-6 py-4">{{ type === 'revenue' ? 'Service' : 'Category' }}</th>
            <th class="px-6 py-4">Date</th>
            <th class="px-6 py-4">Amount</th>
            <th class="px-6 py-4">Status</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr v-for="transaction in transactions" :key="transaction.id" class="hover:bg-slate-50">
            <td class="px-6 py-4 text-sm font-semibold text-core-950">
              {{ transaction.id }}
            </td>

            <td class="px-6 py-4 text-sm text-slate-700">
              {{ transaction.counterparty }}
            </td>

            <td class="px-6 py-4 text-sm text-slate-500">
              {{ transaction.category }}
            </td>

            <td class="px-6 py-4 text-sm text-slate-500">
              {{ transaction.date }}
            </td>

            <td class="px-6 py-4 text-sm font-semibold text-core-950">
              {{ formatCurrency(transaction.amount) }}
            </td>

            <td class="px-6 py-4">
              <StatusBadge :status="transaction.status" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>