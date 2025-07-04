<script setup lang="ts">
import type { Media } from '~/types'
import { formatTime } from '~/composables/utils'
import type { PostQueryResult } from "~/sanity/types";

const props = withDefaults(defineProps<{
  item: PostQueryResult
}>(), {
  item: () => ({} as PostQueryResult),
})

const trailer = computed(() => getTrailer(props.item))

const showModal = useIframeModal()
function playTrailer() {
  if (trailer.value)
    showModal(trailer.value)
}

const mounted = useMounted()
</script>

<template>

  <div :key="item._id" relative class="aspect-ratio-3/2 lg:aspect-ratio-25/9" bg-black>
    <div
      absolute top-0 right-0
      lt-lg="left-0"
      lg="bottom-0 left-1/3"
    >
    <SanityImage
              v-if="item.coverImage?.asset?._ref"
              class="h-full w-full object-cover"
              :alt="item.coverImage?.alt || ''"
              :asset-id="item.coverImage.asset._ref"
            />
    </div>
    
    <div
      absolute bottom-0 left-0 top-0 px-10
      flex="~ col" justify-center
      lt-lg="bg-gradient-to-t right-0 p10"
      lg="px25 w-2/3 bg-gradient-to-r"
      from-black via-black to-transparent
      class="z-10"
    >
    
      <Transition appear name="hero">
        <div v-show="mounted">
          <h1 mt-2 text-4xl lg:text-5xl line-clamp-2>
            {{ props.item.title || props.item.name }}
          </h1>
          <div flex="~ row wrap" gap2 items-center mt4>
            <div class="op50 hidden md:block">
              {{ props.item.excerpt }}
            </div>
            
          </div>
        </div>
      </Transition>
    </div>
    <!-- The dark overlay -->
  <div class="absolute inset-0 bg-black/50 from-black via-black to-transparent"></div>
  </div>
</template>

<style>
.hero-enter-active,
.hero-leave-active {
  transition: transform .75s cubic-bezier(.4, .25, .3, 1), opacity .3s cubic-bezier(.4, .25, .3, 1);
}

.hero-enter-from,
.hero-leave-to {
  opacity: 0;
  transform: translate3d(0, 2rem, 0);
}

.hero-enter-to,
.hero-leave-from {
  opacity: 1;
  transform: translateZ(0);
}
</style>
