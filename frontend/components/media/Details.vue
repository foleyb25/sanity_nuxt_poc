<script setup lang="ts">
import type { PostQueryResult } from "~/sanity/types";

defineProps<{
  item: PostQueryResult
}>()

const tab = ref<'overview' | 'author'>('content')
</script>

<template>
  <div flex items-center justify-center gap8 py6>
    <button n-tab :class="{ 'n-tab-active': tab === 'content' }" @click="tab = 'overview'">
      {{ ('Content') }}
    </button>
    <button n-tab :class="{ 'n-tab-active': tab === 'author' }" @click="tab = 'author'">
      {{ ('Author') }}
    </button>
  </div>
  <MediaOverview v-if="tab === 'content'" :item="item" />
  <MediaAuthor v-if="tab === 'author'" :item="item" />

  
</template>
