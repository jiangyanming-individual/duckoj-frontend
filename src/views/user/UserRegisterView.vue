<template>
  <div id="userRegisterView">
    <h2 style="margin-bottom: 16px; margin-top: 16px">用户注册页</h2>
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
      <a-form-item
        field="checkPassword"
        tooltip="密码不能少于8位"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请输入确认密码"
        />
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary "
          html-type="submit"
          style="width: 60px; height: 30px"
          >注册
        </a-button>
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
  checkPassword: "",
});

/**
 * 注册
 */

const handleSubmit = async () => {
  //注册登录后跳转到登录页：
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    message.success("注册成功!");
    //跳转到登录页面
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败，" + `${res?.message ?? "请输入内容注册"}`);
  }
};
</script>

<style scoped></style>
