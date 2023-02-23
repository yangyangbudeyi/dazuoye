<template>
  <div class="suggestion">
   <h1>个性设置</h1>
   <div class="line">
    <el-switch  size="large" v-model="line" />
   </div>
  </div>

</template>

<script lang="ts" setup>
const line = ref(false)
</script>

<style lang="scss" scoped>
.suggestion{
  overflow: hidden;
  user-select: none;
  background: red;
  margin-top: 30px;
  padding: 0 30px;
  box-sizing: border-box;
}
</style>