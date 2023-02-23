<template>
  <div class="searchLink">
    <div class="input">
      <el-input
        v-model="key"
        placeholder="请输入你想要搜索链接的内容吧"
        @change="change"
        clearable
        :autofocus="true"
        focus
        size="large"
      ></el-input>
    </div>
    <div class="showSearch" v-if="showSearch">
      <img src="../../assets/images/searchLink.png" alt="" />
    </div>
    <div class="searchBefore1" v-loading="loading" v-if="nodata">
      <h1>暂无数据</h1>
    </div>
    <div class="content">
      <div v-if="searchList.length > 0" class="total">
        已为您查询到 <b>{{ searchList.length }}</b
        >条数据
      </div>
      <div class="boxs">
        <!-- 具体每一项 -->
        <div
          class="links"
          
        >
         
        </div>
        <div
          class="links"
          
        >
         
        </div>
        <div
          class="links"
          
        >
         
        </div>
        <div
          class="links"
          
        >
         
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getSearchLinks } from "@/api/request";
import { ILinksData } from "@/types/links";
const key = ref("");
const autofocus = ref(true);
const loading = ref(false);
let searchList = ref<ILinksData[]>([]);
const nodata = ref(false);
const showSearch = ref(true);
onMounted(() => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

onActivated(() => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const change = (value: string) => {
  loading.value = true;
  getSearch();
};

const getFocus = () => {
  autofocus.value = true;
  showSearch.value = false;
};
const hrefUrl = (urls: string) => {
  window.open(urls);
};

const getSearch = async () => {
  if (!key.value) {
    searchList.value = [];
    loading.value = false;
    showSearch.value = false;
    return;
  }
  showSearch.value = false;
  let { data: res } = await getSearchLinks(key.value);
  let arr1 = res.data && res.data.filter((item: any) => item.urls != "");
  loading.value = false;
  if (res.code == 200) {
    if (res.data?.length) {
      searchList.value = arr1;
      nodata.value = false;
    } else {
      searchList.value = [];
      nodata.value = true;
    }

    return;
  }
  searchList.value = [];
  nodata.value = true;
};
</script>

<style lang="scss" scoped>
.searchLink {
  width: 100%;
  min-height: 90vh;
  margin: 0 auto;
  overflow: hidden;
  .input {
    width: 60%;
    margin: 0 auto;
    margin-top: 55px;
    position: relative;
    overflow: hidden;
    &:hover {
      &::after {
        transform: translateX(0);
      }
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1.5px;
      background-image: linear-gradient(
        to right,
        white,
        red,
        rgb(92, 229, 241),
        rgb(92, 92, 241),
        rgb(244, 120, 113),
        white
      );
      transform: translateX(-100%);
      transition: all 0.8s;
    }
  }
  .showSearch {
    width: 600px;
    height: 400px;
    margin: 50px auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .searchBefore1 {
    width: 500px;
    height: 400px;
    margin: 0 auto;
    background-image: url("../../assets/images/empty.png");
    background-size: 100% 100%;
    h1 {
      position: relative;
      top: 350px;
      text-align: center;
      font-size: 20px;
    }
  }
  .content {
    width: 80%;
    margin: 35px auto 45px;
    .total {
      text-align: right;
      margin-right: 6%;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .boxs {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .links {
        width: 25%;
        height: 100px;
        margin: 0 auto 20px;
        margin: 20px 40px 40px 40px;
        position: relative;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s;
        background: var(--el-bg-color);
        &:hover {
          box-shadow: 0 0 10px #ddd;
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
          top: 16px;
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
}
</style>
