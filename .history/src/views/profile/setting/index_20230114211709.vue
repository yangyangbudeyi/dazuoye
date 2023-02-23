<template>
  <div class="suggestion">
    <p>个性设置</p>
    <div class="line">
      代码块显示行数
      <el-switch
        @change="changeLine"
        inline-prompt
        :active-icon="Check"
        :inactive-icon="Close"
        size="large"
        v-model="line"
        :width="60"
        style="margin-left: 6px;"
      />
    </div>
    <div style="margin-top: 15px; margin-bottom: 5px">选择编辑器主题</div>
    <div class="theme">
      <!-- default' | 'github' | 'vuepress'  |'mk-cute' | 'smart-blue' | 'cyanosis' -->
      <div
        class="item"
        @click="changeCheckTheme(item.id, item.value)"
        v-for="item in data"
        :key="item.id"
      >
        <img class="themeBg" v-lazy="item.url" alt="" />
        <div class="check" v-if="item.id == preCheck">
          <el-icon><Check /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Check, Close } from "@element-plus/icons-vue";
const line = ref(true);
const radio = ref(3);
const preCheck = ref(0);
const changeLine = (val: boolean) => {
  localStorage.setItem("line", val + "");
};

const data = ref<{ id: number; value: string; url: string }[]>([
  {
    id: 0,
    value: "vuepress",
    url: "https://api.helloxlj.top/public/static/theme/vuepress.png",
  },
  {
    id: 1,
    value: "github",
    url: "https://api.helloxlj.top/public/static/theme/github.png",
  },
  {
    id: 2,
    value: "mk-cute",
    url: "https://api.helloxlj.top/public/static/theme/mk-cute.png",
  },
  {
    id: 3,
    value: "smart-blue",
    url: "https://api.helloxlj.top/public/static/theme/smart-blue.png",
  },
  {
    id: 4,
    value: "cyanosis",
    url: "https://api.helloxlj.top/public/static/theme/cyanosis.png",
  },
  {
    id: 5,
    value: "default",
    url: "https://api.helloxlj.top/public/static/theme/default.png",
  },
]);

const changeCheckTheme = (id: number, themeStyle: string) => {
  preCheck.value = id;
  localStorage.setItem("codeTheme", themeStyle);
};
const themeDataAll = ref([
  "github",
  "vuepress",
  "",
  "mk-cute",
  "smart-blue",
  "cyanosis",
  "default",
]);
onMounted(() => {
  const lineStore = localStorage.getItem("line");
  if (lineStore) {
    if (lineStore == "true") {
      line.value = true;
    } else {
      line.value = false;
    }
  } else {
    line.value = true;
  }

  const themeStore = localStorage.getItem("codeTheme");
  if (themeStore) {
    const isSure = themeDataAll.value?.some(
      (item: string) => item == themeStore
    );
    if (isSure) {
      const tid = data.value?.findIndex((item) => item.value == themeStore);
      if (tid) {
        preCheck.value = tid;
      } else {
        localStorage.setItem("codeTheme", "vuepress");
        preCheck.value = 0;
      }
    } else {
      localStorage.setItem("codeTheme", "vuepress");
      preCheck.value = 0;
    }
  } else {
    localStorage.setItem("codeTheme", "vuepress");
  }
});
</script>

<style lang="scss" scoped>
.suggestion {
  overflow: hidden;
  user-select: none;
  /* background: red; */
  margin-top: 30px;
  padding: 0 30px;
  box-sizing: border-box;
  p {
    font-size: 30px;
  }
  .line {
    font-size: 16px;
  }
}
.theme {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .item {
    width: 300px;
    height: 200px;
    box-shadow: 0 0 20px var(--el-bg-color-shadowCol);
    margin: 20px;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
    .themeBg {
      border-radius: 4px;
      width: 100%;
      height: 100%;
    }
    .check {
      position: absolute;
      box-shadow: 0 0 20px var(--el-bg-color-shadowCol);
      /* right: 10px;
      top: 10px; */
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--el-tag-bg-color);
      --el-tag-bg-color: var(--el-color-primary-light-9);
      --el-tag-border-color: var(--el-color-primary-light-8);
      --el-tag-hover-color: var(--el-color-primary);
      --el-tag-text-color: var(--el-color-primary);
      background-color: var(--el-tag-bg-color);
      border-color: var(--el-tag-border-color);
      color: var(--el-tag-text-color);
      .el-icon {
        font-size: 30px;
      }
    }
  }
}
</style>
