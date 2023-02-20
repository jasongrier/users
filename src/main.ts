import { createApp } from 'vue'
// @ts-ignore
import VueVirtualScroller from 'vue-virtual-scroller'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).use(VueVirtualScroller).mount('#app')
