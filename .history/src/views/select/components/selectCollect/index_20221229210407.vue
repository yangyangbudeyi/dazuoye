<template>
  <div class=selectCollect>
    <ArticleItemList :isCollect="false" :list="artData"></ArticleItemList>
    <div >
      <Pagination
          v-if="!collectIsHidden ||!empty"
          :pageOn="objParams.pageOn"
          :pageCount="objParams.pageCount"
          :total="total"
          @changeNum=changeNum
      ></Pagination>
    </div>

    <el-result
        class="result"
        v-if="empty"
        icon="warning"
        title="ta的收藏夹空空如也"
    />
    <el-result
        class="result"
        v-if="collectIsHidden"
        icon="warning"
        title="ta的收藏内容仅自己可见"
    />
  </div>
</template>

<script setup lang="ts">
import {IIndexArticleParams} from "@/views/home/types";
import {getUserCollect, getUserInfoById} from "@/api/request";
import {IArticleData, IUserCollectParams} from "@/types/article";
const artData = ref([])
const empty = ref(false)
const total = ref(0)
const objParams: IIndexArticleParams = reactive({
  pageOn: 1,
  pageCount: 10
})
const collectIsHidden = ref(false)
const props = defineProps<{ userId: string }>()

onMounted(() => {
  getUser()
})
onActivated(()=>{
  getUser()
})
//获取用户信息
const getUser = async ()=>{
  if(!props.userId) return
  const {data:res} = await  getUserInfoById(props.userId)
  if(res.code!=200){
    return
  }
  if(res.data[0]?.collectVisiable=='1'){
    collectIsHidden.value = true
  }else{
    getUserCol()
  }
}


const changeNum = (num: number) => {
  objParams.pageOn = num
  document.documentElement.scrollTop = 0
  getUserCol()
}
watch(()=>props.userId,(newVal,preVal)=>{
  getUserCol()
})

//获取用户发布的文章
const getUserCol = async () => {
  const params:IUserCollectParams = {
    userId:props.userId,
    ...toRaw(objParams)
  }
  const {data:res} = await getUserCollect(params)
  if (res.code != 200) {
    empty.value = true
    artData.value = []
    return
  }
  const dataList = res.data?.map((item:IArticleData)=>{
    item.tag = (item.tag as any)?.join(",")
    return item
  })
  const arr = dataList?.filter((item:IArticleData)=>{
    if(  item.hidden!='1' ){
      return item
    }
  })?.filter((item:IArticleData)=>{
    if( item.mangerHidden!='1'){
      return item
    }
  })
  artData.value = arr
  total.value = res.total-(res.total-arr.length)
}
</script>

<style lang="scss" scoped>
.result {
  margin-top: 50px;
}
</style>