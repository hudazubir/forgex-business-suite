<script setup>
import { computed, onMounted, ref } from 'vue'
import { Building2, Mail, Phone, ShieldCheck } from 'lucide-vue-next'
import { supabase } from '../lib/supabaseClient'
import CertificatePreview from '../components/profile/CertificatePreview.vue'

const profile = ref(null)
const saved = ref(false)
const saving = ref(false)
const errorMessage = ref('')

const form = ref({
  full_name: '',
  phone: '',
  department: '',
})

const responsibilitiesByRole = {
  CEO: [
    'Set company strategy',
    'Approve business decisions',
    'Review company performance',
    'Lead executive direction',
  ],
  'Finance Manager': [
    'Review financial reports',
    'Manage invoices and expenses',
    'Monitor budgets',
    'Prepare financial forecasts',
  ],
  'Project Manager': [
    'Plan project timelines',
    'Coordinate project teams',
    'Manage client communication',
    'Track delivery progress',
  ],
  Developer: [
    'Build product features',
    'Review code quality',
    'Fix technical issues',
    'Collaborate with project teams',
  ],
}

function getInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function formatJoinedDate(date) {
  return new Intl.DateTimeFormat('en-MY', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

const currentUser = computed(() => {
  const name = profile.value?.full_name || 'User'
  const role = profile.value?.role || 'Team member'

  return {
    initials: getInitials(name),
    name,
    email: profile.value?.email || '',
    role,
    phone: profile.value?.phone || 'Not provided',
    department: profile.value?.department || 'Not assigned',
    joinedDate: profile.value?.created_at
      ? formatJoinedDate(profile.value.created_at)
      : 'Recently',
    responsibilities: responsibilitiesByRole[role] || [
      'Support team operations',
      'Maintain accurate information',
    ],
  }
})

async function loadProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, role, department, phone, created_at')
    .eq('id', user.id)
    .single()

  if (error) {
    errorMessage.value = error.message
    return
  }

  profile.value = {
    ...data,
    email: user.email,
  }

  form.value = {
    full_name: data.full_name || '',
    phone: data.phone || '',
    department: data.department || '',
  }
}

async function saveProfile() {
  saved.value = false
  errorMessage.value = ''
  saving.value = true

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    saving.value = false
    return
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({
      full_name: form.value.full_name,
      phone: form.value.phone,
      department: form.value.department,
    })
    .eq('id', user.id)
    .select('full_name, role, department, phone, created_at')
    .single()

  saving.value = false

  if (error) {
    errorMessage.value = error.message
    return
  }

  profile.value = {
    ...data,
    email: user.email,
  }

  saved.value = true
}

onMounted(loadProfile)
</script>

<template>
  <section>
    <div>
      <p class="text-sm font-medium text-slate-500">Account</p>
      <h2 class="mt-1 text-3xl font-bold tracking-tight text-core-950">
        My profile
      </h2>
      <p class="mt-3 text-slate-500">
        Manage your personal details and internal role information.
      </p>
    </div>

    <div class="mt-8 grid gap-8 xl:grid-cols-3">
      <aside class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="grid size-20 place-items-center rounded-2xl bg-core-blue text-2xl font-bold text-[#ffffff]">
          {{ currentUser.initials }}
        </div>

        <h3 class="mt-5 text-xl font-bold text-core-950">
          {{ currentUser.name }}
        </h3>

        <p class="mt-1 text-sm font-medium text-core-blue">
          {{ currentUser.role }}
        </p>

        <div class="mt-7 space-y-4 border-t border-slate-100 pt-6 text-sm">
          <div class="flex gap-3 text-slate-600">
            <Mail class="mt-0.5 size-4 shrink-0 text-slate-400" />
            {{ currentUser.email }}
          </div>

          <div class="flex gap-3 text-slate-600">
            <Phone class="mt-0.5 size-4 shrink-0 text-slate-400" />
            {{ currentUser.phone }}
          </div>

          <div class="flex gap-3 text-slate-600">
            <Building2 class="mt-0.5 size-4 shrink-0 text-slate-400" />
            {{ currentUser.department }}
          </div>
        </div>
      </aside>

      <div class="space-y-8 xl:col-span-2">
        <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-lg font-bold text-core-950">Profile details</h3>

          <form class="mt-6 grid gap-5 sm:grid-cols-2" @submit.prevent="saveProfile">
            <label>
              <span class="text-sm font-medium text-slate-700">Full name</span>
              <input
                v-model="form.full_name"
                required
                class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
              >
            </label>

            <label>
              <span class="text-sm font-medium text-slate-700">Email address</span>
              <input
                :value="currentUser.email"
                type="email"
                readonly
                class="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-500 outline-none"
              >
              <span class="mt-1 block text-xs text-slate-400">
                Email is managed through authentication.
              </span>
            </label>

            <label>
              <span class="text-sm font-medium text-slate-700">Phone number</span>
              <input
                v-model="form.phone"
                placeholder="+60 12-345 6789"
                class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
              >
            </label>

            <label>
              <span class="text-sm font-medium text-slate-700">Department</span>
              <input
                v-model="form.department"
                placeholder="e.g. Management"
                class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
              >
            </label>

            <div class="sm:col-span-2">
              <button
                type="submit"
                :disabled="saving"
                class="rounded-lg bg-core-blue px-4 py-2.5 text-sm font-semibold text-[#ffffff] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ saving ? 'Saving...' : 'Save changes' }}
              </button>

              <span v-if="saved" class="ml-3 text-sm font-medium text-core-green">
                Profile updated successfully.
              </span>

              <p v-if="errorMessage" class="mt-3 text-sm font-medium text-red-600">
                {{ errorMessage }}
              </p>
            </div>
          </form>
        </section>

        <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="rounded-xl bg-blue-50 p-3 text-core-blue">
              <ShieldCheck class="size-5" />
            </div>

            <div>
              <h3 class="font-bold text-core-950">Role and responsibilities</h3>
              <p class="mt-1 text-sm text-slate-500">
                {{ currentUser.role }} · Joined {{ currentUser.joinedDate }}
              </p>
            </div>
          </div>

          <ul class="mt-6 grid gap-3 sm:grid-cols-2">
            <li
              v-for="responsibility in currentUser.responsibilities"
              :key="responsibility"
              class="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
              {{ responsibility }}
            </li>
          </ul>
        </section>

        <CertificatePreview
          :full-name="currentUser.name"
          :role="currentUser.role"
          :department="currentUser.department"
        />
      </div>
    </div>
  </section>
</template>