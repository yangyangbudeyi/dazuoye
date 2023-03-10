<template>
  <div class="details">
    <div class="left" ref="scrollTopMove">
      <User
        v-loading="detailsLoading"
        :userImg="detailData.userImg"
        :regDate="detailData.regDate ?? ''"
        :name="detailData.name"
        :userId="detailData.userId ?? ''"
      />
      <HotArticle
        @changeHotSort="changeHotSort"
        :hotArticleLoading="hotArticleLoading"
        :data="hotArticleByData"
        :skeleton="false"
        v-loading="hotArticleLoadingPrevious"
        :homePage="false"
      />
      <ArticleInfo
        v-loading="detailsLoading"
        :tag="detailData.tag"
        :artTitle="detailData.artTitle"
      />
      <RecommendArticle
        v-loading="detailsLoading"
        :recommendArt="recommendArt"
      />
      <Tags
        v-loading="tagsLoading"
        :data="articleTagsData"
        :sticky="false"
        :homePage="false"
      />
      <PageViewInfo
        v-loading="detailsLoading"
        :updatetime="detailData.updatetime"
        :pageView="detailData.pageView"
        :collectCount="detailData.collectCount"
        :artPcomment="detailData.artPcomment"
        :artDate="detailData.artDate"
      />
    </div>
    <div class="right">
      <div class="top" v-loading="detailsLoading">
        <div class="articleInfo">
          <h2>{{ detailData.artTitle }}</h2>
          <div class="box">
            <div class="boxTop">
              <span>文章发布于：{{ detailData.artDate }}</span>
              <span
                ><el-icon class="icon"><View /></el-icon
                >{{ detailData.pageView || 0 }}</span
              >
              <span
                ><el-icon class="icon"><Star /></el-icon
                >{{ detailData.collectCount || 0 }}</span
              >
            </div>
            <div class="boxBottom">
              分类标签：
              <el-tag
                @click="navigateTags(item)"
                type="info"
                v-for="(item, index) in detailData.tag?.split(',')"
                :key="index"
              >
                {{ item }}
              </el-tag>
            </div>
          </div>
          <div class="borderBottom"></div>
        </div>
        <MarkDown
          v-loading="detailsLoading"
          :previewOnly="true"
          :value="detailData.artContent ?? ''"
        ></MarkDown>
        <div class="updatetime" v-if="detailData.updatetime">
          <el-icon class="icon"><Edit /></el-icon>文章于
          {{ detailData.updatetime }} 进行了修改
        </div>
        <Comments
          @updates="updates"
          :comment="comment"
          :collect="collect"
          :pageView="detailData.pageView"
          :collectCount="detailData.collectCount"
          :artPcomment="detailData.artPcomment"
        ></Comments>
      </div>
      <div class="detailsFooter">
        <Footer />
      </div>
    </div>

    <div class="comment" @click="navigateComment">
      <el-icon>
        <ChatDotSquare />
      </el-icon>
    </div>
    <div class="collect" @click="clickCollect">
      <el-icon v-if="!isCollect">
        <Star />
      </el-icon>
      <span class="lightStar" v-else>⭐</span>
    </div>
    <div class="topScroll" :style="{ width: scrollWidth + '%' }"></div>
    <div class="editorBtn" v-if="detailData.userId==userId+''" @click="navigateEditor()">
      <el-icon >
        <Edit />
      </el-icon>
    </div>
    <div class="topScroll" :style="{ width: scrollWidth + '%' }"></div>
  </div>
</template>

<script setup lang="ts">
import User from "./components/user/index.vue";
import ArticleInfo from "./components/articleInfo/index.vue";
import RecommendArticle from "./components/recommendArticle/index.vue";
import PageViewInfo from "./components/pageViewInfo/index.vue";
import Comments from "./components/comments/index.vue";
import Footer from "@/components/footer/index.vue";
import HotArticle from "@/views/home/components/hotArticle/index.vue";
import Tags from "@/views/home/components/tags/index.vue";
import {
  getArtContentById,
  getRandomArt,
  getSubmitCollect,
  getUpdatePageView,
  setCollectNum,
  setCommentNum,
  getIndexHotArtByPreview,
  getIndexHotArtByTime,
  getTagsAll,
} from "@/api/request";
import { IArticleData } from "@/types/article";
import { ICollectParams } from "@/types/collect";
import { useValidateLogin } from "@/hooks/validateLogin";
import { ChatDotSquare, Star, Edit, View } from "@element-plus/icons-vue";
import { getCurTime } from "@/utils/getCurTime";
import { ElMessage } from "element-plus";
const route = useRoute();
const artId = ref(route.params.artId as string);
const userId = JSON.parse(localStorage.getItem("userInfo") as string)
  ?.userId as number;
