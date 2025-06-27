<script setup lang="ts">
import type { BlockContent, PostsQueryResult, Post } from '~/sanity/types'

const props = defineProps<{
  query: PostsQueryResult | null
}>()
</script>

<template>
  <CarouselBase>
    <template #title>
      {{ $t("Popular Movies") }}
    </template>
    <template #more>
      <NuxtLink :to="`/category/`" n-link>
        {{ $t('Explore more') }}
      </NuxtLink>
    </template>
    <MediaCard
      v-for="post of query || []"
      :key="post._id"
      :post="post"
      flex-1 w-40 md:w-60
    />
  </CarouselBase>
</template>
