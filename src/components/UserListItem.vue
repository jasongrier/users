<script setup>
import { computed, defineProps, toRefs } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  user: {},
})

const { user } = toRefs(props)
const store = useStore()
const searchText = computed(() => store.getters['users/searchText'])
const selected = computed(() =>
  store.getters['users/usersSelectedIDs'].includes(user.value.id),
)

const toggle = () => store.dispatch('users/toggleSelected', user.value.id)
</script>

<template>
  <li :class="`user-list__item${selected ? ' user-list__item--selected' : ''}`">
    <div class="user-list__image">
      <img :src="user.picture" :alt="`${user.name.first} ${user.name.last}`" />
    </div>
    <div class="user-list__card">
      <div class="user-list__email">{{ user.email }}</div>
      <h3>
        <!-- <Highlight :text="'Al'"> -->
        {{ user.name.first }} {{ user.name.last }}
        <!-- </Highlight> -->
      </h3>
      <p>
        Registered: {{ user.registered }}<br />
        Address: {{ user.address }}<br />
        Country: {{ user.country }}
      </p>
      <div class="user-list__card-footer">
        <button class="user-list__select-toggle" @click="toggle">
          {{ selected ? 'Unselect' : 'Select' }}
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped>
.user-list__item {
  position: relative;
  height: 160px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-sizing: border-box;

  display: flex;
}

.user-list__item--selected {
  border: 1px solid #6b81f3;
}

.user-list__image {
  width: 160px;
  height: 160px;
  margin-right: 32px;
}

.user-list__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-list__email {
  position: absolute;
  top: 16px;
  right: 16px;

  font-size: 14px;
}

.user-list__item--selected .user-list__email {
  right: 14px;
}

.user-list__card {
  position: relative;
  flex-grow: 1;
  height: calc(100% - 32px);
  padding: 16px 16px 16px 0;
}

.user-list__item--selected .user-list__card {
  transform: translate(-1px, -1px);
}

.user-list__card h3 {
  margin: 0 0 8px 0;
  font-size: 21px;
}

.user-list__card p {
  margin: 0;
  font-size: 16px;
  line-height: 20px;
}

.user-list__card-footer {
  position: absolute;
  bottom: 0;
  right: 16px;
  width: calc(100% - 16px);
  height: 40px;
  border-top: 1px solid #efefef;

  display: flex;
  justify-content: right;
  align-items: center;
}

.user-list__item--selected .user-list__card-footer {
  bottom: -2px;
  right: 14px;
}

.user-list__select-toggle {
  display: block;
  border: 0;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  color: #6b81f3;
  cursor: pointer;
  background-color: transparent;
}

.user-list__select-toggle:active,
.user-list__select-toggle:focus {
  outline: none;
}
</style>
