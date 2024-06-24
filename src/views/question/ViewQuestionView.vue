<template>
  <div id="viewQuestionView">
    <!--    {{ question }}-->
    <a-row class="grid-demo" :gutter="[24, 12]">
      <a-col :span="12" :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content ?? ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论"> 暂无评论</a-tab-pane>
          <a-tab-pane key="answer">
            <template #title>答案</template>
            暂时无答案
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :span="12">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              :style="{ width: '320px' }"
              placeholder="请选择编程语言"
              v-model="form.submitLanguage"
            >
              <a-option>java</a-option>
              <a-option>c++</a-option>
              <a-option>golang</a-option>
            </a-select>
          </a-form-item>
          <a-button type="outline" status="danger" @click="doSubmit"
            >提交代码</a-button
          >
        </a-form>
        <a-card>
          <CodeEditor
            :value="form.submitCode"
            :language="form.submitLanguage"
            :handle-change="onCodechange"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { withDefaults, defineProps } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

const router = useRouter();
const question = ref<QuestionVO>();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

/**
 * 加载单个题目
 */
const loadData = async () => {
  //获取数据
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  //获取分页数据
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("获取题目失败," + res.message);
  }
};

/**
 * 定义提交的内容
 */
const form = ref<QuestionSubmitAddRequest>({
  submitCode: "",
  submitLanguage: "java",
});

/**
 * 填充编码编辑器内容
 */
const onCodechange = (value: string) => {
  form.value.submitCode = value;
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 加载页面进行获取数据；
 */
onMounted(() => {
  loadData();
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  //向后端提交请求
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value?.id,
  });
  if (res.code === 0) {
    message.success("提交代码成功!");
  } else {
    message.error("提交代码失败！");
  }
};
</script>
<style scoped>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
