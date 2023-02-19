<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import UserList from '@/components/UserList.vue'
import UserSearch from '@/components/UserSearch.vue'

const store = useStore()

onMounted(() => {
  store.dispatch('users/fetch')
})
</script>

<template>
  <div class="user-list-view">
    <div class="user-list-view__search">
      <UserSearch />
    </div>
    <div class="user-list-view__list">
      <UserList />
    </div>
  </div>
</template>

<style scoped>
.user-list-view {
  width: calc(100vw - calc(var(--standard-spacing) * 2));
  height: calc(100vh - calc(var(--standard-spacing) * 2));
  padding: var(--standard-spacing);
  overflow: hidden;
  background-color: green;

  display: flex;
  flex-direction: column;
}

.user-list-view__search {
  height: 50px;
  margin-bottom: var(--standard-spacing);
  background-color: red;
}

.user-list-view__list {
  flex-grow: 1;
  overflow: scroll;
  background-color: orange;
}
</style>