const scrollTopMove = ref()
const hostArticleSort = ref(false);
const hotArticleLoading = ref(false);
const hotArticleByData = ref([]);
const tagsLoading = ref(false);
const articleTagsData = ref([]);
const hotArticleLoadingPrevious = ref(false);

onMounted(() => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  artId.value = route.params.artId as string;
  window.addEventListener("scroll", scrollFn);
  getArtContent();
  getRecommendArt();
  getTags();
  mangerStoreSort();
});

//统一管理存储中的indexSort文章排序方式
const mangerStoreSort = () => {
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
};

//跳转文章分类标签
const navigateTags = (value: any) => {
  router.push(`/tags?key=${value}`);
};
//顶部滚动条的宽度
const scrollWidth = ref(0);
//加载动画
const detailsLoading = ref(false);

//监听切换热门文章排序方式
const changeHotSort = (value: boolean) => {
  if (value) {
    //按时间
    getArticleByTime("loading");
    sessionStorage.setItem("indexSort", "timer"); //true
  } else {
    //按访问
    getArticleByPreview("loading");
    sessionStorage.setItem("indexSort", "preview"); //false
  }
};

//获取首页热门文章(通过预览量)
const getArticleByPreview = async (params?: string) => {
  if (params) {
    hotArticleLoading.value = true;
  } else {
    hotArticleLoadingPrevious.value = true;
  }
  hotArticleByData.value = [];
  const { data: res } = await getIndexHotArtByPreview(1, 8);
  if (res.code != 200) return;
  setTimeout(() => {
    hotArticleByData.value = res.data?.filter(
      (item: { artId: string }) => item.artId != artId.value
    );
    hotArticleLoading.value = false;
    hotArticleLoadingPrevious.value = false;
  }, 400);
};
//获取首页热门文章(通过时间)
const getArticleByTime = async (params?: string) => {
  if (params) {
    hotArticleLoading.value = true;
  } else {
    hotArticleLoadingPrevious.value = true;
  }
  hotArticleByData.value = [];
  const { data: res } = await getIndexHotArtByTime();
  if (res.code != 200) return;
  setTimeout(() => {
    hotArticleByData.value = res.data?.filter(
      (item: { artId: string }) => item.artId != artId.value
    );
    hotArticleLoading.value = false;
    hotArticleLoadingPrevious.value = false;
  }, 400);
};

//获取所有文章标签
const getTags = async () => {
  tagsLoading.value = true;
  const { data: res } = await getTagsAll();
  if (res.code != 200) return;
  setTimeout(() => {
    tagsLoading.value = false;
    articleTagsData.value = res.data;
  }, 400);
};
watch(
  () => route.fullPath,
  () => {
    if (route.params.artId) {
      artId.value = route.params.artId as string;
    }
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    scrollTopMove.value?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getArtContent();
    mangerStoreSort();
    getTags();

    console.log("路由发生变化了",scrollTopMove.value.scrollTop)
  }
);
const isCollect = ref(false);
const recommendArt = ref<IArticleData[]>([]);
const detailData = reactive<IArticleData>({
  artCollect: 0,
  artDate: "",
  artIsHot: "",
  artLike: 0,
  artPcomment: 0,
  artTitle: "",
  collectCount: 0,
  hidden: "",
  mangerHidden: "",
  name: "",
  pageView: "",
  tag: "",
  updatetime: "",
  userImg: "",
  artContent: "",
  regDate: "",
  userId: "",
});

