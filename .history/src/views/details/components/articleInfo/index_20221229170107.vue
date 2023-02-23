<template>
  <div class="articleInfo" :style="{'padding': isActive?'15px':0}">
    <div :class="isActive?'active title':'title'">
      <p class="title_tip">文章标题:</p>
      <p class="content">{{artTitle}}</p>
    </div>
    <div  :class="isActive?'active articleCategory':'articleCategory'">
      <p class="tip">文章分类:
        <el-tag @click="navigateTags(item)" style="margin-right: 10px; cursor: pointer;"  type="info" v-for="(item,index) in tag?.split(',')" :key="index">
          {{item}}
        </el-tag>
      </p>
    </div>
    <div class="navigate" v-if="catalogData.length">
      <p class="tip" >目录导航:</p>
      <li v-for="(item,index) in catalogData" :key="index">
        <span>NO{{index+1}}</span>
        <a href="javascript:;" @click="clickTitle(item?.text)">{{ item?.text }}</a>
        <!-- <a :href="'#' + item?.text">{{ item?.text }}</a> -->
      </li>

    </div>
  </div>
</template>

<script setup lang="ts">
import {emitter} from "@/emitter";
import { ITagsData } from "@/types/article";
const isActive = ref(false)
const catalogData = ref<{
  id:string,
  text:string
}[]>([])
emitter.on("getArticleCatalog",(value)=>{
  catalogData.value=toRaw(value) as any
})
type Props = {
  tag:string,
  artTitle:string
}

defineProps<Props>()


const router = useRouter()
//跳转文章分类
const navigateTags = (value:string)=>{
  router.push(`/tags?key=${value}`)
}

//点击锚点跳转
const clickTitle = (path:string)=>{
  document.getElementById(path)?.scrollIntoView({
    behavior:"smooth",
  })
}

onMounted(()=>{
  window.addEventListener("scroll",getScrollTop)
})

const getScrollTop = (e:Event)=>{
  if(window.scrollY>200){
    isActive.value = true
  }else{
    isActive.value = false
  }
}

onUnmounted(()=>{
  window.removeEventListener("scroll",getScrollTop)
})
</script>

<style lang="scss" scoped>
.articleInfo{
  width: 100%;
  min-height: 0px;
  background: var(--el-bg-color);
  padding: 15px;
  box-sizing: border-box;
  margin-bottom: 6px;
  border-radius: 4px;
  user-select: none;
  p{
    margin: 0;
  }
  .title{
    min-height: 50px;
    display: none;
    .title_tip{
      margin-bottom: 7px;
      font-weight: 700;
      color: var(--el-text-color-regular);
    }
    .content{
      width: 100%;
      font-size: 15px;
      color: var(--el-text-color-regular);
      transition: all .3s;
      cursor: pointer;
      &:hover{
        color: teal;
      }
    }
  }
  .articleCategory{
    margin: 14px 0;
    display: none;
    min-height: 30px;
    .tip{
      font-weight: 700;
      color: var(--el-text-color-regular);
    }
  }
  .navigate{
    .tip{
      font-weight: bold;
      margin-bottom: 7px;
      color: var(--el-text-color-regular);
    }
    li{
      width: 100%;
      height: 25px;
      cursor: pointer;
      transition: all .3s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 15px;
      color: var(--el-text-color-regular);
      &:hover{
        a{
          color:teal;
        }
        color:teal;
      }
      a{
        scroll-behavior: smooth;
        transition: all .3s;
        text-decoration: none;
        color: var(--el-text-color-regular);
      }
      span{
        font-weight: bold;
        margin-right: 6px;
      }

    }
  }
}

.active{
  display: block !important;
}
</style>