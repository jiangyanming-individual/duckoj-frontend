<template>
  <a-row
    id="globalHeader"
    style="margin-bottom: 16px"
    align="center"
    :wrap="false"
  >
    <a-col flex="auto">
      <div>
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
          <a-menu-item v-for="item in visiableRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <div class="menu">
        <a-dropdown :popup-max-height="false" trigger="hover">
          <a-avatar style="background: cornflowerblue"
            >{{ store.state.user?.loginUser?.userName ?? "未登录" }}
          </a-avatar>
          <template #content>
            <a-doption @click="doLogin"> 登录</a-doption>
            <a-doption @click="doLogout"> 退出</a-doption>
          </template>
        </a-dropdown>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import * as path from "path";
import { UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const selectedKeys = ref(["/"]);
const store = useStore();

//过滤掉不能使用的路由：
const visiableRoutes = computed(() => {
  //通过计算属性动态更新
  return routes.filter((item, index) => {
    //过滤不能显示的路由
    if (item.meta?.hideInMenu) {
      return false;
    }
    //根据权限校验用户权限：
    if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

// 路由跳转后更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

//获取全局用户变量
setTimeout(() => {
  // 以载荷形式分发
  store.dispatch("user/getLoginUser", {
    userName: "Duck管理员",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

//绑定点击事件
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

/**
 *
 * 登录
 */
const doLogin = () => {
  router.push({
    path: "/user/login",
  });
};

/**
 * 退出登录
 */
const doLogout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code === 0) {
    message.success("退出成功");
    //重定向到登录页面
    router.push({
      path: "/user/login",
    });
  } else {
    message.error("退出失败");
  }
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

# menu .arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>
