<template>
  <div id="app">
    <BasticLayouts />
  </div>
</template>

<style></style>
<script setup lang="ts">
import BasticLayouts from "@/layouts/BasticLayouts.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

//定义路由跳转的权限：
router.beforeEach((to, from, next) => {
  // console.log("to data:", to);
  if (to.meta.access === "canAdmin") {
    if (store.state.user.loginUser.role !== "admin") {
      next("/noAuth"); // 跳转到无权限页面；
      return;
    }
  }
  //正常跳转：
  next();
});
</script>
