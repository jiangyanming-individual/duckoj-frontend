<template>
  <div class="home">
    <CodeEditor :value="codeValue" :handle-change="onCodechange" />
    <MdEditor :value="MdValue" :handle-change="onMdchange" />
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { ref } from "vue";

/**
 * 导入属性和值：
 */
const codeValue = ref();
const onCodechange = (v: string) => {
  codeValue.value = v;
};

const MdValue = ref();
const onMdchange = (v: string) => {
  MdValue.value = v;
};
</script>
