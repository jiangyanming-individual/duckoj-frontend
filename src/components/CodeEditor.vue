<template>
  <div
    id="code-editor"
    ref="contentRef"
    style="min-height: 450px; height: 60vh"
  />
</template>
<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from "vue";

//元素引入用
const contentRef = ref();
const codeEditor = ref();

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

/**
 * 定义默认属性
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

/**
 * 挂载元素：
 */
onMounted(() => {
  if (!contentRef.value) {
    return;
  }
  //创建代码编辑器的样式以及内容
  codeEditor.value = monaco.editor.create(contentRef.value, {
    value: props.value, //内容
    language: props.language, //语言设置
    automaticLayout: true, //自动布局
    colorDecorators: true, //颜色设置
    showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
    disableLayerHinting: true, // 等宽优化
    minimap: {
      //小地图
      enabled: true,
    },
    // emptySelectionClipboard: false, // 空选择剪切板
    // selectionClipboard: false, // 选择剪切板
    // codeLens: false, // 代码镜头
    // readOnly: false,
    // accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
    // lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
    // lineNumbersMinChars: 4, // 行号最小字符   number
    theme: "vs-dark",
  });
  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
<style scoped></style>
