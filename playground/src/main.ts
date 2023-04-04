import { createApp } from 'vue'
import autoExpose from 'unplugin-vue-setup-extend-plus/src/client/index'
import App from './App.vue'

createApp(App).use(autoExpose).mount('#app')
