<script setup>
import { computed, ref } from 'vue'
import { CircleDollarSign } from 'lucide-vue-next'
import StatCard from '../../components/common/StatCard.vue'
import RevenueChart from '../../components/dashboard/RevenueChart.vue'
import TransactionTable from '../../components/finance/TransactionTable.vue'
import { formatCurrency } from '../../composables/useCurrency'
import {
  monthlyRevenue,
  revenueSummary,
  revenueTransactions,
} from '../../data/revenue'

const selectedStatus = ref('All')

const filteredTransactions = computed(() => {
  if (selectedStatus.value === 'All') return revenueTransactions

  return revenueTransactions.filter(
    (transaction) => transaction.status === selectedStatus.value,
  )
})
</script>

<template>
  <section>
    <div>
      <p class="text-sm font-medium text-slate-500">Finance management</p>
      <h2 class="mt-1 text-3xl font-bold tracking-tight text-core-950">Revenue</h2>
    </div>

    <div class="mt-8 max-w-sm">
      <StatCard
        label="July revenue"
        :value="formatCurrency(revenueSummary.currentMonth)"
        :change="revenueSummary.change"
        :icon="CircleDollarSign"
      />
    </div>

    <div class="mt-8">
      <RevenueChart :data="monthlyRevenue" />
    </div>

    <div class="mt-8">
      <div class="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 class="text-xl font-bold text-core-950">Revenue transactions</h3>
          <p class="mt-1 text-sm text-slate-500">Client payments and project income</p>
        </div>

        <select
          v-model="selectedStatus"
          class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-core-blue"
        >
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>

      <TransactionTable :transactions="filteredTransactions" type="revenue" />
    </div>
  </section>
</template>