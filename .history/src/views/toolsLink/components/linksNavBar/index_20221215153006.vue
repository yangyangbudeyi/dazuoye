<template>
  <div class="box" v-loading="true">
    <div class="select-box">
      <!-- 顶部菜单栏 -->
      <div class="select-content">
        <button
          class="learn-more select-content-list"
          @click="getPidId(index)"
          :class="{ active: currentIndex == index }"
          v-for="(item, index) in firstCate"
          :key="index"
        >
          <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
          </span>
          <span class="button-text"> {{ item }}</span>
        </button>
        <el-tooltip
          content="点击快速查询链接内容"
          placement="top"
          effect="light"
        >
          <div @click="clickSearch" class="search_btn">
            <el-icon><Search /></el-icon>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
const router = useRouter();
const emit = defineEmits(["getSecondCate"]);
const props = defineProps(["firstCate"]);
const currentIndex = ref(0);

const getPidId = (index: any) => {
  currentIndex.value = index;
  emit("getSecondCate", index);
};

const clickSearch = () => {
  router.push("/search/link");
};
</script>

<style lang="scss" scoped>
.select-box {
  user-select: none;
  padding: 10px;
  margin-bottom: 20px;
  .select-content {
    min-height: 130px;
    width: 96%;
    border-radius: 5px;
    display: flex;
    padding: 0 10px 0 60px;
    align-items: center;
    flex-wrap: wrap;
    z-index: 888;
    margin: 0 auto;
    z-index: 88;
    box-sizing: border-box;
    .select-content-list {
      margin: 40px 30px 25px;
    }
    .active {
      .circle {
        width: 100%;
        box-shadow:  0 0 10px #ccc;
        .icon {
          background: #282936;
          transform: translate(1rem, 0);
        }
      }
      .button-text {
        color: #282936;
      }
    }
    .select-content-last {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      .el-input {
        width: 27%;
        margin-right: 4%;
        margin-top: 13px;
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
          bottom: 0px;
          left: 0;
          width: 100%;
          height: 2.2px;
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
    }
  }
}

.search_btn {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: red;
  position: fixed;
  right: 100px;
  top: 140px;
  --el-backtop-bg-color: var(--el-bg-color-overlay);
  --el-backtop-text-color: var(--el-color-primary);
  --el-backtop-hover-bg-color: var(--el-border-color-extra-light);
  background-color: var(--el-backtop-bg-color);
  color: var(--el-backtop-text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: var(--el-box-shadow-lighter);
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: var(--el-backtop-hover-bg-color);
  }
}

button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
}

button.learn-more {
  width: 11rem;
  height: auto;
}

button.learn-more .circle {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: relative;
  display: block;
  margin: 0;
  width: 2.5rem;
  height: 2.5rem;
  // background: #282936;
  background: #fff;
  border-radius: 1.625rem;
}

button.learn-more .circle .icon {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
}

button.learn-more .circle .icon.arrow {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  left: 0.51rem;
  width: 1rem;
  height: 0.11rem;
  background: none;
}

button.learn-more .circle .icon.arrow::before {
  position: absolute;
  content: "";
  top: -0.29rem;
  right: 0.0825rem;
  width: 0.58rem;
  height: 0.58rem;
  border-top: 0.12rem solid #282936;
  border-right: 0.12rem solid #282936;
  transform: rotate(45deg);
}

button.learn-more .button-text {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.7rem 0;
  margin: 0 0 0 1.5rem;
  color: #282936;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  // text-transform: uppercase;
}


button:hover .circle {
  width: 100%;
  box-shadow:  0 0 10px #ccc;
}

button:hover .circle .icon.arrow {
  background: #282936;
  transform: translate(1rem, 0);
}

button:hover .button-text {
  color: #282936;
}
</style>
