<template>
  <ul>
    <li v-for="user in usersFiltered" :key="user.id">
      {{ user.name.first }}
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const usersFiltered = computed(() => store.getters['users/usersFiltered'])
</script>

<style scoped lang="scss"></style>
