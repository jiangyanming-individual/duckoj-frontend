<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasticLayouts />
    </template>
  </div>
</template>
<style></style>
<script setup lang="ts">
import BasticLayouts from "@/layouts/BasticLayouts.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute(); //使用路由参数

const doInit = () => {
  console.log("全局入口");
};

onMounted(() => {
  doInit();
});

//解决buge
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 200);
    super(callback);
  }
};
</script>
