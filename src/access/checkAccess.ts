import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 校验权限
 * @param loginUser
 * @param needAccess
 * return：boolean
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  //不用登录的权限
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  //用户权限
  if (needAccess === ACCESS_ENUM.USER) {
    //如果没有登录就返回false
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  //管理员的权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    //如果不为管理员就返回false
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  //其他情况返回true
  return true;
};

export default checkAccess;
