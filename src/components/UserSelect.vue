<script setup>
import { computed, defineProps, toRefs } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  id: String,
})

const { id } = toRefs(props)

const store = useStore()

const selected = computed(() =>
  store.getters['users/usersSelectedIDs'].includes(id.value),
)

const toggle = () => store.dispatch('users/toggleSelected', id.value)
</script>

<template>
  <button @click="toggle">{{ selected ? 'Unselect' : 'Select' }}</button>
</template>

<style scoped>
button {
  display: block;
  border: 0;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  color: #6b81f3;
  cursor: pointer;
  background-color: transparent;
}

button:active,
button:focus {
  outline: none;
}
</style>
