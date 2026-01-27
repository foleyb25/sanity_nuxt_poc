<script setup lang="ts">
import type { Post } from '~/sanity/types'

defineProps<{
  post: Post
}>()
</script>

<template>
    <NuxtLink
    :to="`/posts/${post?.slug?.current}`"
  >
        <div class="article-box bg-amber-400 float-left w-full h-[200px]">
            <div class="image-box bg-red-600 w-1/4 h-full bg-secondary float-left border-right border-dark">
                <SanityImage
              v-if="post.coverImage?.asset?._ref"
              class="center-cropped w-full h-full border border-dark"
              :alt="post.coverImage?.alt || ''"
              :asset-id="post.coverImage.asset._ref"
              format
            />
            </div>
            <div class="title-container bg-blue-400 overflow-hidden w-3/4 h-full p-6 float-left">
                <div class="title-box float-left font-revans-medium font-weight-bold line-clamp h-100 w-3/4 p-2">
                    <p class="title-p ">{{ post.title }}</p>
                </div>
                <div class="comment-indicator d-flex flex-column align-items-end h-full w-1/4 p-2">
                    <span class="fas fa-comments p-1" aria-hidden="true">3</span>
                </div>
            </div>
            <div class="bottom-box  bg-pink-300 overflow-hidden h-1/4 w-full flex flex-row justify-between border-top border-dark">
                <Avatar
                    v-if="post.author"
                    :person="post.author"
                    :date="post.date"
                    class="my-2"
                    />
                <div class="font-revans-medium h-full w-1/4 d-flex justify-content-center align-items-center">
                    #Tag1, #Tag2
                </div>
                <div class="font-revans-medium font-italic h-full w-1/4 d-flex justify-content-center align-items-center text-secondary">
                    <!-- Can use .toLocaleTimeString -->
                    8/34/5555
                </div>
            </div> 
        </div>
    </NuxtLink>
    </template>
