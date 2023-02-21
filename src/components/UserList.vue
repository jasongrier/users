<template>
  <div class="user-list" @mousewheel="handleMouseWheel" ref="userListEl">
    <div class="user-list__pod" ref="userListPodEl">
      <div v-for="user in usersFiltered" :key="user.id">
        <div v-if="itemsInViewIDs.includes(user.id)">
          <UserListItem :user="user" />
        </div>
      </div>
    </div>
    <ul
      class="user-list__list"
      :style="`height: ${userListULHeight}px`"
      ref="userListULEl"
    ></ul>
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
import throttle from 'lodash/throttle'
import UserListItem from '@/components/UserListItem.vue'

const ITEM_OUTER_HEIGHT = 176

const store = useStore()
const userListEl = ref(null)
const userListULEl = ref(null)
const userListPodEl = ref(null)
const scrollBarEl = ref(null)
const scrollBarHandleEl = ref(null)

const hasScrollbar = ref(false)
const itemsInViewIDs = ref([])

const usersFiltered = computed(() => store.getters['users/usersFiltered'])
const userListULHeight = computed(
  () => usersFiltered.value.length * ITEM_OUTER_HEIGHT,
)

const getScrollTop = () =>
  userListEl.value.getBoundingClientRect().top -
  userListULEl.value.getBoundingClientRect().top

const updateScrollbar = () => {
  hasScrollbar.value =
    userListULHeight.value > userListEl.value.getBoundingClientRect().height

  const scrollBarHandleHeight =
    (userListEl.value.getBoundingClientRect().height / userListULHeight.value) *
    scrollBarEl.value.getBoundingClientRect().height

  scrollBarHandleEl.value.style.height = `${scrollBarHandleHeight}px`
  scrollBarHandleEl.value.style.top = `${
    (getScrollTop() / userListULHeight.value) * 100
  }%`
}

const updateListRendering = () => {
  const first = Math.floor(getScrollTop() / ITEM_OUTER_HEIGHT)

  itemsInViewIDs.value = usersFiltered.value
    .slice(first, first + 5)
    .map(({ id }) => id)
}

const handleMouseWheel = throttle(() => {
  updateScrollbar()
  updateListRendering()
}, 20)

watch(usersFiltered, () => {
  nextTick(() => {
    updateScrollbar()
    updateListRendering()
  })
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

.user-list__pod {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 30px);
  pointer-events: none;
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
  min-height: 20px;
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
