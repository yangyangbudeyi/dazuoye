<template>
  <div class="pages">
    <LayOut></LayOut>
    <el-backtop style="width: 55px;height: 55px ;position: fixed; right: 3.6%;" :bottom="40" />
  </div>
</template>
<script setup lang="ts">
import LayOut from "@/layout/index.vue"

</script>
<style lang="scss" scoped>
.pages{
  margin: 0 auto;
  background-color: var(--el-bg-color-page);
}
</style>
