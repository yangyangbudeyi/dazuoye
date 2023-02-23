<template>
  <div class="notFound">
    <div class="bg"></div>
    <p>您访问的页面丢失啦~</p>
    <el-button class="btn" @click="navigateIndex">回到首页</el-button>
    <el-button class="btn btn1" @click="navigateIndex">返回上一步</el-button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const navigateIndex = () => {
  router.replace("/home");
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
    /* background: red; */
    position: relative;
    transition: all .3s;
    top: -50px;
    left: 20px;
    &:hover{
      transform: scale(1.1);
    }
  }
  p{
    position: absolute;
    bottom: 190px;
    font-size: 20px;
  }
  .btn {
    position: absolute; 
     bottom: 130px;
  }
}
</style>
