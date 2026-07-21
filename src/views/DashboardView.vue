<script setup>
import { CircleDollarSign, FolderKanban, ReceiptText, Wallet } from 'lucide-vue-next'
import StatCard from '../components/common/StatCard.vue'
import RevenueChart from '../components/dashboard/RevenueChart.vue'
import ProjectOverview from '../components/dashboard/ProjectOverview.vue'
import RecentActivity from '../components/dashboard/RecentActivity.vue'
import { formatCurrency } from '../composables/useCurrency'
import { recentActivities } from '../data/activities'
import { expenseSummary } from '../data/expenses'
import { projects } from '../data/projects'
import { monthlyRevenue, revenueSummary } from '../data/revenue'
import { useAuthUser } from '../composables/useAuthUser'


const { displayName } = useAuthUser()

const currentDate = new Intl.DateTimeFormat('en-MY', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date())

const profit = revenueSummary.currentMonth - expenseSummary.currentMonth

const stats = [
  {
    label: 'Monthly revenue',
    value: formatCurrency(revenueSummary.currentMonth),
    change: revenueSummary.change,
    icon: CircleDollarSign,
    positive: true,
  },
  {
    label: 'Monthly expenses',
    value: formatCurrency(expenseSummary.currentMonth),
    change: expenseSummary.change,
    icon: Wallet,
    positive: false,
  },
  {
    label: 'Net profit',
    value: formatCurrency(profit),
    change: 18.4,
    icon: ReceiptText,
    positive: true,
  },
  {
    label: 'Active projects',
    value: String(projects.filter((project) => project.status === 'In Progress').length),
    change: 14,
    icon: FolderKanban,
    positive: true,
  },
]
</script>

<template>
  <section>
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-sm font-medium text-slate-500">{{ currentDate }}</p>
        <h2 class="mt-1 text-3xl font-bold tracking-tight text-core-950">
          Good morning, {{ displayName }}
        </h2>
      </div>

      <RouterLink
        to="/finance/invoices"
        class="inline-flex rounded-lg bg-core-blue px-4 py-2.5 text-sm font-semibold text-[#ffffff] hover:bg-blue-700"
      >
        View invoices
      </RouterLink>
    </div>

    <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        v-for="stat in stats"
        :key="stat.label"
        v-bind="stat"
      />
    </div>

    <div class="mt-8 grid gap-8 xl:grid-cols-5">
      <div class="xl:col-span-3">
        <RevenueChart :data="monthlyRevenue" />
      </div>

      <div class="xl:col-span-2">
        <RecentActivity :activities="recentActivities" />
      </div>
    </div>

    <div class="mt-8">
      <ProjectOverview :projects="projects" />
    </div>
  </section>
</template>