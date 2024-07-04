<template>
  <div id="userInfoView">
    <a-card :style="{ width: '800px' }" title="个人信息">
      <template #extra>
        <a-link @click="handleUpdateClick">编辑</a-link>
      </template>
      <a-space>
        <p style="margin-left: 5px">头像：</p>
        <a-image
          width="50px"
          height="50px"
          :src="data.userAvatar"
          style="margin-bottom: 5px; margin-left: 2px"
        />
      </a-space>
      <a-descriptions
        :data="data"
        column="1"
        layout="inline-horizontal"
        style="margin-top: 10px"
        align="left"
        size="large"
      >
        <a-descriptions-item label="用户名:" span="2">
          {{ data.userName }}
        </a-descriptions-item>
        <a-descriptions-item label="个人简介:" span="2">
          {{ data.userProfile }}
        </a-descriptions-item>
        <a-descriptions-item label="角色:" span="2">
          {{ data.userRole }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <div class="updateUser">
      <a-modal
        v-model:visible="updateVisible"
        width="600px"
        @cancel="handleUpdateCancel"
        @before-ok="handleUpdateBeforeOk"
        draggable
        align-center="center"
      >
        <template #title>更新用户</template>
        <div>
          <a-card>
            <a-form
              layout="horizontal"
              ref="formRef"
              :size="form_style.size"
              :model="updateForm"
              bordered="false"
            >
              <a-form-item
                field="userName"
                label="用户名"
                :rules="[
                  { required: true, message: '用户名必须填写' },
                  { minLength: 4, message: '必须大于4位数' },
                ]"
              >
                <a-input
                  v-model="updateForm.userName"
                  placeholder="请输入用户名"
                />
              </a-form-item>
              <a-form-item field="userProfile" label="个人简介">
                <a-input
                  v-model="updateForm.userProfile"
                  placeholder="个人简介"
                />
              </a-form-item>
              <a-form-item
                field="userAvatar"
                label="用户头像"
                :validate-trigger="['change', 'input']"
              >
                <a-upload
                  action="/"
                  :fileList="file ? [file] : []"
                  :show-file-list="false"
                  @change="onUpdateChange"
                  @progress="onUpdateProgress"
                >
                  <template #upload-button>
                    <div
                      :class="`arco-upload-list-item${
                        file && file.status === 'error'
                          ? ' arco-upload-list-item-error'
                          : ''
                      }`"
                    >
                      <div
                        class="arco-upload-list-picture custom-upload-avatar"
                        v-if="file && file.url"
                      >
                        <img :src="file.url" />
                        <div class="arco-upload-list-picture-mask">
                          <IconEdit />
                        </div>
                        <a-progress
                          v-if="
                            file.status === 'uploading' && file.percent < 100
                          "
                          :percent="file.percent"
                          type="circle"
                          size="mini"
                          :style="{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                          }"
                        />
                      </div>
                      <div class="arco-upload-picture-card" v-else>
                        <div class="arco-upload-picture-card-text">
                          <IconPlus />
                          <div style="margin-top: 10px; font-weight: 600">
                            上传
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </a-upload>
              </a-form-item>
            </a-form>
          </a-card>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script setup lang="ts">
import store from "@/store";
import { onMounted, ref } from "vue";
import { UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

//表单样式
const form_style = ref({
  size: "medium",
});

let loginUser = store.state.user.loginUser;

let data = ref({
  userName: loginUser?.userName ?? "暂无信息",
  userProfile: loginUser?.userProfile,
  userAvatar: loginUser.userAvatar ?? "",
  userRole: loginUser.userRole === "admin" ? "管理员" : "普通用户",
});
// private String userName;
// private String userAvatar;
// private String userProfile;

/**
 * 更新会话:管理员
 */
const updateVisible = ref(false);

const file = ref();
const updateForm = ref({
  userAvatar: "",
  userName: "",
  userProfile: "",
});

//要更新的userId
const handleUpdateClick = () => {
  updateVisible.value = true;
  //回传数据
  updateForm.value = data.value as any;
};

const handleUpdateCancel = () => {
  updateVisible.value = false;
};

//头像
const onUpdateChange = (_, currentFile) => {
  file.value = {
    ...currentFile,
  };
  //给表单头像赋值
  updateForm.value.userAvatar = file.value.url;
};
const onUpdateProgress = (currentFile) => {
  file.value = currentFile;
};

//加载数据
const loadData = async () => {
  const res = await UserControllerService.getLoginUserUsingGet();
  if (res.code === 0) {
    message.success("获取用户信息成功");
    data.value = res.data as any;
  } else {
    message.error("获取用户信息失败");
  }
};
/**
 * 提交更新用户的请求：用户编辑个人信息
 */
const handleUpdateBeforeOk = async () => {
  const res = await UserControllerService.updateMyUserUsingPost(
    updateForm.value as any
  );
  updateVisible.value = false;
  if (res.code === 0) {
    message.success("编辑用户信息成功");
    loadData();
  } else {
    message.error("编辑用户信息失败," + res.message);
  }
};
</script>
<style scoped>
#userInfoView {
  display: flex;
  justify-content: center;
  justify-items: center;
}
</style>
