<template>
  <Loading v-show="loading/>
  <div class="like">
    <el-result
        class="result"
        icon="warning"
        style="margin-top: 70px"
        title="暂无点赞记录"
    />
  </div>

</template>

<script lang="ts" setup>
onMounted(()=>{
  document.documentElement.scrollTop=0
})
</script>

<style lang="scss" scoped>
.like{
  overflow: hidden;
  user-select: none;
  .result{
  margin-top: 156px !important;
  }

}
</style>