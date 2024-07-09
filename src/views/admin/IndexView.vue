<template>
  <div id="indexView">
    <a-space direction="vertical" fill>
      <a-carousel
        :autoPlay="true"
        animation-name="card"
        show-arrow="never"
        indicator-position="outer"
        :style="{
          width: '1000px',
          height: '300px',
        }"
      >
        <a-carousel-item
          v-for="image in images"
          :style="{ width: '60%' }"
          :key="image"
        >
          <img
            :src="image"
            :style="{
              width: '100%',
            }"
          />
        </a-carousel-item>
      </a-carousel>

      <a-card style="width: 1000px; margin-top: 16px">
        <!--        <template #extra>-->
        <!--          <a-link>More</a-link>-->
        <!--        </template>-->
        <p style="color: cornflowerblue; font-size: medium">欢迎来到Duck OJ!</p>
      </a-card>
    </a-space>
  </div>
</template>
<script setup lang="ts">
const images = [
  "https://www.4kbizhi.com/d/file/2024/02/14/small100657R6zMg1707876417.jpg",
  "https://www.4kbizhi.com/d/file/2024/03/15/small170535FsKnQ1710493535.jpg",
  "https://www.4kbizhi.com/d/file/2024/02/23/small122058QgBSZ1708662058.jpg",
  "https://www.4kbizhi.com/d/file/2024/01/03/small101709Yhhr51704248229.jpg",
  "https://www.4kbizhi.com/d/file/2024/05/20/small082338m8n9W1716164618.jpg",
  "https://www.4kbizhi.com/d/file/2024/05/29/small0933498j25z1716946429.jpg",
  "https://www.4kbizhi.com/d/file/2024/03/06/small093330JVU421709688810.jpg",
];
</script>
<style scoped>
#indexView {
  display: flex;
  justify-content: center;
  justify-items: center;
}
</style>
