import { createApp } from "vue";
import router from "./router";
import store from "./store";
import ArcoVue, { Button } from "@arco-design/web-vue";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/axios";
import "@/access"; //导入全局校验
import "bytemd/dist/index.css";
import "highlight.js/styles/a11y-light.css";
// 引入bytemd中文设置
import "bytemd/dist/index.css";
// 引入数学模块
import "katex/dist/katex.css";

const app = createApp(App);
app.use(ArcoVue);
app.use(router);
app.use(store);
app.mount("#app");
