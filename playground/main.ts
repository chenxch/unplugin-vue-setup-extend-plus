import { createApp } from 'vue'
import vueSetupExtendClient from 'unplugin-vue-setup-extend-plus/src/client/index'
import App from './App.vue'
createApp(App).use(vueSetupExtendClient).mount('#app')
