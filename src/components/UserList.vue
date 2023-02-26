<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import UserListItem from '@/components/UserListItem.vue'
import CustomScrollbar from '@/components/CustomScrollbar.vue'

const ITEM_OUTER_HEIGHT = 176

const store = useStore()

const userListElRef = ref(null)
const contentBox = ref({})
const viewportBox = ref({})

const usersFiltered = computed(() => store.getters['users/usersFiltered'])

const updateBoxes = () => {
  contentBox.value = userListElRef.value
    .querySelector('.vue-recycle-scroller__item-wrapper')
    .getBoundingClientRect()

  viewportBox.value = userListElRef.value.getBoundingClientRect()
}

watch(usersFiltered, updateBoxes)
</script>

<template>
  <div class="user-list" ref="userListElRef" @wheel="updateBoxes">
    <CustomScrollbar :contentBox="contentBox" :viewportBox="viewportBox">
      <RecycleScroller
        class="user-list__scroller"
        :items="usersFiltered"
        :item-size="ITEM_OUTER_HEIGHT"
        key-field="id"
        v-slot="{ item }"
      >
        <UserListItem :user="item" />
      </RecycleScroller>
    </CustomScrollbar>
  </div>
</template>

<style>
.user-list {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow: scroll;
}

.user-list__list {
  width: calc(100% - 130px);
  margin: 0;
  padding: 0;
}

.user-list__scroller {
  width: calc(100vw + 60px);
  height: 100%;
}
</style>
