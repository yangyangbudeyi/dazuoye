<template>
  <div class="pages">
    <LayOut></LayOut>
    <el-backtop style="width: 55px;height: 55px" :right="70"  :bottom="40" />
  </div>
</template>
<script setup lang="ts">
import LayOut from "@/layout/index.vue"

</script>
<style lang="scss" scoped>
.pages{
  margin: 0 auto;
  background-color: var(--el-bg-color-page);
  background-image: linear-gradient(to bottom ,
  var(--el-bg-color-bgLinearGradient1)
  var(--el-bg-color-bgLinearGradient2)
  var(--el-bg-color-bgLinearGradient3)
  var(--el-bg-color-bgLinearGradient4)
  
  );
}
</style>
