<script setup lang="ts">

import MainHeader from "./MainHeader.vue";

const test = Array.from({length: 50})

</script>

<template>

  <div class="main__right position-relative">
    <MainHeader/>

    <div class="main__content">
      <div v-for="i in test">привет</div>
    </div>
  </div>

</template>