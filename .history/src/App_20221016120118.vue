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
  rgb(243, 221, 221),
  rgb(225, 231, 247),
  rgb(214, 234, 241),
  rgb(246, 220, 248)
  );
}
</style>
