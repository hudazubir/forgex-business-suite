<script setup>
import { X } from 'lucide-vue-next'
import { currentUser } from '../../data/user'
import {
  financeNavigation,
  mainNavigation,
  workspaceNavigation,
} from '../../data/navigation'

defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
    @click="emit('close')"
  />

  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-core-950 transition-transform duration-200 lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <div class="flex h-20 items-center justify-between border-b border-white/10 px-6">
      <RouterLink to="/" class="flex items-center gap-3" @click="emit('close')">
        <span class="grid size-9 place-items-center rounded-lg bg-core-blue font-bold text-[#ffffff]">
          F
        </span>

        <div>
          <p class="font-bold text-white">ForgeX Core</p>
          <p class="text-xs text-slate-400">Business Suite</p>
        </div>
      </RouterLink>

      <button
        type="button"
        class="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
        aria-label="Close navigation"
        @click="emit('close')"
      >
        <X class="size-5" />
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto px-4 py-6">
      <div class="space-y-1">
        <RouterLink
          v-for="item in mainNavigation"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
          active-class="!bg-core-blue !text-white"
          exact-active-class="!bg-core-blue !text-white"
          @click="emit('close')"
        >
          <component :is="item.icon" class="size-5" />
          {{ item.label }}
        </RouterLink>
      </div>

      <div class="mt-8">
        <p class="px-3 text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
          Finance
        </p>

        <div class="mt-3 space-y-1">
          <RouterLink
            v-for="item in financeNavigation"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
            active-class="!bg-core-blue !text-white"
            exact-active-class="!bg-core-blue !text-white"
            @click="emit('close')"
          >
            <component :is="item.icon" class="size-5" />
            {{ item.label }}
          </RouterLink>
        </div>
      </div>

      <div class="mt-8">
        <p class="px-3 text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
          Workspace
        </p>

        <div class="mt-3 space-y-1">
          <RouterLink
            v-for="item in workspaceNavigation"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
            active-class="!bg-core-blue !text-white"
            exact-active-class="!bg-core-blue !text-white"
            @click="emit('close')"
          >
            <component :is="item.icon" class="size-5" />
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </nav>

    <RouterLink
      to="/profile"
      class="m-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
      @click="emit('close')"
    >
      <span class="grid size-10 place-items-center rounded-full bg-core-blue font-semibold text-[#ffffff]">
        {{ currentUser.initials }}
      </span>

      <div class="min-w-0">
        <p class="truncate text-sm font-semibold text-white">{{ currentUser.name }}</p>
        <p class="truncate text-xs text-slate-400">{{ currentUser.role }}</p>
      </div>
    </RouterLink>
  </aside>
</template>