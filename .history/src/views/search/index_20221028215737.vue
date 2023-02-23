<template>
  <div class="search">
    <Loading  :height="600" :top="80" class="searchLoading" v-show="loading"/>
    <div v-show="!loading">
      <div class="top">
        <p>
          为您展示<b>
            <el-tag type="success">{{ obj.keyword }}</el-tag></b
          >的相关文章
        </p>
        <p>
          共<b>{{ total }}</b
          >条结果
        </p>
      </div>
      <div class="content" v-if="searchArticleData.length">
        <ArticleItemList :list="searchArticleData"></ArticleItemList>
        <Pagination
          :pageOn="obj.pageOn"
          :pageCount="obj.pageCount"
          :total="total"
          @changeNum="changeNum"
        ></Pagination>
      </div>
      <div class="result" v-else>
        <el-result icon="warning" title="没有找到相关文章" />
      </div>
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
const loading = ref(true);
const searchArticleData = ref<IArticleData[]>([]);
onMounted(() => {
  getSearch();
});

//搜索文章
const getSearch = async () => {
  if (!obj.keyword) return;
  const { data: res } = await getSearchArticle(toRaw(obj)).finally(()=>{
    setTimeout(()=>{
      loading.value = false
    },2000)
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
    getSearch();
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
    top: -40px;
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
