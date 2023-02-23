<template>
  <Loading v-show="loading"/>
  <div class="like" v-show="!loading>
    <el-result
        class="result"
        icon="warning"
        style="margin-top: 70px"
        title="暂无点赞记录"
    />
  </div>

</template>

<script lang="ts" setup>
const loading = ref(true)
onMounted(()=>{
  document.documentElement.scrollTop=0
  setTimeout(()=>{
    loading.value = false
  },1000)
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