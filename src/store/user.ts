import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),

  //异步调用mutations
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // todo 从远程请求获取登录信息
      commit("updateUser", payload); //loginUser
    },
  },
  //同步调用更新state
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
