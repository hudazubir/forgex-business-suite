<template>
    <div class="grid min-h-screen bg-slate-100 lg:grid-cols-2">
      <section class="hidden bg-core-950 p-12 lg:flex lg:flex-col lg:justify-between">
        <div class="flex items-center gap-3">
          <span class="grid size-10 place-items-center rounded-lg bg-core-blue font-bold text-[#ffffff]">
            F
          </span>
  
          <div>
            <p class="text-lg font-bold text-white">ForgeX Core</p>
            <p class="text-sm text-slate-400">Business Suite</p>
          </div>
        </div>
  
        <div>
          <p class="text-sm font-semibold tracking-[0.18em] text-core-cyan uppercase">
            Internal operations platform
          </p>
  
          <h1 class="mt-5 max-w-lg text-5xl font-bold leading-tight text-white">
            Clarity for every important business decision.
          </h1>
  
          <p class="mt-6 max-w-md leading-7 text-slate-400">
            Manage finances, projects, clients, and operational performance from one secure internal workspace.
          </p>
        </div>
  
        <p class="text-sm text-slate-500">© 2026 ForgeX Digital</p>
      </section>
  
      <main class="grid place-items-center p-6 sm:p-10">
        <RouterView />
      </main>
    </div>
  </template>