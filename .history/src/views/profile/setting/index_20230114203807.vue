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
      />
    </div>
    <div>编辑器主题</div>
    <div class="theme">
  <!-- default' | 'github' | 'vuepress'  |'mk-cute' | 'smart-blue' | 'cyanosis' -->
      <div class="item">
        <img
          class="themeBg"
          src="../../../assets/images/codeTheme/vuepress.png"
          alt=""
        />
      </div>
      <div class="item">
        <img
          class="themeBg"
          src="../../../assets/images/codeTheme/github.png"
          alt=""
        />
      </div>
      <div class="item">
        <img
          class="themeBg"
          src="../../../assets/images/codeTheme/mk-cute.png"
          alt=""
        />
      </div>
      <div class="item">
        <img
          class="themeBg"
          src="../../../assets/images/codeTheme/smart-blue.png"
          alt=""
        />
      </div>
      <div class="item">
        <img
          class="themeBg"
          src="../../../assets/images/codeTheme/cyanosis.png"
          alt=""
        />
      </div>
      <div class="item">
        <img
          class="themeBg"
          src="../../../assets/images/codeTheme/default.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Check, Close } from "@element-plus/icons-vue";
const line = ref(true);
const radio = ref(3);
const changeLine = (val: boolean) => {
  localStorage.setItem("line", val + "");
};
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
    border-radius: 10px;
    .themeBg {
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
