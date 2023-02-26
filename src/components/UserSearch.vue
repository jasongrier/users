<template>
  <label class="user-search" for="search-text">
    <div class="user-search__icon">
      <img src="/icons/search.svg" alt="Search" />
    </div>
    <input
      class="user-search__input"
      name="search-text"
      type="text"
      :value="searchText"
      @input="setSearchText"
    />
  </label>
</template>

<script setup>
import { computed, nextTick } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const searchText = computed(() => store.getters['users/searchText'])
const setSearchText = evt => {
  const searchText = evt.currentTarget.value
  nextTick(() => {
    store.dispatch('users/search', searchText)
  })
}
</script>

<style scoped>
.user-search {
  width: 100%;
  height: 50px;
  background-color: #eee;
  border-radius: 8px;

  display: flex;
}

.user-search__icon {
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.user-search__icon img {
  display: block;
  width: 24px;
  height: 24px;
}

.user-search__input {
  display: block;
  height: 50px;
  flex-grow: 1;
  background-color: transparent;
  border: transparent;

  font-size: 20px;
  line-height: 50px;
  color: #555;
}

.user-search__input:active,
.user-search__input:focus {
  outline: none;
}
</style>
