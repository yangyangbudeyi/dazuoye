<template>
  <div class="footer">
    <!-- <div class="github" @click="navigateGithub"></div> -->
    <div class="top">
      Copyright © 2021-2023 Miraitowa
      <span class="zhan"></span> helloxlj.top All
      Rights Reserved
      <span class="github" @click="navigateGithub"></span>
    </div>
    <div class="bottom">
      <span>备案号: </span
      ><a
        target="_blank"
        href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
        >津ICP备2021007424号-1</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
const navigateGithub = () => {
  window.open("https://github.com/boyxlj");
};
</script>

<style scoped lang="scss">
.footer {
  width: 1500px;
  height: 170px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  .top {
    user-select: none;
    margin-top: 14px;
    position: relative;
  .zhan{
    display: inline-block;
    /* margin: 0 8px 0 10px;
    padding-right: 10px; */
    width: 50px;
    height: 30px;
  }
    .github {
      display: inline-block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      position: absolute;
      background-image: url("../../assets/images/github.png");
      background-size: 100% 100%;
      transition: all 0.3s;
      left: 50%;
      transform: translateX(-50%);
      bottom: 4px;
      &:hover {
        /* transform: rotate(360deg); */
      }
    }
  }

  .bottom {
    margin-top: 14px;
    span {
      user-select: none;
    }
    a {
      text-decoration: none;
      color: var(--el-text-color-title);
      transition: all 0.3s;
      &:hover {
        color: #87ceeb;
      }
    }
  }
}
</style>
