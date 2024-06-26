import { createApp } from "vue";
import router from "./router";
import store from "./store";
import ArcoVue, { Button } from "@arco-design/web-vue";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/axios";
import "@/access"; //导入全局校验
import "bytemd/dist/index.css";

const app = createApp(App);
app.use(ArcoVue);
app.use(router);
app.use(store);
app.mount("#app");
