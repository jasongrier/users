<template>
  <ul class="user-list">
    <UserListItem v-for="user in usersFiltered" :key="user.id" :user="user" />
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import UserListItem from '@/components/UserListItem.vue'

const store = useStore()
const usersFiltered = computed(() => store.getters['users/usersFiltered'])
</script>

<style scoped>
.user-list {
  margin: 0;
  padding: 0 calc(var(--standard-spacing) * 3) 0 0;
  list-style-type: none;
}
</style>
