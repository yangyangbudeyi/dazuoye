<template>
  <div class="notFound">
    <el-button class="btn" @click="navigateIndex">返回首页</el-button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const navigateIndex = ()=>{
  router.replace("/home")
}

</script>

<style lang="scss" scoped>
.notFound{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 999;
  background-image: url("../src/assets/images/404.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  object-fit: cover;
  .btn{
    position: fixed;
    left: 220px;
    bottom: 160px;
  }
}
</style>