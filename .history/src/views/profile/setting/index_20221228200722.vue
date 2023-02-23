<template>
  <div class="suggestion">
    <el-alert title="如有异常，请扫描下方二维码进入小程序->我的->留下你的反馈与建议！"
              :closable="false"
              :center="true"
              type="success" />
    <div class=code>
      <img src="../../../assets/images/codeImg.jpg" alt="">
    </div>
  </div>

</template>

<script lang="ts" setup>
onMounted(()=>{
  document.documentElement.scrollTop=0
})
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