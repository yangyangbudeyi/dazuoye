<template>
<div class="footer">
  <div class="top">Copyright © 2021-2022 Miraitowa helloxlj.top All Rights Reserved</div>
  <div class="github"></div>
  <div class="bottom"><span>备案号: </span><a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/recordQuery">津ICP备2021007424号-1</a></div>
</div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.footer{
  width: 1500px;
  height: 100px;
  margin:0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  .top{
    user-select: none;
    margin-top: 14px;
  }
  .github{
    width: 60px;
    height: 60px;
    background-image: url("../../assets/images/github.png");
  }
  .bottom{
    margin-top: 8px;
    span{
      user-select: none;
    }
    a{
      text-decoration: none;
      color:var(--el-text-color-title);
      transition: all .3s;
      &:hover{
        color: #87CEEB;
      }
    }
  }
}

</style>