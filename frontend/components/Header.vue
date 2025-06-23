<script setup lang="ts">
import { settingsQuery } from "~/sanity/queries";
import type { SettingsQueryResult } from "~/sanity/types";

const { data: settings } =
  await useSanityQuery<SettingsQueryResult>(settingsQuery);
</script>

<template>
  <header
    class="fixed z-[1] h-24 inset-0 bg-black flex items-center border-b border-b-white"
  >
    <div class="w-full mr-12">
      <div class="flex items-center justify-end gap-5">

        <nav>
          <ul
            role="list"
            class="flex items-end"
          >
            <li>
              <NuxtLink to="/" class="hover:underline"><img src="../public/white-black-logo.png" class="w-96"/></NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