const comment = ref("");
const collect = ref("");
const router = useRouter();
//获取文章详情内容
const getArtContent = async (str?: string) => {
  if (!str) {
    detailsLoading.value = true;
  }
  const { data: res } = await getArtContentById(artId.value, userId).finally(
    () =>
      setTimeout(() => {
        detailsLoading.value = false;
      }, 400)
  );
  if (res.code == 401) {
    // ElMessage.error("内容已丢失,或出现违规已被清除");
    const preDetailsPath = sessionStorage.getItem("preDetailsPath");
    if (preDetailsPath) {
      router.push(preDetailsPath);
    } else {
      router.replace("/notFound");
    }
    return;
  }
  if (res.code == 402) {
    router.replace("/notFound");
    return;
  }
  if (res.code == 404) {
    router.replace("/notFound");
    return;
  }
  const hidden = res?.data[0]?.hidden;
  const mangerHidden = res?.data[0]?.mangerHidden;
  const uid = res?.data[0]?.userId;
  if (hidden == "1" && uid != userId) {
    return router.replace("/notFound");
  }
  if (mangerHidden == "1") {
    return router.replace("/notFound");
  }
  detailData.artDate = res.data[0]?.artDate;
  detailData.artCollect = res.data[0]?.artCollect;
  detailData.artIsHot = res.data[0]?.artIsHot;
  detailData.artLike = res.data[0]?.artLike;
  detailData.artTitle = res.data[0]?.artTitle;
  detailData.collectCount = res.data[0]?.collectCount;
  detailData.hidden = res.data[0]?.hidden;
  detailData.mangerHidden = res.data[0]?.mangerHidden;
  detailData.name = res.data[0]?.name;
  detailData.pageView = res.data[0]?.pageView;
  detailData.userImg = res.data[0]?.userImg;
  detailData.tag = res.data[0]?.tag;
  detailData.updatetime = res.data[0]?.updatetime;
  detailData.regDate = res.data[0]?.regDate;
  detailData.userId = res.data[0]?.userId;
  const com = res.data[0]?.artPcomment;
  detailData.artPcomment = com ? com : 0;
  const Content = res.data[0]?.artContent?.replace(/shuangyinghao/g, '"'); // 双引号
  detailData.artContent = Content?.replace(/danyinhao/g, "'"); // 单引号
  isCollect.value = res.isCollect;
  if (res.data[0]?.artTitle) {
    document.title = res.data[0]?.artTitle;
  }
};



//获取推荐文章
const getRecommendArt = async () => {
  detailsLoading.value = true;
  const { data: res } = await getRandomArt(10).finally(() =>
    setTimeout(() => {
      detailsLoading.value = false;
    }, 400)
  );
  if (res.code != 200) {
    recommendArt.value = [];
    ElMessage.error("服务异常");
    return;
  }
  recommendArt.value = res.data?.filter(
    (item: { artId: string }) => item.artId != artId.value
  );
};

const scrollFn = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const view = scrollHeight - document.documentElement.clientHeight;
  scrollWidth.value = Math.round((scrollTop / view) * 100);
};

//点击收藏
const clickCollect = async () => {
  const { state, login } = await useValidateLogin();
  if (!state || !login) return;
  const obj: ICollectParams = {
    artId: artId.value,
    userId,
    publishUserId: detailData.userId,
    CollectTime: getCurTime(),
  };
  const { data: res } = await getSubmitCollect(obj);
  if (res.code == 404) return ElMessage.warning("服务异常,请稍后再试！");
  if (res.code == 203) {
    isCollect.value = false;
    updateCollectC(-1);
    ElMessage.success("已从我的收藏中移除");
    return;
  }
  isCollect.value = true;
  ElMessage.success("已添加至我的收藏");
  updateCollectC(1);
};
//修改文章收藏数量
const updateCollectC = async (params: number) => {
  let cCount = 0;
  if (params > 0) {
    cCount = detailData.collectCount * 1 + 1;
  } else {
    cCount =
      detailData.collectCount * 1 - 1 < 0 ? 0 : detailData.collectCount * 1 - 1;
  }
  const { data: res } = await setCollectNum(artId.value, cCount).finally(() => {
    getArtContent("update");
  });
};

//销毁之前改变访问数量
let updatePreview = async () => {
  let resPageView = (detailData.pageView as any) * 1 + 1;
  await getUpdatePageView(artId.value, resPageView);
};

onBeforeUnmount(() => {
  updatePreview();
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollFn);
});

//评论
//修改评论总数
const setComment = async (value: any) => {
  await setCommentNum(artId.value, value).finally(() => {
    getArtContent("update");
  });
};
//更新数据
const updates = (type: any, value: any, commentCount: any) => {
  if (type == "comment") {
    if (value == "jia") {
      setComment(detailData.artPcomment * 1 + 1);
    } else if (value == "jian") {
      setComment(
        detailData.artPcomment * 1 - commentCount < 0
          ? 0
          : detailData.artPcomment * 1 - commentCount
      );
    }
  }
};

