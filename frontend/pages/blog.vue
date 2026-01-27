<script setup lang="ts">
import { QUERY_LIST } from '~/constants/lists'

import { postsQuery, settingsQuery } from "~/sanity/queries";
import type { PostsQueryResult, SettingsQueryResult } from "~/sanity/types";

const { data: posts } = await useSanityQuery<PostsQueryResult>(postsQuery);
    const { data: settings } =
    await useSanityQuery<SettingsQueryResult>(settingsQuery);

</script>

<template>
  <div class="w-3/4 bg-red-400 flex justify-center">
    <div class="block">
        <MediaCardWidth post={{ posts }}></MediaCardWidth>
    </div>
    <div>
        <MediaCardWidth post={{ posts }}></MediaCardWidth>
    </div>
  </div>
</template>
