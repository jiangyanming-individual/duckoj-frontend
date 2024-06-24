<template>
  <div id="questionView">
    <a-form :model="searchParams" layout="inline" style="margin-bottom: 16px">
      <a-form-item field="title" label="题目">
        <a-input
          v-model="searchParams.title"
          placeholder="请输入题目"
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item field="tags" label="题目标签">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="请输入题目标签"
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">提交</a-button>
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
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of record.tags"
            :key="index"
            color="green"
            closable
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #submitNum="{ record }">
        <a-space>
          {{
            `${
              record.submitNum ? record.acceptedNum / record.submitNum : "0"
            }% (${record.acceptedNum} / ${record.acceptedNum})`
          }}
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doViewQuestion(record)"
            >做题
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();
const dataList = ref([]);
const total = ref(0);
//分页查询参数
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  current: 1,
  pageSize: 10,
});

/**
 * 加载题目列表页：
 */
const loadData = async () => {
  //获取数据
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
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
 * 更新操作，根据路由跳转到更新页：
 */
const doViewQuestion = (question: QuestionVO) => {
  //路由使用，携带查询参数：
  router.push({
    path: `/view/question/${question.id}`,
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

/**
 * 表格列：
 */
const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },

  {
    title: "题目",
    dataIndex: "title",
  },
  {
    title: "题目标签",
    slotName: "tags",
  },
  {
    title: "题目通过率",
    slotName: "submitNum",
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
