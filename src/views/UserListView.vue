<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import UserList from '@/components/UserList.vue'
import UserSearch from '@/components/UserSearch.vue'

const store = useStore()

onMounted(() => {
  const usersWorker = new Worker('/workers/users.worker.js')

  usersWorker.onmessage = ({ data }) => {
    console.log('Loading...')

    if (data === 'OK') {
      console.log('Done')

      store.dispatch('users/fetch')
    }
  }
})
</script>

<template>
  <div class="user-list-view">
    <div class="user-list-view__search">
      <UserSearch />
    </div>
    <div class="user-list-view__list">
      <!-- TODO: Loading animation -->
      <UserList />
    </div>
  </div>
</template>

<style scoped>
.user-list-view {
  width: calc(100vw - 20px);
  height: calc(100vh - 20px);
  padding: 10px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
}

.user-list-view__search {
  height: 50px;
  margin-bottom: 30px;
}

.user-list-view__list {
  position: relative;
  flex-grow: 1;
  overflow: hidden;
}
</style>
