<script setup>
import { computed, ref } from 'vue'
import { FileClock, ReceiptText } from 'lucide-vue-next'
import StatCard from '../../components/common/StatCard.vue'
import InvoiceTable from '../../components/finance/InvoiceTable.vue'
import { formatCurrency } from '../../composables/useCurrency'
import { invoices } from '../../data/invoices'

const selectedStatus = ref('All')

const filteredInvoices = computed(() => {
  if (selectedStatus.value === 'All') return invoices

  return invoices.filter((invoice) => invoice.status === selectedStatus.value)
})

const outstandingAmount = computed(() => {
  return invoices
    .filter((invoice) => invoice.status !== 'Paid')
    .reduce((total, invoice) => total + invoice.amount, 0)
})
</script>

<template>
  <section>
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-sm font-medium text-slate-500">Finance management</p>
        <h2 class="mt-1 text-3xl font-bold tracking-tight text-core-950">Invoices</h2>
      </div>

      <button
        type="button"
        class="rounded-lg bg-core-blue px-4 py-2.5 text-sm font-semibold text-[#ffffff] hover:bg-blue-700"
      >
        Create invoice
      </button>
    </div>

    <div class="mt-8 grid gap-5 sm:grid-cols-2">
      <StatCard
        label="Total invoices"
        :value="String(invoices.length)"
        :change="10.2"
        :icon="ReceiptText"
      />
      <StatCard
        label="Outstanding amount"
        :value="formatCurrency(outstandingAmount)"
        :change="8.6"
        :icon="FileClock"
        :positive="false"
      />
    </div>

    <div class="mt-8">
      <div class="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 class="text-xl font-bold text-core-950">Invoice register</h3>
          <p class="mt-1 text-sm text-slate-500">Track issued, paid, and overdue invoices.</p>
        </div>

        <select
          v-model="selectedStatus"
          class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-core-blue"
        >
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
      </div>

      <InvoiceTable :invoices="filteredInvoices" />
    </div>
  </section>
</template>