import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://127.0.0.1:8000' 

const app = createApp(App)
app.config.globalProperties.$http = axios
app.mount('#app')