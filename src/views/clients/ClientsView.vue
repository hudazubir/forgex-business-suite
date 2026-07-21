<script setup>
import { computed, ref } from 'vue'
import { Building2, CircleDollarSign, FolderKanban, UserRound } from 'lucide-vue-next'
import StatCard from '../../components/common/StatCard.vue'
import ClientTable from '../../components/clients/ClientTable.vue'
import { formatCurrency } from '../../composables/useCurrency'
import { clients } from '../../data/clients'

const searchQuery = ref('')

const filteredClients = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  if (!query) return clients

  return clients.filter((client) => {
    return [
      client.company,
      client.industry,
      client.contactName,
      client.email,
    ].some((value) => value.toLowerCase().includes(query))
  })
})

const totalClientValue = computed(() => {
  return clients.reduce((total, client) => total + client.totalValue, 0)
})

const activeClients = computed(() => {
  return clients.filter((client) => client.status === 'Active').length
})

const activeProjects = computed(() => {
  return clients.reduce((total, client) => total + client.activeProjects, 0)
})
</script>

<template>
  <section>
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-sm font-medium text-slate-500">Workspace</p>
        <h2 class="mt-1 text-3xl font-bold tracking-tight text-core-950">
          Clients
        </h2>
        <p class="mt-3 text-slate-500">
          Manage client relationships, contacts, and project history.
        </p>
      </div>

      <button
        type="button"
        class="rounded-lg bg-core-blue px-4 py-2.5 text-sm font-semibold text-[#ffffff] hover:bg-blue-700"
      >
        Add client
      </button>
    </div>

    <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total clients"
        :value="String(clients.length)"
        :change="11.1"
        :icon="Building2"
      />
      <StatCard
        label="Active clients"
        :value="String(activeClients)"
        :change="8.3"
        :icon="UserRound"
      />
      <StatCard
        label="Active projects"
        :value="String(activeProjects)"
        :change="14"
        :icon="FolderKanban"
      />
      <StatCard
        label="Client portfolio value"
        :value="formatCurrency(totalClientValue)"
        :change="16.5"
        :icon="CircleDollarSign"
      />
    </div>

    <div class="mt-8">
      <div class="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 class="text-xl font-bold text-core-950">Client directory</h3>
          <p class="mt-1 text-sm text-slate-500">Search and review client information.</p>
        </div>

        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search clients..."
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-core-blue sm:w-64"
        >
      </div>

      <ClientTable :clients="filteredClients" />
    </div>
  </section>
</template>