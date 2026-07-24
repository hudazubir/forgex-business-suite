<script setup>
import StatusBadge from '../common/StatusBadge.vue'
import { formatCurrency } from '../../composables/useCurrency'

defineProps({
  projects: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[900px] text-left">
        <thead class="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
          <tr>
            <th class="px-6 py-4">Project</th>
            <th class="px-6 py-4">Client</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4">Progress</th>
            <th class="px-6 py-4">Budget</th>
            <th class="px-6 py-4">Deadline</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr v-for="project in projects" :key="project.id" class="hover:bg-slate-50">
            <td class="px-6 py-4">
              <p class="font-semibold text-core-950">{{ project.title }}</p>
              <p class="mt-1 text-xs text-slate-500">{{ project.code }} · {{ project.service }}</p>
            </td>

            <td class="px-6 py-4 text-sm text-slate-700">
              {{ project.client }}
            </td>

            <td class="px-6 py-4">
              <StatusBadge :status="project.status" />
            </td>

            <td class="px-6 py-4">
              <div class="flex min-w-32 items-center gap-3">
                <div class="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    class="h-full rounded-full bg-core-blue"
                    :style="{ width: `${project.progress}%` }"
                  />
                </div>

                <span class="text-sm font-semibold text-slate-600">
                  {{ project.progress }}%
                </span>
              </div>
            </td>

            <td class="px-6 py-4 text-sm font-semibold text-core-950">
              {{ formatCurrency(project.budget) }}
            </td>

            <td class="px-6 py-4 text-sm text-slate-500">
              {{ project.deadline }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>