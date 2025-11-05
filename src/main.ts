import { createApp } from "vue";
import {createPinia} from "pinia";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);

app.directive('autofocus', {
    mounted (el) {
        el.focus()
    }
})

app.use(createPinia());
app.use(router);
app.mount("#app");