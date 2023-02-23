<template>
  {{ hotArticleLoading }}
  <div class="hot_article">
    <div class="top">
      <div class="title">Top Article</div>
      <div class="switch">
        <span :class="!sort?'sortActive':''" @click="changeSort(false)">访问最多</span>
        <span :class="sort?'sortActive':''"  @click="changeSort(true)">最近发布</span>
        <!-- <el-switch
          :disabled="!data.length"
          v-model="sort"
          class="ml-2"
          active-text="最近发布"
          inactive-text="访问最多"
          @change="changeSort"
          style="
            --el-switch-on-color: #7c7c7c;
            --el-switch-off-color: #dcdfe6;
            height: 10px; "
        /> -->
      </div>
    </div>
    <div class="item">
        <template v-if="!data.length">
            <el-skeleton v-for="item in 10" :key="item" animated>
              <template #template>
                <el-skeleton-item class="items" style="width: 82%" />
                <el-skeleton-item class="items" style="width: 15%" />
              </template>
            </el-skeleton>
          </template>
      <li
        v-else
        @click="navigateDetails(item.artId ?? '')"
        v-for="item in data"
        :key="item.artId"
      >
        <p class="title">
          <span
            ><el-icon><Star /></el-icon></span
          >{{ item.artTitle }}
        </p>
        <p class="time">{{ getTimeBefore(item.artDate) }}</p>
      </li>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IArticleData } from "@/types/article";
import { Star } from "@element-plus/icons-vue";
import { getTimeBefore } from "@/utils/getTimeBefore";
type TProps = {
  data: IArticleData[];
  hotArticleLoading:boolean
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

withDefaults(defineProps<TProps>(), {
  data: () => [],
  hotArticleLoading:false
});
const router = useRouter();
const navigateDetails = (artId: string) => {
  router.push({ name: "details", params: { artId } });
};

const emits = defineEmits(["changeHotSort"]);
const changeSort = (value: boolean) => {
  if(value==sort.value) return
  if(value){
    sort.value = true
  }else{
    sort.value = false
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
    /* background: skyblue; */
    .title {
      font-size: 22px;
      color: var(--el-text-color-regular);
    }
    .switch{
      font-size: 12px;
      display: flex;
     align-items: center;
     justify-content: center; 
     transform: scale(0.9);
     color: #747171;
     position: relative;
     top: 5px;
     .sortActive{
      color: teal;
      font-weight: bold;
     }
     span{
      margin-left: 8px;
      cursor: pointer;
      transition: all .4s;
      &:hover{
        color: teal;
      }
     }
    }
  }
  .item {
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
      .title {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 15px;
        color: #747171;
        span {
          margin-right: 5px;
          position: relative;
          top: 2px;
          .el-icon {
            animation: indexStar 5s infinite;
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
</style>
