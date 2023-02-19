<template>
  <label for="search-text">
    <input
      name="search-text"
      type="text"
      :value="searchText"
      @input="setSearchText"
    />
  </label>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const searchText = computed(() => store.getters['users/searchText'])
const setSearchText = evt => {
  store.dispatch('users/search', evt.currentTarget.value)
}
</script>

<style scoped lang="scss"></style>
