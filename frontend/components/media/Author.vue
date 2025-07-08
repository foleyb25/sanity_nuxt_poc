<script setup lang="ts">
import type { Person } from "~/sanity/types";

defineProps<{
  item: Person
}>()
</script>

<template>
  <div flex="~ col" px4 md:px14 py4 gap6>
    <div flex="~ col items-center" px4 md:px14 py4 gap6>
      <div v-if="item.picture" class=" h-50 w-50">
      <SanityImage
        :asset-id="item.picture"
        auto="format"
        class="h-full rounded-full object-cover"
        :alt="`${item.firstName} ${item.lastName}`"
      />
      </div>
      <h2 id="Name" class="text-2xl">{{ item.firstName }} {{ item.nickName ? "'"+item.nickName+"'" : null }} {{ item.lastName }}</h2>
      <div id="SocialLinks" gap3 class="flex flex-row">
        <a v-if="item.instagram" :href="'https://instagram.com/'+item.instagram" target="_blank"><div class="i-ph-instagram-logo"></div></a>
        <a v-if="item.snapchat" :href="'https://snapchat.com/@'+item.snapchat" target="_blank"><div class="i-ph-snapchat-logo"></div></a>
        <a v-if="item.github" :href="'https://github.com/'+item.github" target="_blank"><div class="i-ph-github-logo"></div></a>
      </div>
      <q id="Quote" class="italic"> {{ item.quote }} </q>
    </div>
   
    <hr>
    <div id="Bio">{{ item.bio }}</div>
    <hr>
    
    
  </div>
</template>
