<template>
  <div
    flex="~ row lg:col"
    justify-evenly items-center
    py5 lg:px5
    border="t lg:r base"
    bg-black
  >
    <NuxtLink v-slot="{ isActive }" to="/" :title="('Home')">
      <div
        text-2xl
        :class="isActive ? 'i-ph-house-fill text-primary' : 'i-ph-house'"
      />
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/blog" :title="('Search')">
      <div
        text-2xl
        :class="isActive ? 'i-ph-magnifying-glass-fill text-primary' : 'i-ph-magnifying-glass'"
      />
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/shop" :title="('Shop')">
      <div
        text-2xl
        :class="isActive ? 'i-ph-shopping-cart-simple-fill text-primary' :  'i-ph-shopping-cart-simple'"
      />
    </NuxtLink>
    
  </div>
</template>
