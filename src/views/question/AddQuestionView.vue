<template>
  <div id="addQuestionView">
    <h2 style="margin-bottom: 16px; margin-left: 32px">创建题目</h2>
    <a-form :model="form" :style="{ width: '600px' }">
      <a-form-item field="title" label="题目" tooltip="请输入题目">
        <a-input v-model="form.title" placeholder="请输入题目" />
      </a-form-item>
      <a-form-item field="tags" label="标签" tooltip="请输入标签">
        <a-input-tag v-model="form.tags" placeholder="请输入标签" allow-clear />
      </a-form-item>
      <a-form-item field="content" label="输入内容" tooltip="请输入内容">
        <MdEditor
          :value="form.content"
          :handle-change="onContentChange"
          style="min-width: 850px"
        />
      </a-form-item>
      <a-form-item field="answer" label="输入答案" tooltip="请输入答案">
        <MdEditor
          :value="form.answer"
          :handle-change="onAnswerChange"
          style="min-width: 850px"
        />
      </a-form-item>
      <a-form-item
        label="判题信息"
        :content-flex="true"
        :merge-props="false"
        tooltip="请输人判题限制"
      >
        <a-space direction="vertical" fill style="min-width: 500px">
          <a-form-item
            field="judgeConfig.memoryLimit"
            label="内存限制"
            tooltip="单位：kb"
          >
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="内存限制"
              min="1"
              mode="button"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.timeLimit"
            label="时间限制"
            tooltip="单位：ms（毫秒）"
          >
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="时间限制"
              min="1"
              mode="button"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.stackLimit"
            label="堆栈限制"
            tooltip="单位：kb"
          >
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="堆栈限制"
              min="1"
              mode="button"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item
        label="判题用例"
        :content-flex="false"
        :merge-props="false"
        tooltip="建议填写判题用例配置"
        required
      >
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 500px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}：`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入判题输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index}：`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入判题输出用例"
              />
            </a-form-item>
          </a-space>
        </a-form-item>
        <a-space direction="horizontal" size="large">
          <a-button
            type="outline"
            status="danger"
            @click="handleDelete(index)"
            shape="round"
          >
            删除判题用例
          </a-button>
          <a-button
            @click="handleAdd"
            type="outline"
            status="success"
            shape="round"
            >新增判题用例
          </a-button>
        </a-space>
      </a-form-item>
      <a-divider :size="2" style="border-bottom-style: dotted" />
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="onSubmit"
          >创建题目
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

//使用路由参数：
const updatePage = route.path.includes("update");

const form = ref({
  title: "",
  tags: [],
  content: "",
  answer: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
});

//todo 修改后端的接口，获取全局的Question， 修改form为ref引用；

/**
 * 加载数据：
 */
const loadData = async () => {
  const id = route.query.id;
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );

  if (res.code === 0) {
    //设置数据：
    form.value = res.data as any;
  }
};

/**
 * 页面加载时，加载数据
 */
onMounted(() => {
  loadData();
});

const onSubmit = async () => {
  console.log(form.value);
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新題目成功!");
    } else {
      message.error("更新題目失败！");
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("添加題目成功!");
    } else {
      message.error("添加題目失败！");
    }
  }
};

const onContentChange = (v: string) => {
  form.value.content = v;
};

const onAnswerChange = (v: string) => {
  form.value.answer = v;
};

const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};
</script>
<style scoped>
#addQuestionView {
}
</style>
