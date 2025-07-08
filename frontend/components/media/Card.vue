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
      block bg-gray4:10 class="aspect-10/16 rounded-2xl overflow-hidden"
      transition duration-400
      hover="scale-105 z10"
    >
    <SanityImage
              v-if="post.coverImage?.asset?._ref"
              class="rounded-t-2xl shadow-md transition-shadow object-cover aspect-16/9"
              :alt="post.coverImage?.alt || ''"
              :asset-id="post.coverImage.asset._ref"
              format
            />
      <div v-else h-full op10 flex>
        <div i-ph:question ma text-4xl />
      </div>
      <div class="p-2">
        <Avatar
          v-if="post.author"
          :person="post.author"
          :date="post.date"
          class="my-2"
        />
        <div mt-2 class="font-bold text-2xl">
          {{ post.title}}
        </div>
        
        <div flex text-sm gap-2 items-center>
          <div mt-2>
            <i>{{ post.excerpt}}</i>
          </div>
        </div>
    </div>
    </div>
    
  </NuxtLink>
</template>
