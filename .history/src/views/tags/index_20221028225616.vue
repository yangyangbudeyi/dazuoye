<template>
  <div class="tags" >
    <div class="top">
      <p>为您展示<b>
        <el-tag type="success">{{obj.key}}</el-tag></b>标签的相关文章</p> 
        <p>共<b>{{total}}</b>条结果</p>
    </div>
    <Loading :height="210" class="searchLoading" :key="keyNum" :top="-165" v-show="loading"/>
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
import { getSelectTagsArt} from "@/api/request";
import {IArticleData} from "@/types/article";
import {ITagParams} from "@/types/tags"
const route = useRoute()
const obj:ITagParams = reactive({
  pageOn:1,
  pageCount:15,
  key:route.query.key as string
})
const total = ref(0)
const keyNum = ref(0);
const loading = ref(false);
const searchArticleData = ref<IArticleData[]>([])
onMounted(()=>{
  loading.value = true
  getTags()
})

//搜索文章
const getTags = async (timer:number=1000)=>{
  if(!obj.key) return
  if(loading){
    loading.value = true
  }
  keyNum.value++
  const {data:res} = await getSelectTagsArt(toRaw(obj)).finally(()=>{
    setTimeout(()=>{
      loading.value = false
    },timer)
  })
  if(res.code!=200) {
    searchArticleData.value = []
    total.value=0
    return
  }
  searchArticleData.value = res.data
  total.value = res.total
}


//触发页码切换
const changeNum = (num:number)=>{
  obj.pageOn = num
  getTags()
  document.documentElement.scrollTo({
    top:0,
    behavior:"smooth"
  })
}

watch(
  () => route.fullPath,
  () => {
    obj.key = route.query.key as string;
    getTags(600)
  }
);

</script>

<style lang="scss" scoped>
.tags{
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
    p{
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