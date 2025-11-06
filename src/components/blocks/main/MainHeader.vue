<script setup lang="ts">
import {ref} from "vue";

import CrossIcon from "../../../assets/images/icons/CrossIcon.vue";
import SearchIcon from "../../../assets/images/icons/SearchIcon.vue";

import useSearchStore from "../../../store/useSearchStore.ts";
const searchStore = useSearchStore();

const inputElement = ref<HTMLInputElement | null>(null)

const clearSearchText = () => {
  searchStore.searchText = ''

  inputElement.value?.focus()
}

</script>

<template>

  <header class="header flex flex-align-center flex-justify-center">
    <div class="header__search flex overflow-hidden position-relative">
      <input class="header__input input"
             v-model="searchStore.searchText"
             ref="inputElement"
      >
      <button class="header__btn flex-center recolor-svg"
              type="button"
              aria-label="Поиск"
              title="Поиск"
      >
        <SearchIcon/>
      </button>

      <button class="header__clear recolor-svg position-absolute button-width-svg flex-center hover-color-accent"
              type="button"
              aria-label="Очистить"
              title="Очистить"
              @click="clearSearchText"
      >
        <CrossIcon/>
      </button>
    </div>

    <div class="header__avatar img-container position-absolute cursor-pointer" title="user">
      <img src="../../../assets/images/аватар.webp" alt="user">
    </div>
  </header>

</template>