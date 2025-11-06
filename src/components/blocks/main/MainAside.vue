<script setup lang="ts">

import menuItems from "../../../data/main/menuAside.ts";

import Logo from "../../../assets/images/Logo.vue";


</script>

<template>

  <aside class="menu">
    <RouterLink to="/" class="menu__logo button-width-svg flex flex-align-center">
      <Logo/>
      <p class="h4">veFox</p>
    </RouterLink>

    <ul class="menu__list">
      <li class="menu__item"
          v-for="(item, index) in menuItems"
          :key="index"
      >
        <button class="menu__btn flex flex-align-center recolor-svg hover-color-accent text-nowrap" type="button">
          <component :is="item.icon" style="fill: none"/>
          <span>{{item.title}}</span>
        </button>
      </li>
    </ul>
  </aside>

</template>