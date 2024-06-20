import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
//定义路由跳转的权限：
router.beforeEach(async (to, from, next) => {
  const loginUser = store.state.user.loginUser;
  //自动登录：
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
  }

  //需要的权限：
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;

  //如果要跳转的页面需要登录：
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登陆，跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }

    //如果已经登录了但是不是管理员权限；
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  //正常跳转：
  next();
});
