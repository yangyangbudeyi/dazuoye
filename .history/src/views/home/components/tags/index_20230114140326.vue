<template>
  <div :class="!homePage ? 'detailPage' : ''">
    <div :class="sticky ? 'tags_article isSticky' : 'tags_article'">
      <div class="top">
        <div class="title">分类标签</div>
      </div>
      <div class="item">
        <template v-if="!data.length && skeleton">
          <el-skeleton v-for="item in 8" :key="item" animated>
            <template #template>
              <el-skeleton-item class="items" style="width: 45%" />
              <el-skeleton-item class="items" style="width: 45%" />
            </template>
          </el-skeleton>
        </template>
        <li
          v-else
          @click="navigateTags(item.name)"
          v-for="item in data"
          :key="item.tagId"
        >
          {{ item.name }}
        </li>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ITagsData } from "@/types/article";
type TProps = {
  data: ITagsData[];
  sticky?: boolean;
  skeleton?: boolean;
  homePage?: boolean;
};
const props = withDefaults(defineProps<TProps>(), {
  data: () => [],
  sticky: true,
  skeleton: true,
  homePage: true,
});

console.log(props);
const router = useRouter();
const navigateTags = (key: string) => {
  router.push(`/tags?key=${key}`);
};
</script>

<style lang="scss" scoped>
.isSticky {
  position: sticky;
  top: 68px;
}
.tags_article {
  width: 100%;
  margin-bottom: 15px;
  min-height: 300px;
  padding: 15px 10px;
  box-sizing: border-box;
  background: var(--el-bg-color);

  border-radius: 4px;
  user-select: none;
  .top {
    height: 45px;
    line-height: 40px;
    border-bottom: 1px solid var(--el-border-color);
    box-sizing: border-box;
    padding-left: 6px;
    .title {
      font-size: 22px;
      color: var(--el-text-color-regular);
    }
  }
  .item {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
    border-radius: 4px;
    .el-skeleton {
      padding: 0 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .items {
        height: 22px;
        margin-bottom: 15px;
      }
    }
    li {
      margin: 0px 10px 18px;
      list-style: none;
      width: 42%;
      padding: 6px 15px;
      border: 1.6px solid var(--el-border-color-tag);
      cursor: pointer;
      text-align: center;
      box-sizing: border-box;
      transition: 0.2s ease-in;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
      color: #747171;
      &:hover {
        background: var(--el-bg-color-commonBg);
      }
    }
  }
}

.detailPage {
  background: red !important;
  font-size: 12px !important;
  .tags_article{
    .top{
      font-size: 12px;
    }
  }
}
</style>
