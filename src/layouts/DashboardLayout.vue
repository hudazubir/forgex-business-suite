<script setup>
import { ref } from 'vue'
import SidebarNavigation from '../components/navigation/SidebarNavigation.vue'
import TopBar from '../components/navigation/TopBar.vue'

const isSidebarOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <SidebarNavigation
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
    />

    <div class="lg:pl-72">
      <TopBar @toggle-sidebar="isSidebarOpen = true" />

      <main class="p-5 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>