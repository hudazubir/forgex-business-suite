<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  CircleDollarSign,
  Clock3,
  FolderKanban,
  ListChecks,
} from 'lucide-vue-next'
import StatCard from '../../components/common/StatCard.vue'
import ProjectTable from '../../components/projects/ProjectTable.vue'
import { formatCurrency } from '../../composables/useCurrency'
import { supabase } from '../../lib/supabaseClient'

const databaseProjects = ref([])
const selectedStatus = ref('All')
const loading = ref(true)
const errorMessage = ref('')

function formatDate(date) {
  if (!date) return 'Not set'

  return new Intl.DateTimeFormat('en-MY', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

async function loadProjects() {
  loading.value = true
  errorMessage.value = ''

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      clients (
        company_name
      )
    `)
    .order('created_at', { ascending: false })

  loading.value = false

  if (error) {
    errorMessage.value = error.message
    return
  }

  databaseProjects.value = data
}

/*
  Map Supabase column names into names ProjectTable.vue
  is likely already using.
*/
const projects = computed(() => {
  return databaseProjects.value.map((project) => ({
    ...project,
    code: project.project_code,
    client: project.clients?.company_name || 'Unassigned client',
    clientName: project.clients?.company_name || 'Unassigned client',
    service: project.service_type,
    manager: project.project_manager || 'Not assigned',
    budget: Number(project.budget),
    deadline: formatDate(project.end_date),
    endDate: formatDate(project.end_date),
    startDate: formatDate(project.start_date),
  }))
})

const filteredProjects = computed(() => {
  if (selectedStatus.value === 'All') return projects.value

  return projects.value.filter(
    (project) => project.status === selectedStatus.value,
  )
})

const totalBudget = computed(() => {
  return projects.value.reduce(
    (total, project) => total + project.budget,
    0,
  )
})

const activeProjects = computed(() => {
  return projects.value.filter(
    (project) => project.status === 'In Progress',
  ).length
})

const dueThisMonth = computed(() => {
  const today = new Date()

  return databaseProjects.value.filter((project) => {
    if (!project.end_date || project.status === 'Completed') return false

    const endDate = new Date(`${project.end_date}T00:00:00`)

    return (
      endDate.getMonth() === today.getMonth() &&
      endDate.getFullYear() === today.getFullYear()
    )
  }).length
})

onMounted(loadProjects)
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
        :value="String(dueThisMonth)"
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
          <option>Planning</option>
          <option>In Progress</option>
          <option>On Hold</option>
          <option>Completed</option>
        </select>
      </div>

      <p
        v-if="loading"
        class="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500"
      >
        Loading projects...
      </p>

      <p
        v-else-if="errorMessage"
        class="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600"
      >
        Unable to load projects: {{ errorMessage }}
      </p>

      <ProjectTable v-else :projects="filteredProjects" />
    </div>
  </section>
</template>