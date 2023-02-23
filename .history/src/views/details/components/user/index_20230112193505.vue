<template>
  <div class="user">
    <img @click="navigateSelect(userId)" :src="userImg" alt="">
    <div class="info">
      <span class="name" @click="navigateSelect(userId)">{{name}}</span>
      <span class="date" v-if="userId=='EkmXwM5lG9nEviRArAGVi'"><el-tag class="ml-2" type="warning">楼主</el-tag></span>
      <span class="date">注册于{{getTimeBefore(regDate)}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getTimeBefore} from "@/utils/getTimeBefore"
const userIdStore = JSON.parse(localStorage.getItem("userInfo") as string)?.userId
defineProps<{
  name:string,
  userImg:string,
  regDate:string,
  userId:string
}>()

const router= useRouter()
//跳转用户个人主页
const navigateSelect = (userId:string)=>{
  if(userIdStore==userId){
    router.push('/profile/userInfo')
  }else{
    router.push({name:"select",params:{userId}})
  }
}

</script>

<style lang="scss" scoped>
.user{
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  background: var(--el-bg-color);
  padding: 0 14px;
  box-sizing: border-box;
  margin-bottom:  6px;
  border-radius: 4px;
  user-select: none;
  color: var(--el-text-color-regular);
img{
  width: 55px;
  height: 55px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  border: 4px solid var(--el-border-color);
}
.info{
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

span{
  display: inline-block;
  margin-top: 6px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.name{
  transition: all .3s;
  &:hover{
     cursor: pointer;
     color:teal;
   }

}
  .date{
    margin-top: 3px;
    font-size: 12px;
  }

}
}

</style>