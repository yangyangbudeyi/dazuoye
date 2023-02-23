<template>
  <div :class="!homePage ? 'hot_article detailPage':'hot_article'">
    <div class="top">
      <div class="title">Top Article</div>
      <div class="switch">
        <span :class="!sort ? 'sortActive' : ''" @click="changeSort(false)"
          >热门推荐</span
        >
        <span :class="sort ? 'sortActive' : ''" @click="changeSort(true)"
          >最新发布</span
        >
      </div>
    </div>

    <div class="item">
      <Loading
        :height="210"
        class="searchLoading"
        :key="Date.now()"
        :top="-145"
        v-show="hotArticleLoading"
      />
      <template v-if="!hotArticleLoading">
        <template v-if="!data.length  && skeleton">
          <el-skeleton v-for="item in 10" :key="item" animated>
            <template #template>
              <el-skeleton-item class="items" style="width: 82%" />
              <el-skeleton-item class="items" style="width: 15%" />
            </template>
          </el-skeleton>
        </template>
      </template>
      <template v-if="data.length">
        <li
          @click="navigateDetails(item.artId ?? '')"
          v-for="(item, index) in data"
          :key="item.artId"
        >
          <div class="title">
            <div class="box">
              <span>{{ index + 1 }}</span>
            </div>
            {{ item.artTitle }}
          </div>
          <p class="time" v-if="homePage">{{ getTimeBefore(item.artDate) }}</p>
        </li>
      </template>
    </div>
    </div>
</template>

<script setup lang="ts">
import { IArticleData } from "@/types/article";
import { getTimeBefore } from "@/utils/getTimeBefore";
type TProps = {
  data: IArticleData[];
  hotArticleLoading?: boolean;
  skeleton?: boolean;
  homePage?:boolean
};
const sort = ref(false);
onMounted(() => {
  const val = sessionStorage.getItem("indexSort");
  if (val) {
    if (val === "preview") {
      sort.value = false;
    } else {
      sort.value = true;
    }
  } else {
    sort.value = false;
  }
});
const props = withDefaults(defineProps<TProps>(), {
  data: () => [],
  skeleton:true,
  homePage:true
});

const router = useRouter();
const navigateDetails = (artId: string) => {
  router.push({ name: "details", params: { artId } });
};

const emits = defineEmits(["changeHotSort"]);
const changeSort = (value: boolean) => {
  if (value == sort.value) return;
  if (props.hotArticleLoading) return;
  if (value) {
    sort.value = true;
  } else {
    sort.value = false;
  }
  emits("changeHotSort", value);
};
</script>

<style lang="scss" scoped>
.hot_article {
  width: 100%;
  background: var(--el-bg-color);
  margin-bottom: 15px;
  min-height: 200px;
  padding: 15px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  user-select: none;
  .top {
    height: 45px;
    line-height: 40px;
    border-bottom: 1px solid var(--el-border-color);
    margin-bottom: 10px;
    box-sizing: border-box;
    padding-left: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 22px;
      color: var(--el-text-color-regular);
    }
    .switch {
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(0.9);
      color: #747171;
      position: relative;
      top: 5px;
      .sortActive {
        color: teal;
        font-weight: bold;
      }
      span {
        margin-left: 8px;
        cursor: pointer;
        transition: all 0.4s;
        &:hover {
          color: teal;
        }
      }
    }
  }
  .item {
    min-height: 250px;
    .el-skeleton {
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .items {
        height: 19px;
        margin-bottom: 5px;
        margin-top: 10px;
      }
    }
    li {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      align-items: center;
      height: 50px;
      transition: all 0.3s;
      padding: 0 3px 0 8px;
      cursor: pointer;
      &:hover {
        border-radius: 4px;
        background: var(--el-bg-color-commonBg);
      }
      &:nth-child(n + 5) {
        .title {
          span {
            animation: indexStar 5s infinite;
          }
        }
      }
      &:nth-child(2) {
        .title {
          .box {
            background: var(--el-color-danger);
            span {
              color: #fff;
              border-radius: 4px;
              transform: rotate(30deg);
            }
          }
        }
      }
      &:nth-child(3) {
        .title {
          .box {
            background: var(--el-color-warning);
            span {
              color: #fff;
              border-radius: 4px;
            }
          }
        }
      }
      &:nth-child(4) {
        .title {
          .box {
            background: var(--el-color-primary);
            span {
              color: #fff;
              border-radius: 4px;
            }
          }
        }
      }
      .title {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 15px;
        color: #747171;
        line-height: 50px;
        float: left;
        padding-left: 4px;
        .box {
          height: 22px;
          width: 22px;
          float: left;
          border-radius: 4px;
          margin-right: 7px;
          margin-top: 14px;
          span {
            font-weight: bold;
            font-style: italic;
            font-size: 17px;
            padding: 0 5px;
            margin-right: 7px;
            position: relative;
            top: -13px;
          }
        }
      }
      .time {
        width: 43px;
        font-size: 12px;
        color: #747171;
        margin-left: 8px;
      }
    }
  }
}

.searchLoading {
  position: relative;
  top: 10px;
}
.detailPage {
  padding: 6px 10px;
  margin-bottom: 6px;
  .top {
    height: 38px;
    line-height: 45px;
    .title {
      font-size: 17px;
      font-weight: bold;
    }
    .switch {
      color:var(--el-text-color-detailTextColor);
      span {
        transform: scale(0.9);
      }
    }
  }
  .item {
    min-height: 220px;
    li {
      height: 38px;
      padding: 0 4px 0 4px;
      cursor: pointer;
        &:hover {
          .title{
            color: teal;
          }
        }
      .title {
        transition: all 0.4s;
        font-size: 13px;
        color:var(--el-text-color-detailTextColor) ;
        .box {
          height: 18px;
          width: 18px;
          float: left;
          margin-top: 16px;
          span {
            top: -16px;
            font-size: 14px;
          }
        }
      }
      .time {
        width: 43px;
        font-size: 12px;
        margin-left: 8px;
      }
    }
  }
}
</style>
