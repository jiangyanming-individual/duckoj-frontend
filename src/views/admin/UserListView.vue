<template>
  <div id="UserListView">
    <a-form :model="searchParams" layout="inline" style="margin-bottom: 16px">
      <a-form-item field="id" label="用户ID">
        <a-input
          v-model="searchParams.id"
          placeholder="请输入用户Id"
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item field="userName" label="用户名">
        <a-input
          v-model="searchParams.userName"
          placeholder="请输入用户名"
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
      <a-button type="primary" style="margin-left: 310px" @click="handleClick"
        >新增
      </a-button>
    </a-form>
    <a-table
      :columns="columns"
      :data="dataList"
      :scroll="scroll"
      :scrollbar="scrollbar"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>

      <template #userAvatar="{ record }">
        <a-image width="50px" height="50px" :src="record.userAvatar" />
      </template>
      <template #userRole="{ record }">
        <p>{{ record.userRole === "user" ? "用户" : "管理员" }}</p>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button
            type="primary"
            status="warning"
            @click="handleUpdateClick(record)"
            >更改
          </a-button>

          <a-button status="danger" type="primary" @click="doDeleteUser(record)"
            >删除
          </a-button>
        </a-space>
      </template>
    </a-table>
    <div class="addUser">
      <a-modal
        v-model:visible="visible"
        width="600px"
        @cancel="handleCancel"
        @before-ok="handleBeforeOk"
        draggable
        align-center="center"
      >
        <template #title>添加用户</template>
        <div>
          <a-card>
            <a-form
              layout="horizontal"
              ref="formRef"
              :size="form_style.size"
              :model="addForm"
              bordered="false"
            >
              <a-form-item
                field="userAccount"
                label="用户账户名"
                :rules="[
                  { required: true, message: '账户名必须填写' },
                  { minLength: 4, message: '必须大于4位数' },
                ]"
              >
                <a-input
                  v-model="addForm.userAccount"
                  placeholder="请输入账户名"
                />
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
                  v-model="addForm.userPassword"
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
              >
                <a-input
                  v-model="addForm.userName"
                  placeholder="请输入用户名"
                />
              </a-form-item>
              <a-form-item
                field="userRole"
                label="用户角色"
                :rules="[
                  { match: /admin/, message: '必须选择一个' },
                  { required: true, message: '角色必须选择' },
                ]"
              >
                <a-select
                  v-model="addForm.userRole"
                  placeholder="请选择角色"
                  allow-clear
                >
                  <a-option value="admin">管理员</a-option>
                  <a-option value="user">普通用户</a-option>
                </a-select>
              </a-form-item>

              <a-form-item
                field="gender"
                label="用户性别"
                :rules="[
                  { match: /男/, message: '必须选择一个' },
                  { required: true, message: '性别必须选择' },
                ]"
              >
                <a-select
                  v-model="addForm.gender"
                  placeholder="性别"
                  allow-clear
                >
                  <a-option value="男">男</a-option>
                  <a-option value="女">女</a-option>
                </a-select>
              </a-form-item>

              <a-form-item field="email" label="邮箱">
                <a-input v-model="addForm.email" placeholder="请输入邮箱" />
              </a-form-item>

              <a-form-item field="phone" label="手机号">
                <a-input v-model="addForm.phone" placeholder="请输入手机号" />
              </a-form-item>

              <a-form-item field="userState" label="用户状态">
                <a-select
                  v-model="addForm.userState"
                  placeholder="请选择用户状态"
                  allow-clear
                >
                  <a-option value="正常">正常</a-option>
                  <a-option value="注销">注销</a-option>
                  <a-option value="封号">封号</a-option>
                </a-select>
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
                  @change="onChange"
                  :custom-request="uploadAvatar"
                >
                  <template #upload-button>
                    <div
                      class="arco-upload-list-picture custom-upload-avatar"
                      v-if="addForm.userAvatar"
                    >
                      <a-avatar :size="60" shape="circle">
                        <img alt="头像" :src="addForm.userAvatar" />
                      </a-avatar>
                      <div class="arco-upload-list-picture-mask">
                        <IconEdit />
                      </div>
                    </div>
                    <div class="arco-upload-picture-card" v-else>
                      <div class="arco-upload-picture-card-text">
                        <IconPlus />
                        <div style="margin-top: 10px; font-weight: 600">
                          上传
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
              <a-form-item
                field="userRole"
                label="用户角色"
                :rules="[
                  { match: /admin/, message: '必须选择一个' },
                  { required: true, message: '角色必须选择' },
                ]"
              >
                <a-select
                  v-model="updateForm.userRole"
                  placeholder="请选择角色"
                  allow-clear
                >
                  <a-option value="admin">管理员</a-option>
                  <a-option value="user">普通用户</a-option>
                </a-select>
              </a-form-item>
              <a-form-item
                field="gender"
                label="用户性别"
                :rules="[
                  { match: /男/, message: '必须选择一个' },
                  { required: true, message: '性别必须选择' },
                ]"
              >
                <a-select
                  v-model="updateForm.gender"
                  placeholder="性别"
                  allow-clear
                >
                  <a-option value="男">男</a-option>
                  <a-option value="女">女</a-option>
                </a-select>
              </a-form-item>

              <a-form-item field="email" label="邮箱">
                <a-input v-model="updateForm.email" placeholder="请输入邮箱" />
              </a-form-item>

              <a-form-item field="phone" label="手机号">
                <a-input
                  v-model="updateForm.phone"
                  placeholder="请输入手机号"
                />
              </a-form-item>

              <a-form-item field="userState" label="用户状态">
                <a-select
                  v-model="updateForm.userState"
                  placeholder="请选择用户状态"
                  allow-clear
                >
                  <a-option value="正常">正常</a-option>
                  <a-option value="注销">注销</a-option>
                  <a-option value="封号">封号</a-option>
                </a-select>
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
                  :custom-request="updateUploadAvatar"
                >
                  <template #upload-button>
                    <div
                      class="arco-upload-list-picture custom-upload-avatar"
                      v-if="updateForm.userAvatar"
                    >
                      <a-avatar :size="60" shape="circle">
                        <img alt="头像" :src="updateForm.userAvatar" />
                      </a-avatar>
                      <div class="arco-upload-list-picture-mask">
                        <IconEdit />
                      </div>
                    </div>
                    <div class="arco-upload-picture-card" v-else>
                      <div class="arco-upload-picture-card-text">
                        <IconPlus />
                        <div style="margin-top: 10px; font-weight: 600">
                          上传
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
import { onMounted, ref, watchEffect } from "vue";
import {
  FileControllerService,
  User,
  UserAddRequest,
  UserControllerService,
  UserQueryRequest,
  UserUpdateRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import user from "@/store/user";
import { FileItem, Message } from "@arco-design/web-vue";

const router = useRouter();
const dataList = ref([]);
const total = ref(0);

//可视化
const visible = ref(false);

//表单样式
const form_style = ref({
  size: "medium",
});

//分页查询参数
const searchParams = ref<UserQueryRequest>({
  id: undefined,
  userName: undefined,
  current: 1,
  pageSize: 10,
});

/**
 * 加载用户列表：
 */
const loadData = async () => {
  //获取数据
  const res = await UserControllerService.listUserByPageUsingPost({
    ...searchParams.value,
    sortField: "createTime",
    sortOrder: "descend",
  });
  //获取分页数据
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("获取用户列表失败," + res.message);
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
 *搜索符合条件的用户
 */
const doSubmit = () => {
  //执行搜索，然后触发watchEffect监听搜索条件的变化
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

/**
 * 删除用户
 * @param user
 */
const doDeleteUser = async (user: User) => {
  if (user.id == null) {
    message.error("用户id不存在！");
    return;
  }
  //异步调用，post请求
  const res = await UserControllerService.deleteUserUsingPost({ id: user.id });
  if (res.code === 0) {
    message.success("删除用户成功！");
    //加载信息的数据
    loadData();
  } else {
    message.error("添加用户失败," + res.message);
  }
};

/**
 * 新增form参数：
 */
const addForm = ref({
  userAccount: "",
  userAvatar: "",
  userName: "",
  userPassword: "",
  userRole: "",
  gender: "",
  email: "",
  phone: "",
  userState: "",
});

/**
 * 提交头像：
 */
const file = ref();
const onChange = async (_: never, currentFile: FileItem) => {
  file.value = {
    ...currentFile,
  };
};
// const onProgress = (currentFile: FileItem) => {
//   file.value = currentFile;
// };

//上传头像：
const uploadAvatar = async () => {
  const res = await FileControllerService.uploadOssFileUsingPost(
    file.value.file
  );
  if (res.code === 0) {
    //提交到阿里云：
    addForm.value.userAvatar = res.data;
    Message.success("上传成功，点击确认即可修改头像");
  } else {
    Message.error("上传失败！" + res.message);
  }
};

/**
 *
 * 提交addUser表单
 */
const handleClick = () => {
  visible.value = true;
};

const handleCancel = () => {
  visible.value = false;
};

/**
 * 提交addUser表单
 */
const handleBeforeOk = async () => {
  const res = await UserControllerService.addUserUsingPost({
    ...addForm.value,
  });
  visible.value = false;
  if (res.code === 0) {
    message.success("添加用户成功");
    //重新加载数据
    loadData();
  } else {
    message.error("添加用户失败," + res.message);
  }
};

/**
 * 更新用户:管理员
 */
const updateVisible = ref(false);

const updateForm = ref({
  email: "",
  gender: "",
  id: "",
  phone: "",
  userAvatar: "",
  userName: "",
  userProfile: "",
  userRole: "",
  userState: "",
});

const loadUserInfo = async (id: number) => {
  const res = await UserControllerService.getUserByIdUsingGet(id);
  if (res.code === 0) {
    updateForm.value = res.data;
  } else {
    message.error("加载数据失败," + res.code);
  }
};

//要更新的userId
const handleUpdateClick = (user: User) => {
  updateVisible.value = true;
  updateForm.value.id = user.id as any;
  loadUserInfo(updateForm.value.id as any);
};

const handleUpdateCancel = () => {
  updateVisible.value = false;
};

//头像
const onUpdateChange = async (_: never, currentFile: FileItem) => {
  file.value = {
    ...currentFile,
  };
  //给表单头像赋值
  updateForm.value.userAvatar = file.value.file;
};
// const onUpdateProgress = (currentFile: FileItem) => {
//   file.value = currentFile;
// };

//上传头像：
const updateUploadAvatar = async () => {
  const res = await FileControllerService.uploadOssFileUsingPost(
    file.value.file
  );
  if (res.code === 0) {
    //提交到阿里云：
    updateForm.value.userAvatar = res.data;
    Message.success("上传成功，点击确认即可修改头像");
  } else {
    Message.error("上传失败！" + res.message);
  }
};

/**
 * 提交更新用户的请求：
 */
const handleUpdateBeforeOk = async () => {
  const res = await UserControllerService.updateUserUsingPost(
    updateForm.value as any
  );
  updateVisible.value = false;
  if (res.code === 0) {
    message.success("添加用户成功");
    //重新加载数据
    loadData();
  } else {
    message.error("添加用户失败," + res.message);
  }
};

const scrollbar = ref(true);

//表格滚动：
const scroll = {
  x: 1500,
  y: 400,
};

/**
 * 表格列：
 */
const columns = [
  {
    title: "用户ID",
    dataIndex: "id",
  },
  {
    title: "账号",
    dataIndex: "userAccount",
  },
  {
    title: "用户名",
    dataIndex: "userName",
  },
  {
    title: "用户头像",
    dataIndex: "userAvatar",
    slotName: "userAvatar",
  },
  {
    title: "角色",
    slotName: "userRole",
  },

  {
    title: "性别",
    dataIndex: "gender",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "手机号",
    dataIndex: "phone",
  },
  {
    title: "用户状态",
    dataIndex: "userState",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
    width: 120,
  },
];
</script>
<style scoped>
#UserListView {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
