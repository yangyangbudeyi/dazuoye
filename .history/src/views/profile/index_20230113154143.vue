<template>
  <div class="profile">
    <div class="left">
      <div class="avatar">
        <img :src="userImg" alt="" />
        <div class="info">
          <span>{{ nickName }}</span>
          <span>注册于：{{ getTimeBefore(regDate) }}</span>
        </div>
      </div>
      <div class="menu">
        <router-link to="/profile/userInfo" active-class="active">
          <el-icon><Fold /></el-icon>基本信息</router-link
        >
        <router-link to="/profile/article" active-class="active">
          <el-icon><Memo /></el-icon>我的文章</router-link
        >
        <router-link to="/profile/collect" active-class="active">
          <el-icon><Star /></el-icon>我的收藏</router-link
        >
        <router-link to="/profile/like" active-class="active">
          <el-icon><MostlyCloudy /></el-icon>点赞文章</router-link
        >
        <router-link to="/profile/update/userInfo" active-class="active">
          <el-icon><Edit /></el-icon>修改信息</router-link
        >
        <router-link to="/profile/suggestion" active-class="active">
          <el-icon><Setting /></el-icon>意见反馈</router-link
        >
      </div>
    </div>
    <div class="right">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :is="Component"
            :key="$route.meta.title"
            v-if="$route.meta?.keepAlive && $route.meta?.keepAlive"
          ></component>
        </keep-alive>
        <component
          :is="Component"
          :key="$route.meta.title"
          v-if="!$route.meta?.keepAlive"
        ></component>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Filter,
  Fold,
  Setting,
  Star,
  Memo,
  Edit,
  MostlyCloudy,
} from "@element-plus/icons-vue";
import { emitter } from "@/emitter";
import { getTimeBefore } from "@/utils/getTimeBefore";
const userImg = ref("");
const nickName = ref("");
const regDate = ref("");

onMounted(() => {
  getStoreUserInfo();
});
const getStoreUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const {
      userImg: img,
      name,
      regDate: dates,
    } = JSON.parse(userInfo as string);
    userImg.value = img;
    nickName.value = name;
    regDate.value = dates;
  }
};
emitter.on("updateUserInfoGlobal", () => {
  getStoreUserInfo();
});
</script>

<style lang="scss" scoped>
.profile {
  min-height: 100vh;
  width: 100%;
  top: 0;
  z-index: 10;
  overflow: hidden;
  box-sizing: border-box;
  .left {
    width: 270px;
    height: calc(100vh - #{200px});
    position: fixed;
    z-index: 10;
    background: var(--el-bg-color);
    user-select: none;
    border-radius: 4px;
    .avatar {
      width: 100%;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 2px solid var(--el-border-color);
      margin-bottom: 15px;
      box-sizing: border-box;
      padding: 0 30px;

      img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        margin-top: 5px;
        border-radius: 8px;
        transition: all 0.4s;
        cursor: pointer;
        &:hover {
          transform: scale(1.05);
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        margin-left: 8px;
        flex: 1;
        margin-top: 10px;
        width: 62%;
        span {
          font-size: 16px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          &:last-child {
            margin-top: 4px;
            font-size: 10px;
          }
        }
      }
    }
    .menu {
      display: flex;
      flex-wrap: wrap;
      padding: 0 8px;
      a {
        text-decoration: none;
        display: flex;
        width: 100%;
        height: 50px;
        flex-wrap: wrap;
        align-items: center;
        border-radius: 5px;
        padding: 0 12px;
        transition: all 0.3s;
        margin: 4px 0;
        color: var(--el-text-color-regular);
        //--el-tag-bg-color: var(--el-color-primary-light-9);
        //--el-tag-border-color: var(--el-color-primary-light-8);
        //--el-tag-hover-color: var(--el-color-primary);
        //--el-tag-text-color: var(--el-color-primary);
        //background-color: var(--el-tag-bg-color);
        //border-color: var(--el-tag-border-color);
        //color: var(--el-tag-text-color);
        .el-icon {
          margin-right: 10px;
        }
        &:hover {
          --el-tag-bg-color: var(--el-color-primary-light-9);
          --el-tag-border-color: var(--el-color-primary-light-8);
          --el-tag-hover-color: var(--el-color-primary);
          --el-tag-text-color: var(--el-color-primary);
          background-color: var(--el-tag-bg-color);
          border-color: var(--el-tag-border-color);
          color: var(--el-tag-text-color);
        }
      }
      .active {
        --el-tag-bg-color: var(--el-color-primary-light-9);
        --el-tag-border-color: var(--el-color-primary-light-8);
        --el-tag-hover-color: var(--el-color-primary);
        --el-tag-text-color: var(--el-color-primary);
        background-color: var(--el-tag-bg-color);
        border-color: var(--el-tag-border-color);
        color: var(--el-tag-text-color);
      }
    }
  }
  .right {
    width: 83%;
    background: var(--el-bg-color);
    height: 100%;
    min-height: 100vh;
    margin-left: 280px;
    overflow: hidden;
    border-radius: 4px;
    padding: 0 60px 0 15px;
    box-sizing: border-box;
  }
}

.profile-enter-active {
  transition: opacity 0.5s ease;
}

//把离开时的开始状态设置为display:none

.profile-leave-from {
  display: none;
}
.profile-enter-from,
.profile-leave-to {
  opacity: 0;
}
</style>
