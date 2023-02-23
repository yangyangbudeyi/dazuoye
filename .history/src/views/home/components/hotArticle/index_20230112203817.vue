<template>
  <div class="hot_article">
    <div class="top">
      <div class="title">Top Article</div>
      <div class="switch">
        <span :class="!sort ? 'sortActive' : ''" @click="changeSort(false)"
          >访问最多</span
        >
        <span :class="sort ? 'sortActive' : ''" @click="changeSort(true)"
          >最近发布</span
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
        <template v-if="!data.length">
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
            <div class="left">
              <div class="box">
                <span>{{ index + 1 }}</span>
              </div>
            </div>
            <div class="right">
              {{ item.artTitle }}
            </div>
          </div>
          <p class="time">{{ getTimeBefore(item.artDate) }}</p>
        </li>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IArticleData } from "@/types/article";
import { Star } from "@element-plus/icons-vue";
import { getTimeBefore } from "@/utils/getTimeBefore";
type TProps = {
  data: IArticleData[];
  hotArticleLoading: boolean;
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
        padding-left: 4px;
        /* display: flex; */
        float: left;
        .left {
          border: 2px solid gray;
          position: relative;
          padding: 0 6px;
          float: left;;
          .box {
            height: 22px;
            width: 22px;
            margin-top: 10px;
            border-radius: 4px;
            background: red;
            span {
              position: absolute;
              font-weight: bold;
              font-style: italic;
              font-size: 17px;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
            }
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
</style>
