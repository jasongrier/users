<script setup>
import { computed, defineProps, ref, toRefs } from 'vue'

const props = defineProps({
  contentBox: Object,
  viewportBox: Object,
})

const { contentBox, viewportBox } = toRefs(props)

const scrollBarElRef = ref(null)

const hasScrollbar = computed(
  () => viewportBox.value.height < contentBox.value.height,
)

const scrollBarHandleHeight = computed(() => {
  if (!scrollBarElRef.value) return 0
  return (
    (viewportBox.value.height / contentBox.value.height) *
    scrollBarElRef.value.getBoundingClientRect().height
  )
})

const scrollBarHandleTop = computed(
  () =>
    ((viewportBox.value.top - contentBox.value.top) / contentBox.value.height) *
    100,
)
</script>

<template>
  <div class="custom-scrollbar">
    <slot />
    <div ref="scrollBarElRef" class="custom-scrollbar__bar" v-if="hasScrollbar">
      <div class="custom-scrollbar__track"></div>
      <div
        class="custom-scrollbar__handle"
        :style="`
          top: ${scrollBarHandleTop}%;
          height: ${scrollBarHandleHeight}px;
        `"
      >
        <!-- TODO: Make handle draggable -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar {
  position: relative;
  width: 100%;
  height: 100%;
}

.custom-scrollbar__bar {
  position: absolute;
  top: 0;
  right: 10px;
  width: 8px;
  height: 100%;
}

.custom-scrollbar__handle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 20px;
  background-color: #ababab;
  border-radius: 30px;
}

.custom-scrollbar__track {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  margin-left: -1px;
  background-color: #efeeee;
}
</style>
