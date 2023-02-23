<template>
  <!-- 子级分类 -->
  <template v-if="isDarkTheme">
    <div
      class="loadings"
      element-loading-background="#F2F3F5"
      element-loading-text="拼命加载中..."
      v-if="!secondCate.length"
      v-loading="true"
    ></div
  ></template>
  <template v-if="!isDarkTheme">
    <div
      class="loadings"
      element-loading-background="#0A0A0A"
      element-loading-text="拼命加载中..."
      v-if="!secondCate.length"
      v-loading="true"
    ></div>
  </template>

  <template v-if="secondCate.length">
    <div class="categroy" v-for="item in secondCate" :key="item.id">
      <div class="title">
        <span>{{ item.name }}</span>
      </div>
      <div class="empty" v-show="item.sub.length == 0">
        <img src="../../../../assets/images/empty.png" alt="" />
      </div>
      <div class="boxs">
        <!-- 具体每一项 -->
        <div
          class="links"
          v-show="item.sub.length != 0"
          v-for="item1 in getLinksData(item.sub)"
          :key="item1.id"
          @click="hrefUrl(item1.urls)"
        >
          <img
            v-if="!item1.linkImg"
            src="../../../../assets/images/dong.gif"
            alt=""
          />
          <img v-if="item1.linkImg" v-lazy="item1.linkImg" alt="" />
          <div class="name">{{ item1.name }}</div>
          <div class="desc">
            {{ item1.linkDesc ? item1.linkDesc : `${item1.name} ` }}
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { emitter } from "@/emitter";
const props = defineProps(["secondCate"]);
const hrefUrl = (urls: any) => {
  window.open(urls);
};

const isDarkTheme = ref(true);

emitter.on("changeDark", () => {
  getStoreTheme("change");
});


onMounted(()=>{
  getStoreTheme1()
})
//获取当前主题
const getStoreTheme = () => {
  let store = localStorage.getItem("vueuse-color-scheme");
  if (store == "dark") {
    console.log("深色")
    isDarkTheme.value = true;
  } else {
    console.log("明亮")
    isDarkTheme.value = false;
  }
};
//获取当前主题
const getStoreTheme1 = () => {
  let store = localStorage.getItem("vueuse-color-scheme");
  if (store == "dark") {
    isDarkTheme.value = false;
  } else {
    isDarkTheme.value = true;
  }
};

const getLinksData = (data: any) => {
  return data?.sort((a: any, b: any) => b.id - a.id);
};
</script>

<style lang="scss" scoped>
.loadings {
  height: 400px;
  z-index: 666 !important;
}
.categroy {
  user-select: none;
  width: 85%;
  margin: 10px 0 60px;
  transform: translateX(7%);
  .title {
    text-align: left;
    margin-left: 42px;
    padding-bottom: 15px;
    font-size: 23px;
    margin-bottom: 24px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: saddlebrown;
    }
    span {
      padding-bottom: 8px;
      border-bottom: 3px solid saddlebrown;
      transition: all 0.3s;
      &:hover {
        border-bottom: 3px solid rgb(194, 109, 109);
      }
    }
  }
  .empty {
    font-size: 40px;
    width: 300px;
    height: 300px;
    padding: 20px 0;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .boxs {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .links {
      width: 26%;
      height: 100px;
      margin: 0 auto 20px;
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin: 20px 40px 40px 40px;
      position: relative;
      cursor: pointer;
      border-radius: 5px;
      transition: all 0.3s;
      background: var(--el-bg-color);
      &:hover {
        box-shadow: 0 0 10px var(--el-bg-color-shadowCol);
        background: var(--el-bg-color-articleItemBg);
        transform: translateY(-10px);
      }
      img {
        width: 12%;
        margin-left: 10px;
        top: 20px;
        left: 10px;
        position: absolute;
      }
      .name {
        position: absolute;
        top: 13px;
        right: 20px;
        width: 66%;
        text-align: start;
        margin-bottom: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 17px;
        font-weight: 520;
        transition: all 0.3s;
      }
      .desc {
        position: absolute;
        top: 39px;
        right: 20px;
        width: 66%;
        margin-top: 8px;
        font-weight: 200;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; //需要控制的文本行数
        overflow: hidden;
        font-size: 10px !important;
        text-align: start;
        color: #999;
      }
    }
  }
}
</style>
