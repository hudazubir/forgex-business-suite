<script setup>
import { computed, ref } from 'vue'
import { Wallet } from 'lucide-vue-next'
import StatCard from '../../components/common/StatCard.vue'
import FinanceBreakdown from '../../components/finance/FinanceBreakdown.vue'
import TransactionTable from '../../components/finance/TransactionTable.vue'
import { formatCurrency } from '../../composables/useCurrency'
import { expenseSummary, expenseTransactions } from '../../data/expenses'
import { expenseBreakdown } from '../../data/finance'

const selectedStatus = ref('All')

const filteredTransactions = computed(() => {
  if (selectedStatus.value === 'All') return expenseTransactions

  return expenseTransactions.filter(
    (transaction) => transaction.status === selectedStatus.value,
  )
})
</script>

<template>
  <section>
    <div>
      <p class="text-sm font-medium text-slate-500">Finance management</p>
      <h2 class="mt-1 text-3xl font-bold tracking-tight text-core-950">Expenses</h2>
    </div>

    <div class="mt-8 max-w-sm">
      <StatCard
        label="July expenses"
        :value="formatCurrency(expenseSummary.currentMonth)"
        :change="expenseSummary.change"
        :icon="Wallet"
        :positive="false"
      />
    </div>

    <div class="mt-8">
      <FinanceBreakdown
        title="Expenses by category"
        description="Current month operating expenses"
        :items="expenseBreakdown"
        color-class="bg-core-amber"
      />
    </div>

    <div class="mt-8">
      <div class="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 class="text-xl font-bold text-core-950">Expense transactions</h3>
          <p class="mt-1 text-sm text-slate-500">Operating costs and purchases</p>
        </div>

        <select
          v-model="selectedStatus"
          class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-core-blue"
        >
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
        </select>
      </div>

      <TransactionTable :transactions="filteredTransactions" type="expense" />
    </div>
  </section>
</template>