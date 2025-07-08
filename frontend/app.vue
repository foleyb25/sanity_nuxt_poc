<template>
  <NuxtLoadingIndicator />
  <div h-full class="w-screen" font-sans grid="~ lt-lg:rows-[1fr_max-content] lg:cols-[max-content_1fr]" of-hidden view-transition-app transition duration-0>
    <!-- Header (top row of right column) -->
    <Header class="col-start-2" />
    <!-- NavBar in left column -->
    <div id="app-scroller" of-x-hidden of-y-auto relative mt-24>
      <NuxtPage />
    </div>
    <NavBar lg:order-first />
    
  </div>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #111;
  color: white;
  color-scheme: dark;
}
</style>
