<template>
  <div id="addUserView">
    <a-card
      :style="{
        width: '800px',
        backgroundColor: '#efefeg',
      }"
    >
      <a-form
        layout="horizontal"
        ref="formRef"
        :size="form_style.size"
        :model="form"
        bordered="false"
        :style="{ width: '600px' }"
        @submit="handleSubmit"
      >
        <a-form-item
          field="userAccount"
          label="用户账户名"
          :rules="[
            { required: true, message: '账户名必须填写' },
            { minLength: 4, message: '必须大于4位数' },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.userName" placeholder="请输入账户名" />
        </a-form-item>

        <a-form-item
          field="userPassword"
          label="用户密码"
          validate-trigger="input"
          :rules="[
            { required: true, message: '密码必须要填写' },
            { minLength: 8, message: '必须大于8位数' },
          ]"
        >
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码"
          />
        </a-form-item>

        <a-form-item
          field="userName"
          label="用户名"
          :rules="[
            { required: true, message: '用户名必须填写' },
            { minLength: 4, message: '必须大于4位数' },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.userName" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item
          field="userRole"
          label="选择角色"
          :rules="[
            { match: /section one/, message: '必须选择一个' },
            { required: true, message: '角色必须选择' },
          ]"
        >
          <a-select
            v-model="form.userRole"
            placeholder="请选择角色"
            allow-clear
          >
            <a-option value="section one">admin</a-option>
            <a-option value="section two">user</a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          field="userAvatar"
          label="用户头像"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.userAvatar" placeholder="请输入用户头像" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button html-type="submit">提交</a-button>
            <a-button @click="$refs.formRef.resetFields()">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const form_style = ref({
  size: "medium",
});

const form = ref({
  userAccount: "",
  userPassword: "",
  userName: "",
  userRole: "",
  userAvatar: "",
});

const handleSubmit = async () => {
  const res = await UserControllerService.addUserUsingPost({
    ...form.value,
  });
  if (res.code === 0) {
    message.success("添加用户成功");
  } else {
    message.error("添加用户失败");
  }
};
</script>
<style scoped>
#addUserView {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
