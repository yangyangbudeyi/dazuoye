<template>
  <div class="home">
    <div class="left">
      <div class="skeleton" v-if="!articleData.length">
        <el-skeleton v-for="item in 6" :key="item" :animated="true">
          <template #template>
            <div>
              <el-skeleton-item class="items" style="width: 40%" />
            </div>
            <div>
              <el-skeleton-item class="items" style="width: 80%" />
            </div>
            <div>
              <el-skeleton-item class="items" style="width: 66%" />
            </div>
            <div>
              <el-skeleton-item class="items" style="width: 40%" />
            </div>
            <div class="avatar">
              <el-skeleton-item
                class="items imgs"
                variant="image"
                style="width: 100%"
              />
            </div>
          </template>
        </el-skeleton>
      </div>
      <ArticleItemList
        v-else
        :isCollect="false"
        :list="articleData"
      ></ArticleItemList>
      <Pagination
        v-if="total"
        :pageOn="objParams.pageOn"
        :pageCount="objParams.pageCount"
        :total="total"
        @changeNum="changeNum"
      ></Pagination>
    </div>
    <div class="right">
      <HotArticle
        @changeHotSort="changeHotSort"
        :hotArticleLoading="hotArticleLoading"
        :data="hotArticleByData"
      ></HotArticle>
      <Tags v-loading="tagsLoading" :data="articleTagsData"></Tags>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HotArticle from "./components/hotArticle/index.vue";
import Tags from "./components/tags/index.vue";
import {
  getIndexArtAll,
  getIndexHotArtByTime,
  getIndexHotArtByPreview,
  getTagsAll,
} from "@/api/request";
import { IIndexArticleParams } from "./types";
import { IArticleData, ITagsData } from "@/types/article";
const objParams: IIndexArticleParams = reactive({
  pageOn: 1,
  pageCount: 15,
});
let total = ref(0);
let isShow = ref(false);
let tagsLoading = ref(false);
let hotArticleLoading = ref(false);
let hostArticleSort = ref(false);
const articleData = ref<IArticleData[]>([]); //????????????
const hotArticleByData = ref<IArticleData[]>([]); //??????????????????
const articleTagsData = ref<ITagsData[]>([]); //??????????????????

//??????????????????
const changeNum = (num: number) => {
  objParams.pageOn = num;
  getArticle();
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  getArticle();
  getTags();
  const val = sessionStorage.getItem("indexSort");
  if (val) {
    if (val === "preview") {
      hostArticleSort.value = false;
      getArticleByPreview();
    } else {
      hostArticleSort.value = true;
      getArticleByTime();
    }
  } else {
    hostArticleSort.value = false;
    getArticleByPreview();
  }
});

onActivated(()=>{
  console.log(123)
  document.title="??????"
})

//????????????????????????????????????
const changeHotSort = (value: boolean) => {
  if (value) {
    //?????????
    getArticleByTime("loading");
    sessionStorage.setItem("indexSort", "timer"); //true
  } else {
    //?????????
    getArticleByPreview("loading");
    sessionStorage.setItem("indexSort", "preview"); //false
  }
};

//??????????????????
const getArticle = async () => {
  const { data: res } = await getIndexArtAll(toRaw(objParams)).finally(() => {
    isShow.value = true;
  });
  if (res.code != 200) return;
  setTimeout(() => {
    articleData.value = res.data;
    total.value = res.total;
  }, 1000);
};

//????????????????????????(???????????????)
const getArticleByPreview = async (params?:string) => {
  if(params){
    hotArticleLoading.value = true
  }
  hotArticleByData.value = [];
  const { data: res } = await getIndexHotArtByPreview(1, 8)
  if (res.code != 200) return;
  setTimeout(() => {
    hotArticleByData.value = res.data;
    hotArticleLoading.value = false;
  }, 1000);
};
//????????????????????????(????????????)
const getArticleByTime = async (params?:string) => {
  if(params){
    hotArticleLoading.value = true
  }
  hotArticleByData.value = [];
  const { data: res } = await getIndexHotArtByTime()
  if (res.code != 200) return;
  setTimeout(() => {
    hotArticleByData.value = res.data;
    hotArticleLoading.value = false;
  }, 1000);
};

//????????????????????????
const getTags = async () => {
  tagsLoading.value = true;
  const { data: res } = await getTagsAll().finally(
    () => (tagsLoading.value = false)
  );
  if (res.code != 200) return;
  setTimeout(() => {
    articleTagsData.value = res.data;
  }, 1000);
};
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
    .skeleton {
      padding: 20px 30px;
      box-sizing: border-box;

      .el-skeleton {
        padding-bottom: 8px;
        margin: 10px 0 16px;
        position: relative;
        border-bottom: 1px solid var(--el-border-color);
        .avatar {
          position: absolute;
          right: 10px;
          width: 100px;
          height: 60px;
          bottom: 33px;
          .imgs {
            height: 60px;
            border-radius: 5px;
          }
        }
        .items {
          height: 15px;
          margin-bottom: 9px;
        }
      }
    }
    .pageNation {
      margin: 25px 15px 40px;
    }
  }
  .right {
    width: 27%;
    min-height: 300px;
    ::v-deep(.el-loading-parent--relative) {
      z-index: 666;
    }
  }
}
</style>
