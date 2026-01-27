<script setup lang="ts">
import type { PostQueryResult } from "~/sanity/types";

defineProps<{
  item: PostQueryResult
}>()

const tab = ref<'content' | 'author'>('content')
const contentRef = ref<HTMLButtonElement | null>(null)
const authorRef = ref<HTMLButtonElement | null>(null)
const indicatorWidth = ref(0)
const indicatorLeft = ref(0)

const updateIndicator = () => {
  const activeRef = tab.value === 'content' ? contentRef.value : authorRef.value
  if (activeRef) {
    indicatorWidth.value = activeRef.offsetWidth
    indicatorLeft.value = activeRef.offsetLeft
  }
}

watch(tab, () => {
  nextTick(updateIndicator)
})

onMounted(() => {
  nextTick(updateIndicator)
})
</script>

<template>
  <div class="tab-container" flex items-center justify-center gap8 py6>
    <button
      ref="contentRef"
      class="tab-button"
      :class="{ 'tab-active': tab === 'content' }"
      @click="tab = 'content'"
    >
      {{ ('Content') }}
    </button>
    <button
      ref="authorRef"
      class="tab-button"
      :class="{ 'tab-active': tab === 'author' }"
      @click="tab = 'author'"
    >
      {{ ('Author') }}
    </button>
    <div
      class="tab-indicator"
      :style="{
        width: `${indicatorWidth}px`,
        transform: `translateX(${indicatorLeft}px)`
      }"
    />
  </div>
  <MediaOverview v-if="tab === 'content'" :item="item" />
  <MediaAuthor v-if="tab === 'author'" :item="item.author" />
</template>

<style scoped>
.tab-container {
  position: relative;
}

.tab-button {
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.tab-button.tab-active {
  color: rgba(255, 255, 255, 1);
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: white;
  transition: transform 0.3s ease, width 0.3s ease;
}
</style>
