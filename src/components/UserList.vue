<template>
  <div class="user-list" @mousewheel="updateScrollbar" ref="userListEl">
    <ul class="user-list__list" ref="userListULEl">
      <UserListItem v-for="user in usersFiltered" :key="user.id" :user="user" />
    </ul>
    <div
      :class="`scrollbar${hasScrollbar ? '' : ' scrollbar--hidden'}`"
      ref="scrollBarEl"
    >
      <div class="scrollbar__track"></div>
      <div class="scrollbar__handle" ref="scrollBarHandleEl"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useStore } from 'vuex'
import UserListItem from '@/components/UserListItem.vue'

const store = useStore()
const userListEl = ref(null)
const userListULEl = ref(null)
const scrollBarEl = ref(null)
const scrollBarHandleEl = ref(null)

const hasScrollbar = ref(false)

const usersFiltered = computed(() => store.getters['users/usersFiltered'])

const updateScrollbar = () => {
  hasScrollbar.value =
    userListULEl.value.getBoundingClientRect().height >
    userListEl.value.getBoundingClientRect().height

  scrollBarHandleEl.value.style.height = `${
    (userListEl.value.getBoundingClientRect().height /
      userListULEl.value.getBoundingClientRect().height) *
      scrollBarEl.value.getBoundingClientRect().height -
    30
  }px`

  scrollBarHandleEl.value.style.top = `${
    userListEl.value.getBoundingClientRect().top -
    userListULEl.value.getBoundingClientRect().top
  }px`
}

watch(usersFiltered, () => {
  nextTick(updateScrollbar)
})
</script>

<style scoped>
.user-list {
  width: calc(100% + 100px);
  height: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow: scroll;
}

.user-list__list {
  width: calc(100% - var(--standard-spacing) * 3 - 100px);
  margin: 0;
  padding: 0;
}

.scrollbar {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
}

.scrollbar--hidden {
  opacity: 0;
  pointer-events: none;
}

.scrollbar__handle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ababab;
  border-radius: 30px;
}

.scrollbar__track {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  margin-left: -1px;
  background-color: #efeeee;
}
</style>
