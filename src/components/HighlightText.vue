<script setup>
import { computed, defineProps, toRefs } from 'vue'

const props = defineProps({
  highlight: String,
  text: String,
})

const { highlight, text } = toRefs(props)

// TODO: This should be case-insensitive
const highlightedText = computed(() =>
  highlight.value.length
    ? text.value.replace(
        new RegExp(highlight.value, 'g'),
        `<span class="highlight">${highlight.value}</span>`,
      )
    : text.value,
)
</script>

<template>
  <span v-html="highlightedText" />
</template>

<style>
.highlight {
  background-color: #ffff00;
}
</style>
