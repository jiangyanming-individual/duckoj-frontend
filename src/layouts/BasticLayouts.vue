<template>
  <div id="layouts">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
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
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
<style scoped>
#layouts {
}

#layouts .header {
}

#layouts .content {
  background: linear-gradient(to left, #bbb, #fff);
  padding: 10px;
  margin-bottom: 16px;
}
#layouts .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
