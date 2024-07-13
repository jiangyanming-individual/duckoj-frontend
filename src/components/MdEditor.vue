<template>
  <Editor
    :value="value"
    :mode="mode"
    :plugins="plugins"
    @change="handleChange"
  />
</template>
<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
//高亮
import highlight from "@bytemd/plugin-highlight";
import { Editor, Viewer } from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";
import locale from "bytemd/locales/zh_Hans.json";
import gemoji from "@bytemd/plugin-gemoji";
import math from "@bytemd/plugin-math";

// 引入汉化包
import mathLocale from "@bytemd/plugin-math/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/locales/zh_Hans.json";

// const plugins = [gfm(), highlight()];

const plugins = [
  gfm({
    locale: gfmLocale,
  }),
  highlight(),
  // 公式中文显示
  math({
    locale: mathLocale,
  }),
  gemoji(),
];

/**
 * 定义组件的属性类型
 */
interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始的值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>
<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
