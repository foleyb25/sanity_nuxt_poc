<template>
  <NuxtLoadingIndicator />
  <div h-full w-full font-sans grid="~ lt-lg:rows-[1fr_max-content] lg:cols-[max-content_1fr]" of-hidden view-transition-app transition duration-0>
    <!-- NavBar in left column -->
    <NavBar class="row-span-full hidden lg:flex sticky top-24 self-start" />
    <!-- Header (top row of right column) -->
    <Header class="col-start-2" />
    <div id="app-scroller" of-x-hidden of-y-auto relative mt-24>
      <NuxtPage />
    </div>
    
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
