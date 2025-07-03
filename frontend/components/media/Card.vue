<script setup lang="ts">
import type { Post } from '~/sanity/types'

defineProps<{
  post: Post
}>()
</script>

<template>
  
  <NuxtLink
    :to="`/posts/${post.slug.current}`"
  >
    <div
      block bg-gray4:10 p1 class="aspect-10/16"
      transition duration-400
      hover="scale-105 z10"
    >
    <div class="bg-red">{{ post.coverImage }}</div>
    <SanityImage
              v-if="post.coverImage?.asset?._ref"
              class="rounded-2xl shadow-md transition-shadow object-cover"
              :alt="post.coverImage?.alt || ''"
              :asset-id="post.coverImage.asset._ref"
              auto=""
              format
            />
      <div v-else h-full op10 flex>
        <div i-ph:question ma text-4xl />
      </div>
    </div>
    <div mt-2>
      {{ post.title}}
    </div>
    <div flex text-sm gap-2 items-center>
      <div mt-2>
      {{ post.excerpt}}
    </div>
    </div>
  </NuxtLink>
</template>
