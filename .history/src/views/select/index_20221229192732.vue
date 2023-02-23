<template>
  <div class="select">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="基本信息"  name="first">
        <BaseInfo :data="userInfo"></BaseInfo>
      </el-tab-pane>
      <el-tab-pane label="文章" name="second">
        <SelectArticle :userId="userId"></SelectArticle>
      </el-tab-pane>
      <el-tab-pane label="收藏" name="third">
        <SelectCollect  :userId="userId"></SelectCollect>
      </el-tab-pane>
      <el-tab-pane label="点赞" name="fourth">
        <SelectLike></SelectLike>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import BaseInfo  from "./components/baseInfo/index.vue"
import SelectArticle from "./components/selectArticle/index.vue"
import SelectCollect from "./components/selectCollect/index.vue"
import SelectLike from "./components/selectLike/index.vue"
import type { TabsPaneContext } from 'element-plus'
import {IUserInfoData} from "@/types/user";
import {getUserInfoById} from "@/api/request";
const activeName = ref('first')
const userInfo = ref<IUserInfoData[]>([])
const route = useRoute()
const userId = ref( route.params.userId as string)
onMounted(()=>{
  getUser()
})

//获取用户信息
const getUser = async ()=>{
  if(!userId) return
  const {data:res} = await  getUserInfoById(userId.value)
  if(res.code!=200){
    userInfo.value = []
    return
  }
  userInfo.value = res.data
}


const handleClick = (tab: TabsPaneContext, event: Event) => {
  if(tab.paneName=='third'){
    getUser()
  }

}
</script>

<style lang="scss" scoped>
.select{
  width: 1200px;
  min-height:100vh ;
  background: var(--el-bg-color);
  overflow: hidden;
  padding: 15px 30px;
  margin: 0 auto;
  box-sizing: border-box;
  user-select: none;
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
}

</style>