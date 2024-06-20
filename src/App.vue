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
</script>
