<script setup>
import { Bell, Menu, Search } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { currentUser } from '../../data/user'

defineEmits(['toggle-sidebar'])

const route = useRoute()

const pageTitle = computed(() => {
  return (route.meta.title || 'Dashboard | ForgeX Core')
    .replace(' | ForgeX Core', '')
})
</script>

<template>
  <header class="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-8">
    <div class="flex items-center gap-4">
      <button
        type="button"
        class="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open navigation"
        @click="$emit('toggle-sidebar')"
      >
        <Menu class="size-6" />
      </button>

      <div>
        <p class="text-sm text-slate-500">ForgeX Digital</p>
        <h1 class="text-xl font-bold text-core-950">{{ pageTitle }}</h1>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button
        type="button"
        class="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 md:flex"
      >
        <Search class="size-4" />
        Search
      </button>

      <button
        type="button"
        class="relative rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 hover:text-core-950"
        aria-label="Notifications"
      >
        <Bell class="size-5" />
        <span class="absolute right-2 top-2 size-2 rounded-full bg-core-red" />
      </button>

      <RouterLink to="/profile" class="grid size-9 place-items-center rounded-full bg-core-blue text-sm font-semibold text-[#ffffff]">
        {{ currentUser.initials }}
      </RouterLink>
    </div>
  </header>
</template>