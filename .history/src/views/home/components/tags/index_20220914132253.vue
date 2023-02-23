<template>
  <div class="tags_article">
    <div class="top">
      <div class="title">分类标签</div>
    </div>
    <div class="item">
      <li @click="navigateTags(item.name)" v-for="item in data" :key="item.tagId">{{item.name}} </li>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ITagsData} from "@/types/article";
type TProps = {
  data:ITagsData[]
}
withDefaults(defineProps<TProps>(),{
  data:()=>[]
})

const router = useRouter()
const navigateTags = (key:string)=>{
  router.push(`/tags?key=${key}`)
}
</script>

<style lang="scss" scoped>
.tags_article{
  width: 100%;
  margin-bottom: 15px;
  min-height: 300px;
  padding: 15px 10px;
  box-sizing: border-box;
  background: var(--el-bg-color);
  position: sticky;
  top: 68px;
  border-radius: 4px;
  user-select: none;
  .top{
    height: 45px;
    line-height: 40px;
    border-bottom: 1px solid var(--el-border-color);
    box-sizing: border-box;
    padding-left: 6px;
    .title{
      font-size: 22px;
    }
  }
  .item{
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
    border-radius: 4px;
    li {
      margin: 0px 15px 18px;
      list-style: none;
      width: 40%;
      padding: 6px 15px;
      border: 1.6px solid #ddd;
      cursor: pointer;
      text-align: center;
      box-sizing: border-box;
      transition: .2s ease-in;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
      color: #747171;
      &:hover {
        background: var(--el-bg-color-commonBg);
      }

    }
  }
}
</style>