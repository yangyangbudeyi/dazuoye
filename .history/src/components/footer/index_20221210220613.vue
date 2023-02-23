<template>
<div class="footer">
  <div class="github" @click="navigateGithub"></div>
  <div class="top">Copyright © 2021-2022 Miraitowa helloxlj.top All Rights Reserved</div>
  <div class="bottom"><span>备案号: </span><a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/recordQuery">津ICP备2021007424号-1</a></div>
</div>
</template>

<script lang="ts" setup>
const navigateGithub = ()=>{
  console.log("124")
}
</script>

<style scoped lang="scss">
.footer{
  width: 1500px;
  height: 160px;
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
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-image: url("../../assets/images/github.png");
    background-size: 100% 100%;
    transition: all .3s;
    &:hover{
      transform: rotate(360deg);
    }
  }
  .bottom{
    margin-top: 14px;
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