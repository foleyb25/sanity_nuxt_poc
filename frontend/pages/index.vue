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
    <CarouselAutoQuery
      :query="posts"
    />
    <CarouselAutoQuery
      :query="posts"
    />
    <CarouselAutoQuery
      :query="posts"
    />
    <TheFooter />
  </div>
</template>
