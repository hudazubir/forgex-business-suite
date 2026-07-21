<script setup>
import { ref } from 'vue'
import { Building2, Mail, Phone, ShieldCheck } from 'lucide-vue-next'
import { currentUser } from '../data/user'

const saved = ref(false)

function saveProfile() {
  saved.value = true
}
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

        <h3 class="mt-5 text-xl font-bold text-core-950">{{ currentUser.name }}</h3>
        <p class="mt-1 text-sm font-medium text-core-blue">{{ currentUser.role }}</p>

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
                :value="currentUser.name"
                class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
              >
            </label>

            <label>
              <span class="text-sm font-medium text-slate-700">Email address</span>
              <input
                :value="currentUser.email"
                type="email"
                class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
              >
            </label>

            <label>
              <span class="text-sm font-medium text-slate-700">Phone number</span>
              <input
                :value="currentUser.phone"
                class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
              >
            </label>

            <label>
              <span class="text-sm font-medium text-slate-700">Department</span>
              <input
                :value="currentUser.department"
                class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-700 outline-none focus:border-core-blue"
              >
            </label>

            <div class="sm:col-span-2">
              <button
                type="submit"
                class="rounded-lg bg-core-blue px-4 py-2.5 text-sm font-semibold text-[#ffffff] hover:bg-blue-700"
              >
                Save changes
              </button>

              <span v-if="saved" class="ml-3 text-sm font-medium text-core-green">
                Demo changes saved.
              </span>
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
      </div>
    </div>
  </section>
</template>