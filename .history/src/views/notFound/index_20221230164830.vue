<template>
  <div class="notFound">
    <div class="bg"></div>
    <p>您访问的页面丢失啦~</p>
    <div class="btns">
      <el-button class="btn" @click="navigateIndex">返回到首页</el-button>
      <el-button class="btn" @click="navigateGoBack">返回上一步</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const navigateIndex = () => {
  router.replace("/home");
};
const navigateGoBack = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.notFound {
  width: 100%;
  background: #fff;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  user-select: none;
  .bg {
    width: 400px;
    height: 320px;
    background-image: url("../../assets/images/404.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    object-fit: cover;
    position: relative;
    transition: all .3s;
    top: -90px;
    left: 20px;
    &:hover{
      transform: scale(1.1);
    }
  }
  p{
    position: absolute;
    bottom: 170px;
    font-size: 26px;
  }
  .btns {
    position: absolute; 
     bottom: 120px;
  }
}
</style>
