<template>
    <main class="grid min-h-screen place-items-center bg-slate-100 p-6 text-center">
      <div class="max-w-md">
        <p class="text-sm font-semibold tracking-[0.18em] text-core-blue uppercase">
          Error 404
        </p>
  
        <h1 class="mt-4 text-4xl font-bold text-core-950">
          Page not found
        </h1>
  
        <p class="mt-4 leading-7 text-slate-500">
          The page you requested does not exist or may have moved.
        </p>
  
        <RouterLink
          to="/"
          class="mt-8 inline-flex rounded-lg bg-core-blue px-5 py-3 font-semibold text-[#ffffff] hover:bg-blue-700"
        >
          Return to dashboard
        </RouterLink>
      </div>
    </main>
  </template>