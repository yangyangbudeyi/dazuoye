<template>
  <div class="pageView_info">
    <li class="artDate">文章发布于: <span>{{getTimeBefore(artDate)}}</span> </li>
    <li v-if="updatetime" class="updateDate">最近一次修改时间: <span>{{getTimeBefore(updatetime)}}</span> </li>
    <li>浏览: {{pageView}}</li>
    <li>评论: {{artPcomment}}</li>
    <li>收藏: {{collectCount}}</li>

  </div>
</template>

<script setup lang="ts">
import {getTimeBefore} from "@/utils/getTimeBefore"
const props = defineProps<{
  updatetime:string,
  pageView:string,
  artDate:string,
  collectCount:number,
  artPcomment:number|string|0,
}>()



</script>

<style lang="scss" scoped>
.pageView_info{
  width: 100%;
  min-height: 130px;
  padding: 15px;
  background: var(--el-bg-color);
  box-sizing: border-box;
  margin-bottom: 10px;
  border-radius: 4px;
  user-select: none;
  li{
    margin: 4px 0;
  }
}
</style>