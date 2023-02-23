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
      <div class="item" @click="changeCheckTheme(item.id,item.value)" v-for="(item,index) in data" :key="item.id">
        <img
          class="themeBg"
          :src="item.url"
          alt=""
        />
        <div class="check" v-if="item.id==index+1">当前主题</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Check, Close } from "@element-plus/icons-vue";
const line = ref(true);
const radio = ref(3);
const preCheck = ref(0)
const changeLine = (val: boolean) => {
  localStorage.setItem("line", val + "");
};

const data = ref<{id:number,value:string,url:string}[]>([
  {id:1,value:"vuepress",url:'https://api.helloxlj.top/public/static/theme/vuepress.png'},
  {id:1,value:"github",url:'https://api.helloxlj.top/public/static/theme/github.png'},
  {id:1,value:"mk-cute",url:'https://api.helloxlj.top/public/static/theme/mk-cute.png'},
  {id:1,value:"smart-blue",url:'https://api.helloxlj.top/public/static/theme/smart-blue.png'},
  {id:1,value:"cyanosis",url:'https://api.helloxlj.top/public/static/theme/cyanosis.png'},
  {id:1,value:"default",url:'https://api.helloxlj.top/public/static/theme/default.png'},
])

const changeCheckTheme = (id:number){
  
}
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
    border-radius: 4px;
    position: relative;
    .themeBg {
      border-radius: 4px;
      width: 100%;
      height: 100%;
    }
    .check{
      position: absolute;
      background: red;
      right: 0;
      top: 0;
    }
  }
}
</style>