//跳转评论
const navigateComment = () => {
  document.querySelector("#pinglinya")?.scrollIntoView({
    behavior: "smooth",
  });
};

//跳转编辑页面
const navigateEditor = () => {
  if(detailData.mangerHidden=='1'){
    return  ElMessage.error("内容涉及违规，或已被管理员禁用");
  }
  if(detailData.userId==userId+'' ){
    router.push(`/write/article?artId=${artId.value}`);
  }
};
</script>
<style lang="scss" scoped>
.details {
  border-top: 1px solid transparent;
  width: 100%;
  min-height: 500px;
  width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  .left {
    width: 285px;
    height: 88vh;
    top: 80px;
    position: fixed;
    overflow-y: scroll;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
  background-color: var(--el-scrollbar-bg-color);
}

::-webkit-scrollbar-track {
  padding: 5px;
}

::-webkit-scrollbar-thumb {
  width: 5px !important;
  border-radius: 8px;
  height: 2px !important;
  background-color: var(--el-scrollbar-bg-color);
}

.right {
  margin-left: 4px;
  flex: 1;
  margin-left: 289px;
  overflow-y: scroll;
  border-radius: 4px;
  position: relative;
  background: var(--el-bg-color);
  padding: 4px 4px 15px 4px;
  box-sizing: border-box;
  .top {
    background: var(--el-bg-color);
    margin-bottom: 8px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 20px;
    .articleInfo {
      box-sizing: border-box;
      height: 190px;
      padding: 5px 0;
      user-select: none;
      h2 {
        color: var(--el-text-color-title);
        font-weight: 700;
      }
      .box {
        width: 100%;
        height: 85px;
        background: var(--el-bg-color-detailBg);
        border-radius: 4px;
        padding: 15px 20px;
        box-sizing: border-box;
        user-select: none;
        color: var(--el-text-color-regular);
        font-size: 14px;
        .boxTop {
          display: flex;
          align-items: center;
          user-select: none;
          span {
            margin-right: 33px;
            .icon {
              position: relative;
              top: 2px;
              margin-right: 5px;
            }
          }
        }
        .boxBottom {
          margin-top: 15px;
          user-select: none;
          .el-tag {
            margin-right: 15px;
            cursor: pointer;
            user-select: none;
          }
        }
      }
      .borderBottom {
        padding-top: 20px;
        border-bottom: 2px solid var(--el-border-color-extra-light);
      }
    }
    .updatetime {
      width: 100%;
      height: 45px;
      background: var(--el-bg-color-detailBg);
      border-radius: 4px;
      padding: 15px 20px;
      box-sizing: border-box;
      user-select: none;
      color: var(--el-text-color-regular);
      font-size: 14px;
      margin: 20px 0 30px;
      .icon {
        position: relative;
        top: 2px;
        margin-right: 10px;
      }
    }
  }
}

.collect,
.comment,
.editorBtn {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  position: fixed;
  right: 3.8%;
  z-index: 999;
  --el-backtop-bg-color: var(--el-bg-color-overlay);
  --el-backtop-text-color: var(--el-color-primary);
  --el-backtop-hover-bg-color: var(--el-border-color-extra-light);
  background-color: var(--el-backtop-bg-color);
  color: var(--el-backtop-text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: var(--el-box-shadow-lighter);
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: var(--el-backtop-hover-bg-color);
  }
}

.collect {
  bottom: 200px;

  .lightStar {
    position: relative;
    top: -2px;
    left: -0.8px;
  }
}

.editorBtn{
  bottom: 280px;
}

.comment {
  bottom: 120px;
}
.detailsFooter {
  width: 100%;
  height: 110px;
  background: var(--el-bg-color);
  margin-top: 20px;
  margin: 0 auto;
  border-top: 2px solid var(--el-border-color-extra-light);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  box-sizing: border-box;
  color: var(--el-text-color-regular);
  .top {
    user-select: none;
    margin-top: 6px;
  }
  .bottom {
    span {
      user-select: none;
    }
    a {
      text-decoration: none;
      color: var(--el-text-color-title);
      transition: all 0.3s;
      &:hover {
        color: #87ceeb;
      }
    }
  }
}

.topScroll {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 9999;
  border-radius: 50px;
  transition: all 0.4s;
  background-image: linear-gradient(
    to right,
    rgb(242, 68, 68),
    rgb(92, 229, 241),
    rgb(92, 92, 241),
    rgb(244, 120, 113)
  );
}
</style>
