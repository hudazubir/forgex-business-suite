<script setup>
import { computed, ref } from 'vue'
import { CircleDollarSign, Clock3, FolderKanban, ListChecks } from 'lucide-vue-next'
import StatCard from '../../components/common/StatCard.vue'
import ProjectTable from '../../components/projects/ProjectTable.vue'
import { formatCurrency } from '../../composables/useCurrency'
import { projects } from '../../data/projects'

const selectedStatus = ref('All')

const filteredProjects = computed(() => {
  if (selectedStatus.value === 'All') return projects

  return projects.filter((project) => project.status === selectedStatus.value)
})

const totalBudget = computed(() => {
  return projects.reduce((total, project) => total + project.budget, 0)
})

const activeProjects = computed(() => {
  return projects.filter((project) => project.status === 'In Progress').length
})
</script>

<template>
  <section>
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-sm font-medium text-slate-500">Workspace</p>
        <h2 class="mt-1 text-3xl font-bold tracking-tight text-core-950">
          Projects
        </h2>
        <p class="mt-3 text-slate-500">
          Track delivery status, budgets, timelines, and client engagements.
        </p>
      </div>

      <button
        type="button"
        class="rounded-lg bg-core-blue px-4 py-2.5 text-sm font-semibold text-[#ffffff] hover:bg-blue-700"
      >
        Create project
      </button>
    </div>

    <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total projects"
        :value="String(projects.length)"
        :change="14"
        :icon="FolderKanban"
      />
      <StatCard
        label="In progress"
        :value="String(activeProjects)"
        :change="8"
        :icon="ListChecks"
      />
      <StatCard
        label="Portfolio budget"
        :value="formatCurrency(totalBudget)"
        :change="11.6"
        :icon="CircleDollarSign"
      />
      <StatCard
        label="Due this month"
        value="2"
        :change="20"
        :icon="Clock3"
        :positive="false"
      />
    </div>

    <div class="mt-8">
      <div class="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 class="text-xl font-bold text-core-950">Project portfolio</h3>
          <p class="mt-1 text-sm text-slate-500">Active and planned ForgeX client engagements.</p>
        </div>

        <select
          v-model="selectedStatus"
          class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-core-blue"
        >
          <option>All</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Planning</option>
        </select>
      </div>

      <ProjectTable :projects="filteredProjects" />
    </div>
  </section>
</template>