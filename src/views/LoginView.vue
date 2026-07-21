<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('daniel.rahman@forgexdigital.com')
const password = ref('')

function signIn() {
  sessionStorage.setItem('forgex-authenticated', 'true')
  router.push('/')
}
</script>

<template>
  <section class="w-full max-w-md">
    <div class="mb-10 lg:hidden">
      <div class="flex items-center gap-3">
        <span class="grid size-10 place-items-center rounded-lg bg-core-blue font-bold text-[#ffffff]">
          F
        </span>

        <div>
          <p class="text-lg font-bold text-core-950">ForgeX Core</p>
          <p class="text-sm text-slate-500">Business Suite</p>
        </div>
      </div>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
      <p class="text-sm font-semibold tracking-[0.16em] text-core-blue uppercase">
        Welcome back
      </p>

      <h1 class="mt-3 text-3xl font-bold text-core-950">
        Sign in to ForgeX Core
      </h1>

      <p class="mt-3 text-sm leading-6 text-slate-500">
        Use the demo form to enter the internal business suite.
      </p>

      <form class="mt-8 space-y-5" @submit.prevent="signIn">
        <label class="block">
          <span class="text-sm font-medium text-slate-700">Work email</span>
          <input
            v-model="email"
            required
            type="email"
            class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-800 outline-none focus:border-core-blue"
          >
        </label>

        <label class="block">
          <span class="text-sm font-medium text-slate-700">Password</span>
          <input
            v-model="password"
            required
            type="password"
            class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-800 outline-none focus:border-core-blue"
            placeholder="Enter any password"
          >
        </label>

        <button
          type="submit"
          class="w-full rounded-lg bg-core-blue px-4 py-3 font-semibold text-[#ffffff] transition hover:bg-blue-700"
        >
          Sign in
        </button>
      </form>

      <p class="mt-6 text-center text-xs leading-5 text-slate-400">
        Demo authentication only. No account validation or data is stored.
      </p>
    </div>
  </section>
</template>