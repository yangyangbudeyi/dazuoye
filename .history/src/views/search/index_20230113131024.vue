<template>
  <div class="search">
      <div class="top">
          <p>{{ loading?"正在拼命查询":"已为您展示" }}<b>
            <el-tag type="success">{{ obj.keyword }}</el-tag></b
          >的相关文章
        </p>
        <p v-show="!loading">
          共<b>{{ total }}</b
          >条结果
        </p>
      </div>
        <Loading :height="210" class="searchLoading" :key="keyNum" :top="-165" v-show="loading"/>
      <div class="content" v-show="!loading" v-if="searchArticleData.length">
        <ArticleItemList :list="searchArticleData"></ArticleItemList>
        <Pagination
          :pageOn="obj.pageOn"
          :pageCount="obj.pageCount"
          :total="total"
          @changeNum="changeNum"
        ></Pagination>
      </div>
      <div class="result"  v-if="!searchArticleData.length && !loading">
        <el-result icon="warning" title="没有找到相关文章" />
      </div>
  </div>
</template>

<script lang="ts" setup>
import { getSearchArticle } from "@/api/request";
import { ISearchArtParams, IArticleData } from "@/types/article";
const route = useRoute();
const obj: ISearchArtParams = reactive({
  pageOn: 1,
  pageCount: 15,
  keyword: route.query.keyword as string,
});
const total = ref(0);
const keyNum = ref(0);
const loading = ref(false);
const searchArticleData = ref<IArticleData[]>([]);
onMounted(() => {
  loading.value = true
  getSearch();
});

//搜索文章
const getSearch = async (timer:number=1000) => {
  if(loading){
    loading.value = true
  }
  keyNum.value++
  if (!obj.keyword) return;
  const { data: res } = await getSearchArticle(toRaw(obj)).finally(()=>{
    setTimeout(()=>{
      loading.value = false
    },timer)
  })

  if (res.code != 200) {
    searchArticleData.value = [];
    total.value = 0;
    return;
  }
  searchArticleData.value = res.data;
  total.value = res.total;
};


watch(
  () => route.fullPath,
  () => {
    obj.keyword = route.query.keyword as string;
    getSearch(1000);
  }
);

//触发页码切换
const changeNum = (num: number) => {
  obj.pageOn = num;
  getSearch();
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style lang="scss" scoped>
.search {
  min-height: 200px;
  width: 1160px;
  margin: 0 auto;
  border-radius: 4px;
  overflow: hidden;
  padding: 0 !important;
  .searchLoading{
    position: relative;
    top: 10px;
  }
  .top {
    width: 100%;
    height: 60px;
    border-radius: 4px;
    background: var(--el-bg-color);
    display: flex;
    align-items: center;
    padding-left: 30px;
    box-sizing: border-box;
    overflow: hidden;
    p {
      margin-right: 30px;
      b {
        margin: 0 6px;
      }
    }
  }
  .content {
    margin-top: 10px;
    width: 100%;
    min-height: 200px;
    background: var(--el-bg-color);
    padding-bottom: 1px;
  }
  .result {
    margin-top: 10px;
    width: 100%;
    min-height: 200px;
    background: var(--el-bg-color);
  }
}
</style>
