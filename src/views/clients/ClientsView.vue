<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  Building2,
  CircleDollarSign,
  FolderKanban,
  UserRound,
} from 'lucide-vue-next'
import StatCard from '../../components/common/StatCard.vue'
import ClientTable from '../../components/clients/ClientTable.vue'
import { formatCurrency } from '../../composables/useCurrency'
import { supabase } from '../../lib/supabaseClient'
import ClientFormModal from '../../components/clients/ClientFormModal.vue'

const databaseClients = ref([])
const searchQuery = ref('')
const loading = ref(true)
const errorMessage = ref('')

const isClientFormOpen = ref(false)

async function handleClientSaved() {
  await loadClients()
}

async function loadClients() {
  loading.value = true
  errorMessage.value = ''

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('company_name')

  loading.value = false

  if (error) {
    errorMessage.value = error.message
    return
  }

  databaseClients.value = data
}

/*
  This converts Supabase column names such as company_name
  into the existing names expected by ClientTable.vue.
*/
const clients = computed(() => {
  return databaseClients.value.map((client) => ({
    ...client,
    company: client.company_name,
    contactName: client.contact_name,
    email: client.contact_email,
    phone: client.contact_phone,
    totalValue: Number(client.lifetime_value),
    activeProjects: 0,
    initials: client.company_name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  }))
})

const filteredClients = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  if (!query) return clients.value

  return clients.value.filter((client) => {
    return [
      client.company,
      client.industry,
      client.contactName,
      client.email,
    ].some((value) => value.toLowerCase().includes(query))
  })
})

const totalClientValue = computed(() => {
  return clients.value.reduce(
    (total, client) => total + client.totalValue,
    0,
  )
})

const activeClients = computed(() => {
  return clients.value.filter((client) => client.status === 'Active').length
})

const activeProjects = computed(() => {
  return clients.value.reduce(
    (total, client) => total + client.activeProjects,
    0,
  )
})

onMounted(loadClients)
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

      <!-- <button
        type="button"
        class="rounded-lg bg-core-blue px-4 py-2.5 text-sm font-semibold text-[#ffffff] hover:bg-blue-700"
      >
        Add client
      </button> -->

      <button
        type="button"
        class="rounded-lg bg-core-blue px-4 py-2.5 text-sm font-semibold text-[#ffffff] hover:bg-blue-700"
        @click="isClientFormOpen = true"
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

      <p v-if="loading" class="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Loading clients...
      </p>

      <p v-else-if="errorMessage" class="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        Unable to load clients: {{ errorMessage }}
      </p>

      <ClientTable v-else :clients="filteredClients" />
    </div>

    <ClientFormModal
      :open="isClientFormOpen"
      @close="isClientFormOpen = false"
      @saved="handleClientSaved"
    />
  </section>
</template>