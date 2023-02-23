<template>
  <div class="home">
    <div class="left" >
      <div class="skeleton" v-if="!articleData.length">
        <el-skeleton :animated="true"/>
        <el-skeleton :animated="true"/>
        <el-skeleton :animated="true"/>
      </div>
     <ArticleItemList v-else :isCollect="false"  :list="articleData"></ArticleItemList>
      <Pagination
          v-if="isShow"
          :pageOn="objParams.pageOn"
          :pageCount="objParams.pageCount"
          :total="total"
          @changeNum = changeNum
      ></Pagination>
    </div>
    <div class="right">
      <HotArticle @changeHotSort="changeHotSort"  v-loading="hotArticleLoading" :data="hotArticleByData"></HotArticle>
      <Tags v-loading="tagsLoading" :data="articleTagsData"></Tags>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HotArticle from "./components/hotArticle/index.vue"
import Tags from "./components/tags/index.vue"
import {getIndexArtAll,getIndexHotArtByTime,getIndexHotArtByPreview,getTagsAll} from "@/api/request"
import {IIndexArticleParams} from "./types";
import {IArticleData,ITagsData} from "@/types/article";
const objParams:IIndexArticleParams = reactive({
  pageOn:1,
  pageCount:15
})
let total = ref(0)
let isShow = ref(false)
let tagsLoading = ref(false)
let hotArticleLoading = ref(false)
let hostArticleSort = ref(false)
const articleData = ref<IArticleData[]>([])   //首页文章
const hotArticleByData = ref<IArticleData[]>([])   //首页热门文章
const articleTagsData = ref<ITagsData[]>([])   //首页文章标签

//触发页码切换
const changeNum = (num:number)=>{
  objParams.pageOn = num
  getArticle()
  document.documentElement.scrollTo({
    top:0,
    behavior:"smooth"
  })
}


onMounted(()=>{
  getArticle()
  getTags()
  const val = sessionStorage.getItem("indexSort")
  if(val){
    if(val==="preview"){
      hostArticleSort.value = false
      getArticleByPreview()
    }else{
      hostArticleSort.value = true
      getArticleByTime()
    }
  }else{
    hostArticleSort.value = false
    getArticleByPreview()
  }

})

//监听切换热门文章排序方式
const changeHotSort = (value:boolean)=>{
  if(value){  //按时间
    getArticleByTime()
    sessionStorage.setItem("indexSort","timer")  //true
  }else{  //按访问
    getArticleByPreview()
    sessionStorage.setItem("indexSort","preview")   //false
  }
}

//获取首页文章
const getArticle = async ()=>{
  const {data:res} = await  getIndexArtAll(toRaw(objParams)).finally(()=>{
    isShow.value= true
  })
  if(res.code!=200) return
  setTimeout(()=>{
    articleData.value = res.data

  },2000)
  total.value = res.total
}

//获取首页热门文章(通过预览量)
const getArticleByPreview =async ()=>{
  hotArticleLoading.value = true
  const {data:res} = await getIndexHotArtByPreview(1,8).finally(()=>{
    setTimeout(()=>{
      hotArticleLoading.value=false
    },300)
  })
  if(res.code!=200) return
  hotArticleByData.value = res.data
}
//获取首页热门文章(通过时间)
const getArticleByTime =async ()=>{
  hotArticleLoading.value = true
  const {data:res} = await getIndexHotArtByTime().finally(()=>{
    setTimeout(()=>{
      hotArticleLoading.value=false
    },300)
  })
  if(res.code!=200) return
  hotArticleByData.value = res.data
}



//获取所有文章标签
const getTags =async ()=>{
  tagsLoading.value = true
  const {data:res} = await getTagsAll().finally(()=>tagsLoading.value=false)
  if(res.code!=200) return
  articleTagsData.value = res.data
}

</script>

<style lang="scss" scoped>
.home {
  border-top: 1px solid transparent;
  padding: 0 50px 20px;
  position: relative;
  min-height: 80vh;
  display: flex;
  width: 1260px;
  margin: 0 auto;
  justify-content: space-between;
  .left {
    width: 72%;
    min-height: 60vh;
    background: var(--el-bg-color);
    border-radius: 4px;
    .skeleton{
      padding: 20px 30px;
      box-sizing: border-box;
     .el-skeleton{
      margin-bottom: 30px;
     }
    }
    .pageNation{
      margin:25px 15px 40px;
    }
  }
  .right {
    width: 27%;
    min-height: 300px;
  ::v-deep(.el-loading-parent--relative){
    z-index: 666;
  }
  }
}
</style>