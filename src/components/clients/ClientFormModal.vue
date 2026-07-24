<script setup>
import { reactive, ref } from 'vue'
import { X } from 'lucide-vue-next'
import { supabase } from '../../lib/supabaseClient'

defineProps({
  open: Boolean,
})

const emit = defineEmits(['close', 'saved'])

const saving = ref(false)
const errorMessage = ref('')

const form = reactive({
  company_name: '',
  industry: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  website: '',
  status: 'Active',
  lifetime_value: 0,
})

function resetForm() {
  form.company_name = ''
  form.industry = ''
  form.contact_name = ''
  form.contact_email = ''
  form.contact_phone = ''
  form.website = ''
  form.status = 'Active'
  form.lifetime_value = 0
  errorMessage.value = ''
}

function close() {
  if (saving.value) return

  resetForm()
  emit('close')
}

async function saveClient() {
  saving.value = true
  errorMessage.value = ''

  const { error } = await supabase
    .from('clients')
    .insert({
      company_name: form.company_name,
      industry: form.industry,
      contact_name: form.contact_name,
      contact_email: form.contact_email,
      contact_phone: form.contact_phone || null,
      website: form.website || null,
      status: form.status,
      lifetime_value: form.lifetime_value || 0,
    })

  saving.value = false

  if (error) {
    errorMessage.value = error.message
    return
  }

  resetForm()
  emit('saved')
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4"
      @click.self="close"
    >
      <section class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-slate-500">Client management</p>
            <h3 class="mt-1 text-xl font-bold text-core-950">Add new client</h3>
          </div>

          <button
            type="button"
            class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
            @click="close"
          >
            <X class="size-5" />
          </button>
        </div>

        <form class="mt-6 grid gap-5 sm:grid-cols-2" @submit.prevent="saveClient">
          <label class="sm:col-span-2">
            <span class="text-sm font-medium text-slate-700">Company name</span>
            <input
              v-model="form.company_name"
              required
              class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
            >
          </label>

          <label>
            <span class="text-sm font-medium text-slate-700">Industry</span>
            <input
              v-model="form.industry"
              required
              placeholder="e.g. Healthcare"
              class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
            >
          </label>

          <label class="relative block">
            <span class="text-sm font-medium text-slate-700">Status</span>
            <div class="relative mt-2">
                <select
                v-model="form.status"
                class="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-10 text-slate-700 outline-none focus:border-core-blue"
                >
                <option>Active</option>
                <option>Prospect</option>
                <option>Inactive</option>
                </select>
                <!-- custom chevron icon -->
                <svg
                class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            </label>

          <label>
            <span class="text-sm font-medium text-slate-700">Contact name</span>
            <input
              v-model="form.contact_name"
              required
              class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
            >
          </label>

          <label>
            <span class="text-sm font-medium text-slate-700">Contact email</span>
            <input
              v-model="form.contact_email"
              required
              type="email"
              class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
            >
          </label>

          <label>
            <span class="text-sm font-medium text-slate-700">Phone number</span>
            <input
              v-model="form.contact_phone"
              placeholder="+60 12-345 6789"
              class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
            >
          </label>

          <label>
            <span class="text-sm font-medium text-slate-700">Website</span>
            <input
              v-model="form.website"
              type="url"
              placeholder="https://example.com"
              class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
            >
          </label>

          <label class="sm:col-span-2">
            <span class="text-sm font-medium text-slate-700">
              Client portfolio value (RM)
            </span>
            <input
              v-model.number="form.lifetime_value"
              min="0"
              type="number"
              class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
            >
          </label>

          <p v-if="errorMessage" class="sm:col-span-2 text-sm font-medium text-red-600">
            {{ errorMessage }}
          </p>

          <div class="flex justify-end gap-3 border-t border-slate-100 pt-5 sm:col-span-2">
            <button
              type="button"
              class="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              @click="close"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="saving"
              class="rounded-lg bg-core-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ saving ? 'Saving...' : 'Save client' }}
            </button>
          </div>
        </form>
      </section>
    </div>
  </Teleport>
</template>