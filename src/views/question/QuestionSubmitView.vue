<template>
  <div id="questionView">
    <a-form :model="searchParams" layout="inline" style="margin-bottom: 16px">
      <a-form-item field="title" label="题目号">
        <a-input
          v-model="searchParams.questionId"
          placeholder="请输入题目号"
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item
        :model="searchParams"
        field="submitLanguage"
        label="编程语言"
        style="min-width: 240px"
      >
        <a-select
          :style="{ width: '320px' }"
          placeholder="请选择编程语言"
          v-model="searchParams.submitLanguage"
        >
          <a-option>java</a-option>
          <a-option>c++</a-option>
          <a-option>golang</a-option>
          <a-option>python</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
      :scroll="scroll"
      :scrollbar="scrollbar"
    >
      <template #judgeInfo="{ record }">
        <a-space direction="vertical" fill size="mini">
          <a-tag checkable color="red" :default-checked="true">
            message: {{ JSON.stringify(record.judgeInfo.message) }}
          </a-tag>
          <a-tag checkable color="arcoblue" :default-checked="true"
            >time: {{ JSON.stringify(record.judgeInfo.time) }}
          </a-tag>
          <a-tag checkable color="#0fc6c2" :default-checked="true"
            >memory: {{ JSON.stringify(record.judgeInfo.memory) }}
          </a-tag>
        </a-space>
      </template>
      <template #submitState="{ record }">
        <div v-if="record.submitState === 0">
          <a-tag checkable color="#86909c" :default-checked="true"
            >待判题
          </a-tag>
        </div>
        <div v-if="record.submitState === 1">
          <a-tag checkable color="#ff7d00" :default-checked="true"
            >判题中
          </a-tag>
        </div>
        <div v-if="record.submitState === 2">
          <a-tag checkable color="#0fc6c2" :default-checked="true">成功</a-tag>
        </div>
        <div v-if="record.submitState === 3">
          <a-tag checkable color="red" :default-checked="true">失败</a-tag>
        </div>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button size="mini" type="primary" @click="doViewQuestion(record)"
            >浏览题目
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();
const dataList = ref([]);
const total = ref(0);
//分页查询参数
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  submitLanguage: undefined,
  current: 1,
  pageSize: 10,
});

/**
 * 加载题目列表页：
 */
const loadData = async () => {
  //获取数据
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  //获取分页数据
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("获取题目列表失败," + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
// eslint-disable-next-line no-undef
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
 * 查询分页,当前页
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 更新操作，根据路由跳转到查看题目页
 */
const doViewQuestion = (
  questionSubmitQueryRequest: QuestionSubmitQueryRequest
) => {
  //路由使用，携带查询参数：
  router.push({
    path: `/view/question/${questionSubmitQueryRequest.questionId}`,
  });
};

/**
 *搜索题目
 */
const doSubmit = () => {
  //执行搜索，然后触发watchEffect监听搜索条件的变化
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

const scrollbar = ref(true);
//表格滚动：
const scroll = {
  x: 1500,
  y: 500,
};

/**
 * 表格列：
 */
const columns = [
  {
    title: "题目提交号",
    dataIndex: "id",
  },
  {
    title: "提交语言",
    dataIndex: "submitLanguage",
  },
  {
    title: "题目号",
    dataIndex: "questionId",
  },
  {
    title: "判题信息",
    dataIndex: "judgeInfo",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    dataIndex: "submitState",
    slotName: "submitState",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
</script>
<style scoped>
#questionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
