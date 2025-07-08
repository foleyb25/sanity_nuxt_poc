<script setup lang="ts">
import { QUERY_LIST } from '~/constants/lists'

import { postsQuery, settingsQuery } from "~/sanity/queries";
import type { PostsQueryResult, SettingsQueryResult } from "~/sanity/types";

const { data: posts } = await useSanityQuery<PostsQueryResult>(postsQuery);
    const { data: settings } =
    await useSanityQuery<SettingsQueryResult>(settingsQuery);

</script>

<template>
  <div>
    <MediaHeroBeGreat />
    <CarouselAutoQuery
      :query="posts"
      title="Popular"
    />
    <CarouselAutoQuery
      :query="posts"
      title="New"
    />
    <TheFooter />
  </div>
</template>
