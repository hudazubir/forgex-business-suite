<script setup>
import { CircleDollarSign, FileClock, ReceiptText, Wallet } from 'lucide-vue-next'
import StatCard from '../../components/common/StatCard.vue'
import RevenueChart from '../../components/dashboard/RevenueChart.vue'
import FinanceBreakdown from '../../components/finance/FinanceBreakdown.vue'
import { formatCurrency } from '../../composables/useCurrency'
import { expenseSummary } from '../../data/expenses'
import {
  expenseBreakdown,
  financeOverview,
  revenueBreakdown,
} from '../../data/finance'
import { monthlyRevenue, revenueSummary } from '../../data/revenue'

const stats = [
  {
    label: 'Revenue',
    value: formatCurrency(revenueSummary.currentMonth),
    change: revenueSummary.change,
    icon: CircleDollarSign,
    positive: true,
  },
  {
    label: 'Expenses',
    value: formatCurrency(expenseSummary.currentMonth),
    change: expenseSummary.change,
    icon: Wallet,
    positive: false,
  },
  {
    label: 'Net profit',
    value: formatCurrency(financeOverview.profit),
    change: financeOverview.profitChange,
    icon: ReceiptText,
    positive: true,
  },
  {
    label: 'Outstanding invoices',
    value: formatCurrency(financeOverview.outstandingInvoices),
    change: financeOverview.outstandingChange,
    icon: FileClock,
    positive: false,
  },
]
</script>

<template>
  <section>
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-sm font-medium text-slate-500">Financial management</p>
        <h2 class="mt-1 text-3xl font-bold tracking-tight text-core-950">
          Finance overview
        </h2>
      </div>

      <RouterLink
        to="/finance/reports"
        class="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-core-blue hover:text-core-blue"
      >
        View reports
      </RouterLink>
    </div>

    <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        v-for="stat in stats"
        :key="stat.label"
        v-bind="stat"
      />
    </div>

    <div class="mt-8">
      <RevenueChart :data="monthlyRevenue" />
    </div>

    <div class="mt-8 grid gap-8 xl:grid-cols-2">
      <FinanceBreakdown
        title="Revenue by service"
        description="Current month revenue contribution"
        :items="revenueBreakdown"
        color-class="bg-core-blue"
      />

      <FinanceBreakdown
        title="Expenses by category"
        description="Current month operating expenses"
        :items="expenseBreakdown"
        color-class="bg-core-amber"
      />
    </div>
  </section>
</template>