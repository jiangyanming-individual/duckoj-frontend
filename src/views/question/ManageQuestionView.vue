<template>
  <div id="manageQuestionView">
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
      fixed="left"
      :scroll="scroll"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of JSON.parse(record.tags)"
            :key="index"
            :color="colors[index]"
            closable
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>

      <template #judgeCase="{ record }">
        <a-space>
          <a-list :bordered="false">
            <a-list-item
              v-for="(item, index) of JSON.parse(record.judgeCase)"
              :key="index"
              action-layout="vertical"
              max-height="240"
            >
              <a-list-item v-for="(item2, index2) of item" :key="index2">
                {{ `${index2} : ${item2}` }}
              </a-list-item>
            </a-list-item>
          </a-list>
        </a-space>
      </template>

      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">更新</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
      <template #judgeConfig="{ record }">
        <a-space>
          <a-list :bordered="false">
            <a-list-item
              v-for="(item, index) of JSON.parse(record.judgeConfig)"
              :key="index"
              action-layout="vertical"
              max-height="240"
              style="min-width: 100px"
              >{{ `${index} : ${item}` }}
            </a-list-item>
          </a-list>
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment/moment";
import Json from "@apidevtools/json-schema-ref-parser/lib/parsers/json";

const router = useRouter();
const dataList = ref([]);
const total = ref(0);
//分页查询参数
const searchParams = ref({
  current: 1,
  pageSize: 10,
});

const scroll = {
  x: "60%",
  y: "100%",
};

/**
 * 加载题目列表页：
 */
const loadData = async () => {
  //获取数据
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
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
const doUpdate = (question: Question) => {
  //路由使用，携带查询参数：
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};

/**
 * 删除操作
 */
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("刪除成功！");
    loadData();
  } else {
    message.error("刪除題目失败，" + res.message);
  }
};
/**
 * 表格列：
 */
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },

  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "userId",
    dataIndex: "userId",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "内容",
    dataIndex: "content",
  },

  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "判题样例",
    slotName: "judgeCase",
    fixed: "left",
    width: 150,
  },
  {
    title: "判题配置",
    slotName: "judgeConfig",
    fixed: "left",
    width: 220,
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "创建时间",
    slotName: "createTime",
    fixed: "left",
    width: 120,
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const colors = [
  "blue",
  "red",
  "orangered",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "arcoblue",
  "purple",
  "pinkpurple",
  "magenta",
  "gray",
];
</script>
<style scoped>
#manageQuestionView {
  max-width: 1280px;
  margin: auto;
}
</style>
