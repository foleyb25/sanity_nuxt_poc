<script setup lang="ts">
import type { PostQueryResult } from "~/sanity/types";

defineProps<{
  item: PostQueryResult
}>()

const tab = ref<'content' | 'author'>('content')
const slideDirection = ref<'left' | 'right'>('left')
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

const selectTab = (newTab: 'content' | 'author') => {
  if (newTab === tab.value) return
  // Going to author = slide left, going to content = slide right
  slideDirection.value = newTab === 'author' ? 'left' : 'right'
  tab.value = newTab
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
      @click="selectTab('content')"
    >
      {{ ('Content') }}
    </button>
    <button
      ref="authorRef"
      class="tab-button"
      :class="{ 'tab-active': tab === 'author' }"
      @click="selectTab('author')"
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
  <div class="tab-content-wrapper">
    <Transition :name="slideDirection === 'left' ? 'slide-left' : 'slide-right'" mode="out-in">
      <div :key="tab" class="tab-panel">
        <MediaOverview v-if="tab === 'content'" :item="item" />
        <MediaAuthor v-else :item="item.author" />
      </div>
    </Transition>
  </div>
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

.tab-content-wrapper {
  overflow: hidden;
  position: relative;
}

.tab-panel {
  width: 100%;
}
</style>

<style>
/* Slide Left: Content exits right, Author enters from left */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Slide Right: Author exits left, Content enters from right */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
