<template>
  <!-- <Loading v-show="loading"/>
  <div class="collect"  v-show="!loading"> -->
  <div class="collect" >
    <div class="top">
      <el-tag size="large" plain>您已经收藏了<b>{{total}}</b>篇文章</el-tag>
      <div class="switch">
        <el-switch
            v-model="switchShow"
            class="mb-2"
            width="100"
            :disabled="empty || !total"
            @change="switchChange"
            active-text="仅自己可见"
            inactive-text="收藏内容公开可见"
            :loading="switchLoading"
        />
      </div>
    </div>
    <Loading :height="480" class="searchLoading" :key="Date.now()" :top="-65" v-show="loading"/>
    <div v-show="!loading">
    <div class="item" >
      <ArticleItemList :isCollect="true" :list="collectData"></ArticleItemList>
    </div>
    <el-result
        v-show="empty"
        icon="warning"
        style="margin-top: 70px"
        title="您还没有收藏过文章呢"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/home')">找点好文章</el-button>
      </template>
    </el-result>
    <Pagination
        v-if="!empty"
        :pageOn="objParams.pageOn"
        :pageCount="objParams.pageCount"
        :total="total"
        @changeNum = changeNum
    ></Pagination>
  </div>
  </div>

</template>

<script lang="ts" setup>
import {getUserCollect,getUserInfoById,updateCollectIsHidden} from "@/api/request"
import {IUserCollectParams,IArticleData} from "@/types/article"
import {IIndexArticleParams} from "@/views/home/types";
import {deleteCollect} from "@/api/request";
import {emitter} from "@/emitter";
import {useValidateLogin} from "@/hooks/validateLogin"
const total = ref(0)
const empty = ref(false)
const switchShow = ref(false)
const switchLoading = ref(false)
const loading = ref(false)
const collectData =ref<IArticleData[]>([])
const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId
const objParams:IIndexArticleParams = reactive({
  pageOn:1,
  pageCount:15
})

onMounted(()=>{
  loading.value = true
  document.documentElement.scrollTop=0
  getCollect()
  getIsHidden()
})

//触发页码切换
const changeNum = (num:number)=>{
  objParams.pageOn = num
  getCollect()
  document.documentElement.scrollTo({
    top:0,
    behavior:"smooth"
  })
}

//获取用户收藏文章列表
const getCollect = async ()=>{
  const params:IUserCollectParams = {
    userId,
    ...toRaw(objParams)
  }
  const {data:res} = await getUserCollect(params).finally(() => {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
  if(res.code!=200){
    empty.value = true
    collectData.value = []
    return
  }
  const dataList = res.data?.map((item:IArticleData)=>{
      item.tag = (item.tag as any)?.join(",")
      return item
  })
  collectData.value = dataList
  total.value = res.total


}

//移除用户收藏
emitter.on("removeCollectArt",async (id)=>{
  const {data:res} = await deleteCollect(id as string|number)
  if(res.code!=200) return ElMessage.error("移除收藏失败")
  ElMessage.success("移除成功")
  getCollect()
})

//获取收藏状态
const getIsHidden = async () => {
  let { data: res } = await getUserInfoById(userId);
  if (res.data[0].collectVisiable == "1") {
    switchShow.value = true;
  } else {
    switchShow.value = false;
  }
};

//切换收藏内容是否公开显示
const switchChange =async ()=>{
  const {state,login} =await useValidateLogin()
  if(!state||!login) {
    switchShow.value = !switchShow.value;
    return
  }
    let collectVisiable = "";
    switchShow.value ? (collectVisiable = "0") : (collectVisiable = "1");
    let { data: res } = await updateCollectIsHidden(userId, collectVisiable).finally(()=>switchLoading.value = false);
    if (res.code == 4044) return switchShow.value = !switchShow.value
    if (res.code == 200) {
      getIsHidden();
  }
}
</script>

<style lang="scss" scoped>
.collect {
  width: 100%;
  min-height: 300px;
  padding: 25px 0;
  box-sizing: border-box;
  user-select: none;
  .top {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--el-border-color);
    box-sizing: border-box;
    padding: 0 15px;
    border-radius: 4px;
    .el-tag {
      font-size: 17px;
    }
  }
  .item{
    margin-top: 15px;
  }
}
</style>