<script setup>
import { PortableText } from '@portabletext/vue'
import imageUrlBuilder from '@sanity/image-url'

// You can load projectId and dataset from runtime config
const config = useRuntimeConfig()

const builder = imageUrlBuilder({
  projectId: config.public.sanity.projectId,
  dataset: config.public.sanity.dataset
})

const props = defineProps({
  content: {
    type: Array,
    required: true
  }
})

// Define how to render each block type
const components = {
  types: {
    image: ({ value }) => {
      const imageUrl = builder.image(value).width(800).url()
      return h('img', {
        src: imageUrl,
        alt: value.alt || 'Image',
        class: 'my-6 rounded'
      })
    }
  }
}
</script>

<template>
  <PortableText :value="content" :components="components" />
</template>
