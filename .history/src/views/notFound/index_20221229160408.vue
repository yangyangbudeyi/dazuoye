<template>
  <div class="notFound">
    <div class="bg"></div>
    <p>您访问的页面丢失啦~</p>
    <el-button class="btn" @click="navigateIndex">返回首页</el-button>
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
  /* width: 100%;
  height: 100%;
  position: fixed; */
  width: 100%;
  left: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 999;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  user-select: none;
  .bg {
    width: 400px;
    height: 350px;
    background-image: url("../../assets/images/404.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    object-fit: cover;
    background: red;
    position: relative;
    transition: all .3s;
    top: -50px;
    left: 20px;
    &:hover{
      transform: scale(1.2);
    }
  }
  p{
    position: absolute;
    bottom: 100px;
    font-size: 22px;
  }
  .btn {
    position: absolute;
    bottom: 50px;
  }
}
</style>
