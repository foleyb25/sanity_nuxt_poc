<template>
  <div h-full w-full font-sans grid="~ lt-lg:rows-[1fr_max-content] lg:cols-[max-content_1fr]" of-hidden view-transition-app transition duration-0>
    <section id="app-scroller" of-x-hidden of-y-auto relative>
      
      <NavBar lg:order-first />
      <main class=""><slot /></main>
      <Footer />
    </section>
  </div>
  <Toast />
</template>
