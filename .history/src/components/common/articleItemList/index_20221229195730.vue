<template>
  <div
    class="item"
    @click="navigateDetails(item.artId ?? '')"
    v-for="item in list"
    :key="item.artId"
  >
    <div class="item_left">
      <div class="authOrTime">
        <div
          class="name"
          @click.stop="
            navigateSelect(item.publishUserId ?? '', item.userId ?? '')
          "
        >
          {{ item.name }}
        </div>
        <div class="time">{{ getTimeBefore(item.artDate) }}</div>
        <div class="tag">
          <span
            @click.stop="navigateTags(items)"
            v-for="(items, index) in item.tag?.split(',')"
            :key="index"
          >
            {{ items }}
          </span>
        </div>
      </div>
      <div class="title">
        {{ item.artTitle }}
      </div>
      <div class="desc">
        {{ item.artIntroduce }}
      </div>
      <div class="preview">
        <div class="left">
          <span
            ><el-icon><View /></el-icon>{{ item.pageView }}</span
          >
          <span
            ><el-icon><Star /></el-icon>{{ item.collectCount }}</span
          >
          <span
            ><el-icon><ChatLineSquare /></el-icon>{{ item.artPcomment }}</span
          >
          <span v-if="isCollect"
            >收藏时间：{{ getTimeBefore(item.collectTime) }}</span
          >
        </div>
        <div
          class="right circleCss"
          v-if="isCollect"
          @click.stop="deleteCollect(item.id ?? '', $event)"
        >
          <el-icon><Delete /></el-icon>
        </div>
      </div>
    </div>
    <div class="item_right">
      <img v-lazy="item.artImg" alt="" v-if="item.artImg" />
      <img src="../../../assets/images/noartImg.jpg" alt="" v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IArticleData } from "@/types/article";
import { getTimeBefore } from "@/utils/getTimeBefore";
import { Star, View, ChatLineSquare, Delete } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { emitter } from "@/emitter";
import { useValidateIDisabled } from "@/hooks/validateIDisabled";
import { useValidateLogin } from "@/hooks/validateLogin";
import { ro } from "element-plus/es/locale";
const userIdStore = JSON.parse(
  localStorage.getItem("userInfo") as string
)?.userId;
type Props = {
  list: IArticleData[];
  isCollect?: boolean;
};
withDefaults(defineProps<Props>(), {
  list: () => [],
  isCollect: false,
});

const router = useRouter();
const route = useRoute();

const navigateDetails = (artId: string) => {
  router.push({ name: "details", params: { artId } });
};
const navigateSelect = (publishUserId: string, userId: string) => {
  if (route.fullPath == "/profile/collect") {
    if (userIdStore == publishUserId) {
      router.push("/profile/userInfo");
    } else {
      router.push({ name: "select", params: { userId: publishUserId } });
    }
  } else if (
    route.fullPath.includes("?commit=article") ||
    route.fullPath.includes("?commit=collect")
  ) {
    if (userIdStore == publishUserId) {
      router.push("/profile/userInfo");
    } else {
      router.push(`/select/${publishUserId}?commit=info`);
    }
  } else {
    if (userIdStore == userId) {
      router.push("/profile/userInfo");
    } else {
      router.push({ name: "select", params: { userId } });
    }
  }
};
const navigateTags = (key: string) => {
  router.push(`/tags?key=${key}`);
};

//移除收藏
const deleteCollect = async (id: string | number, e: Event) => {
  const { state, login } = await useValidateLogin();
  if (!state || !login) return;
  const isDisable = await useValidateIDisabled("删除");
  if (isDisable) return ElMessage.warning("暂无法移除收藏");
  ElMessageBox.confirm("您确定要从收藏中移除当前文章吗?", "温馨提示", {
    confirmButtonText: "确认移除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      emitter.emit("removeCollectArt", id);
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  height: 130px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 10px 30px;
  background: var(--el-bg-color);
  transition: all 0.3s;
  cursor: pointer;
  border-radius: 4px;
  user-select: none;
  position: relative;
  &:nth-child(n + 2) {
    border-top: 1px solid var(--el-border-color);
  }
  &:hover {
    background: var(--el-bg-color-articleItemBg);
  }
  .item_left {
    width: 78%;
    height: 100%;
    box-sizing: border-box;
    .title,
    .desc {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .authOrTime {
      line-height: 22px;
      font-size: 13px;
      margin-top: 5px;
      display: flex;
      .name {
        color: #4e5969;
        transition: all 0.3s;
        &:hover {
          color: teal;
        }
      }
      .time {
        color: #86909c;
        position: relative;
        &::before {
          content: "";
          width: 1px;
          height: 70%;
          position: absolute;
          left: -13px;
          top: 2px;
          background: #e5e6eb;
        }
        &::after {
          content: "";
          width: 1px;
          height: 70%;
          position: absolute;
          right: -13px;
          top: 2px;
          background: #e5e6eb;
        }
      }
      .tag {
        color: #86909c;
        span {
          margin-right: 14px;
          transition: all 0.3s;
          &:hover {
            color: teal;
          }
        }
      }
      div {
        margin-right: 24px;
      }
    }
    .title {
      letter-spacing: 0.05em;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: var(--el-text-color-title);
      margin-top: 6px;
    }
    .desc {
      font-size: 12px;
      margin: 6px 0 10px;
      color: #86909c;
    }
    .preview {
      font-size: 13px;
      color: #4e5969;
      margin-top: 8px;
      display: flex;
      .left {
        span {
          margin-right: 22px;
          .el-icon {
            margin-right: 5px;
            position: relative;
            top: 3px;
          }
        }
      }
      .right {
        position: absolute;
        right: 188px;
        bottom: 44px;
        margin-left: 20px;
        width: 40px;
        height: 40px;

        font-size: 16px;

        &:hover {
          color: #cc2c2c;
        }
      }
    }
  }
  .item_right {
    width: 21%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100px;
      height: 56%;
      object-fit: cover;
      border-radius: 3px;
    }
  }
}
</style>
