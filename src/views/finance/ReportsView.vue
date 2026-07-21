<script setup>
import { Download, FileBarChart } from 'lucide-vue-next'
import { financialReports } from '../../data/reports'
</script>

<template>
  <section>
    <div>
      <p class="text-sm font-medium text-slate-500">Finance management</p>
      <h2 class="mt-1 text-3xl font-bold tracking-tight text-core-950">
        Financial reports
      </h2>
      <p class="mt-3 text-slate-500">
        Access internal financial reporting and operational performance summaries.
      </p>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-3">
      <article
        v-for="report in financialReports"
        :key="report.title"
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <div class="rounded-xl bg-blue-50 p-3 text-core-blue">
            <FileBarChart class="size-5" />
          </div>

          <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {{ report.type }}
          </span>
        </div>

        <h3 class="mt-6 text-lg font-bold text-core-950">{{ report.title }}</h3>
        <p class="mt-3 text-sm leading-6 text-slate-500">{{ report.description }}</p>

        <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
          <span class="text-sm font-medium text-slate-500">{{ report.period }}</span>

          <button
            type="button"
            class="inline-flex items-center gap-2 text-sm font-semibold text-core-blue hover:text-blue-800"
          >
            <Download class="size-4" />
            Export
          </button>
        </div>
      </article>
    </div>

    <p class="mt-8 text-sm text-slate-400">
      Export actions are UI-only in this frontend project.
    </p>
  </section>
</template>