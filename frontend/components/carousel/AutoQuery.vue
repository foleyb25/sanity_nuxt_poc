<script setup lang="ts">
import type { BlockContent, PostsQueryResult, Post } from '~/sanity/types'

const props = defineProps<{
  query: PostsQueryResult | null
}>()
</script>

<template>
  <CarouselBase>
    <MediaCard
      v-for="post of query || []"
      :key="post._id"
      :post="post"
      flex-1 w-40 md:w-60
    />
  </CarouselBase>
</template>
