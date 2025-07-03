<template>
  <footer p="y15 x15" flex="~ col gap4">
    <div flex="~ row gap2" items-center my2>
      <img src="/movies-sm.webp" width="25" height="25" alt="Logo">
      <div text-xl>
        Nuxt Movies
      </div>
    </div>
    <div flex="~ row gap2" items-center>
      <div op50 text-sm>
        Made with
      </div>
      <a href="https://nuxt.com/" target="_blank" title="Nuxt 3">
        <IconNuxt3 h5 />
      </a>
    </div>
    <div flex="~ row gap2" items-center>
      <p text-true-gray:90 text-sm>
        Data provided by&nbsp;
      </p>
    </div>
    <div flex="~ row gap2" items-center>
    </div>
    <div flex gap4 items-center>
      <ExternalLinks
        :links="{
          twitter_id: 'nuxt_js',
          github_id: 'nuxt/movies',
        }"
      >
        <a href="https://vercel.com" rel="noopener" target="_blank" aria-label="go to vercel">
          <IconVercel alt="Vercel" />
        </a>
      </ExternalLinks>
    </div>
  </footer>
</template>
