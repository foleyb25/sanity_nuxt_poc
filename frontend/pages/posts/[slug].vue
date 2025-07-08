<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { postQuery, somePostsQuery } from '~/sanity/queries';
import type { PostQueryResult, SomePostsQueryResult } from '~/sanity/types';

const route = useRoute();

const post = ref<PostQueryResult | null>(null);
const posts = ref<SomePostsQueryResult | null>(null);

const slug = route.params.slug as string;

const { data: postResult } = await useSanityQuery<PostQueryResult>(postQuery, {
  slug
});

post.value = postResult.value;
const { data: relatedPosts } = await useSanityQuery<SomePostsQueryResult>(somePostsQuery, {
  skip: slug,
  limit: 10,
  byAuthor: true,
  authorId: post.value.author._id
});

posts.value = relatedPosts.value;


useSiteMetadata({
  title: post?.value?.seoTitle || post?.value?.title,
  description: post?.value?.seoDescription || post?.value?.excerpt,
});

// useHead({
//   title: item.name || item.title,
//   meta: [
//     { name: 'description', content: item.overview },
//     { property: 'og:image', content: $img(`/tmdb${item.poster_path}`, { width: 1200, height: 630 }) },
//   ],
// })
</script>

<template>
  <div v-if="post">
    <MediaHero :item="post" />
    <div class="p-8">
      <MediaDetails :item="post" />
    </div>
    <div v-if="posts">
      <CarouselAutoQuery
        :query="posts"
        title="More by this author"
      />
    </div>


    
    
    <TheFooter />
  </div>
</template>
