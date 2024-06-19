<template>
  <div id="globalHeader">
    <a-menu
      mode="horizontal"
      :default-selected-keys="['1']"
      :selected-keys="selectedKeys"
      @menu-item-click="doMenuClick"
    >
      <a-menu-item
        key="0"
        :style="{ padding: 0, marginRight: '38px' }"
        disabled
      >
        <div class="title-bar">
          <img class="logo" src="../assets/duck.svg" />
          <div class="title">Duck OJ</div>
        </div>
      </a-menu-item>
      <a-menu-item v-for="item in routes" :key="item.path">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const selectedKeys = ref(["/"]);

// 路由跳转后更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

//绑定点击事件
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>
<style scoped>
#globalHeader {
}

.title {
  color: #444;
  margin-left: 16px;
}

.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 48px;
}
</style>
