import {createApp} from 'vue'
import './style.css'
import '@/assets/style/element/custom_animate.css'
import App from './App.vue'
import 'animate.css';
import ElementPlus from 'element-plus'
import lazyPlugin from 'vue3-lazy'
import "@/assets/style/element/index.scss"
import "@/assets/style/element/dark.scss"
import Loading from "./components/common/loading/index.vue"
// @ts-ignore
import router from "@/router/index"
import loading from "@/assets/images/loading.gif"
import err from "@/assets/images/err.jpg"

const app = createApp(App)
lazyPlugin.install(app, {
    loading: loading,
    error: err
})
app.use(ElementPlus)
app.use(router)
app.mount('#app')

