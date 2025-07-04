<script setup lang="ts">
import type { PostQueryResult } from "~/sanity/types";

defineProps<{
  item: PostQueryResult
}>()
</script>

<template>
  <div class="max-w-3xl flex gap-4 items-center mb-8">
            <Avatar
              v-if="item.author"
              :person="item.author"
              :date="item.date"
            />
          </div>
  <div class=" prose prose-a:text-red-500 max-w-2xl" v-if="item?.content">
    <PortableContent :content="item?.content" />
  </div>
</template>
