<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <div class="title-bar">
          <a-space>
            <img class="logo" src="../assets/duck.svg" />
            <div class="title">Duck OJ</div>
          </a-space>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://blog.csdn.net/JEREMY_GYJ" target="_blank"
          >Created By灰太狼家的小鸭子</a
        >
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
  margin-bottom: 10px;
}

#userLayout .header {
}

#userLayout .logo {
  width: 70px;
  height: 70px;
}

#userLayout .content {
  padding: 10px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
