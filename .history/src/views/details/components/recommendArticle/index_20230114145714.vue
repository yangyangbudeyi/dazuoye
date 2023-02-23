<template>
  <div class="recommendArticle" v-if="recommendArt.length">
    <div class="tips">推荐博文:</div>
    <li @click="navigateDetails(item.artId??'')" v-for="(item,index) in recommendArt" :key="item.artId">
      <span>NO{{index+1}}</span>{{item.artTitle}}</li>

  </div>
</template>

<script setup lang="ts">
import {IArticleData} from "@/types/article";
defineProps<{recommendArt:IArticleData[]}>()

const router= useRouter()
//跳转文章详情
const navigateDetails = (artId:string)=>{
  router.push({name:"details",params:{artId}})
}


</script>

<style lang="scss" scoped>
.recommendArticle{
  width: 100%;
  min-height: 40px;
  padding: 15px;
  background: var(--el-bg-color);
  box-sizing: border-box;
  margin-bottom:  6px;
  border-radius: 4px;
  user-select: none;
  .tips{
    font-weight: 700;
    margin-bottom: 7px;
    color: var(--el-text-color-regular);
  }
  li{
    overflow: hidden;
    white-space: nowrap;
    height: 35px;
    line-height: 35px;
    text-overflow: ellipsis;
    cursor: pointer;
    transition: all .3s;
    color: #2c3e50;
    font-size: 14px;
    color: var(--el-text-color-regular);
    border-radius: 4px;
      padding: 0 4px 0 8px;
      box-sizing: border-box;
    &:hover{
      background: var(--el-bg-color-commonBg);
      color: teal;
    }
    span{
      margin-right: 6px;
    }
  }
}
</style>