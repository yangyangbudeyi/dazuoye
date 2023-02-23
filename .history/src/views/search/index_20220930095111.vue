<template>
  <div class="search" >
    <div class="top">
      <span >为您展示<b>{{obj.keyword}}</b>的相关文章</span> <span>共<b>{{total}}</b>条结果</span>
    </div>
    <div class="content"  v-if="searchArticleData.length">
      <ArticleItemList :list="searchArticleData"></ArticleItemList>
      <Pagination
          :pageOn="obj.pageOn"
          :pageCount="obj.pageCount"
          :total="total"
          @changeNum = changeNum
      ></Pagination>
    </div>
    <div class="result" v-else>
      <el-result
          icon="warning"
          title="没有找到相关文章"
      />
    </div>


  </div>


</template>

<script lang="ts" setup>
import { ElLoading } from 'element-plus'
import {getSearchArticle} from "@/api/request";
import {ISearchArtParams,IArticleData} from "@/types/article";
const route = useRoute()
const obj:ISearchArtParams = reactive({
  pageOn:1,
  pageCount:4,
  keyword:route.query.keyword as string
})
const total = ref(0)
const searchArticleData = ref<IArticleData[]>([])
onMounted(()=>{
  getSearch()
})

//搜索文章
const getSearch = async ()=>{
  if(!obj.keyword) return
  const {data:res} = await getSearchArticle(toRaw(obj))
  if(res.code!=200) {
    searchArticleData.value = []
    total.value=0
    return
  }
  searchArticleData.value = res.data
  total.value = res.total
}

watch(()=>route.fullPath,()=>{
  obj.keyword = route.query.keyword as string
  getSearch()
})

//触发页码切换
const changeNum = (num:number)=>{
  obj.pageOn = num
  getSearch()
  document.documentElement.scrollTo({
    top:0,
    behavior:"smooth"
  })
}
</script>

<style lang="scss" scoped>
.search{
  min-height:200px ;
  width: 1160px;
  margin: 0 auto;
  border-radius: 4px;
  ::v-deep(.el-loading-parent--relative){
    z-index: -1 !important;
  }
  .top{
    width: 100%;
    height: 60px;
    border-radius: 4px;
    background: var(--el-bg-color);
    display: flex;
    align-items: center;
    padding-left: 30px;
    box-sizing: border-box;
    span{
      margin-right: 30px;
      b{
        margin: 0 6px;
      }
    }
  }
  .content{
    margin-top: 10px;
    width: 100%;
    min-height: 200px;
    background: var(--el-bg-color);
    padding-bottom: 1px;
  }
  .result{
    margin-top: 10px;
    width: 100%;
    min-height: 200px;
    background: var(--el-bg-color);
  }
}
</style>