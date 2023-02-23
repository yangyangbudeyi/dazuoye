<template>
  <div class="suggestion">
   <h1>个性设置</h1>
  </div>

</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.suggestion{
  overflow: hidden;
  user-select: none;
  .el-alert{
    margin: 50px auto 0;
    width: 88%;

  }
  .code{

    width: 250px;
    height:  250px;
    margin: 40px auto 0;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>