<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px; margin-top: 16px">用户登录页</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" tooltip="请输入账号" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账户" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不能少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-space size="large" direction="horizontal">
          <a-button
            type="primary "
            html-type="submit"
            size="medium"
            style="margin-right: 275px"
            >登录
          </a-button>
          <a-button
            href="/user/register"
            type="primary "
            html-type="submit"
            size="medium"
            >注册
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const form = reactive({
  userAccount: "",
  userPassword: "",
});
const handleSubmit = async () => {
  //登录成功跳转到登录页：
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败，" + `${res?.message ?? "不能输入空内容"}`);
  }
};
</script>

<style scoped></style>
