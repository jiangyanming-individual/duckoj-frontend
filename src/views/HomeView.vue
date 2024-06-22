<template>
  <div class="home">
    <MdEditor :value="value" :handle-change="onchange" />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import MdEditor from "@/components/MdEditor.vue";
import { ref } from "vue";

/**
 * 导入属性和值：
 */
const value = ref();
const onchange = (v: string) => {
  value.value = v;
};
</script>
