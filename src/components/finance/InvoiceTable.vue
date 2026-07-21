<script setup>
import StatusBadge from '../common/StatusBadge.vue'
import { formatCurrency } from '../../composables/useCurrency'

defineProps({
  invoices: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[760px] text-left">
        <thead class="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
          <tr>
            <th class="px-6 py-4">Invoice</th>
            <th class="px-6 py-4">Client</th>
            <th class="px-6 py-4">Issued</th>
            <th class="px-6 py-4">Due date</th>
            <th class="px-6 py-4">Amount</th>
            <th class="px-6 py-4">Status</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr v-for="invoice in invoices" :key="invoice.id" class="hover:bg-slate-50">
            <td class="px-6 py-4 text-sm font-semibold text-core-950">
              {{ invoice.id }}
            </td>
            <td class="px-6 py-4 text-sm text-slate-700">{{ invoice.client }}</td>
            <td class="px-6 py-4 text-sm text-slate-500">{{ invoice.issuedDate }}</td>
            <td class="px-6 py-4 text-sm text-slate-500">{{ invoice.dueDate }}</td>
            <td class="px-6 py-4 text-sm font-semibold text-core-950">
              {{ formatCurrency(invoice.amount) }}
            </td>
            <td class="px-6 py-4">
              <StatusBadge :status="invoice.status" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>