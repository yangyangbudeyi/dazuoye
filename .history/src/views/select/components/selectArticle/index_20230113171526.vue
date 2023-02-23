<template>
  <div class=selectArticle>
    <ArticleItemList :isCollect="false" :list="artData"></ArticleItemList>
    <Pagination
        v-if="!empty"
        :pageOn="objParams.pageOn"
        :pageCount="objParams.pageCount"
        :total="total"
        @changeNum = changeNum
    ></Pagination>
    <el-result
        class="result"
        v-if="empty"
        icon="warning"
        title="Ta还没有发布文章呢"
    />
  </div>
</template>

<script setup lang="ts">
import {IIndexArticleParams} from "@/views/home/types";
import {getUserPublicOther} from "@/api/request";

const empty = ref(false)
const total = ref(0)
const route = useRoute()
const objParams:IIndexArticleParams = reactive({
  pageOn:1,
  pageCount:10
})
onMounted(()=>{
  getUserArt()
})

const props=defineProps<{userId:string}>()
const changeNum = (num:number)=>{
  objParams.pageOn = num
  document.documentElement.scrollTop=0
  getUserArt()
}

const artData = ref([])

watch(()=>props.userId,(newVal,preVal)=>{
  getUserArt()
})

//获取用户发布的文章
const getUserArt = async ()=>{
  const params = {
    userId:props.userId,
    ...toRaw(objParams)
  }
  const {data:res} = await  getUserPublicOther(params)
  if(res.code!=200){
    empty.value = true
    artData.value = []
    return
  }
  artData.value =res.data
  total.value =res.total
}
</script>

<style lang="scss" scoped>
.result{
  margin-top: 50px;
}
</style>