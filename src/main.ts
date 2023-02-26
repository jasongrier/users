import { createApp } from 'vue'
// @ts-ignore
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).use(VueVirtualScroller).mount('#app')
