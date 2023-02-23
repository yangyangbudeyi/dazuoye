<template>
<div class="navbar">
  <div class="left">
   <div class="detail">
     <img src="/src/assets/logo.png" alt="">
     <div class="menus">
       <router-link active-class="active"  :to="item.path" v-for="(item,index) in menuList" :key="index">
         {{item.name}}
       </router-link>
     </div>
   </div>
    <div class="search">
      <NavbarSearch></NavbarSearch>
    </div>
  </div>
  <el-switch
      v-model="isDark"
      class="ml-2 changeTheme"
      @change="toggleDark"
      @click="changeTheme"
      width="55px"
      inline-prompt
      :active-icon="Moon"
      :inactive-icon="Sunny"
      style="--el-switch-on-color: #2C2C2C; --el-switch-off-color: #DCDFE6"
  />
  <div class="right">
    <div class="login_no" v-if="!loginSuccessState" >
      <el-button type="success" plain @click="navigateLogin('login')">登录</el-button>
      <el-button type="primary" plain @click="navigateLogin('reg')">注册</el-button>
    </div>
    <el-dropdown placement="bottom-start" :hide-on-click="false"  v-else>
      <div class="login_yes">
        <img :src="userImg" alt="">
        <div class="userInfo">
          <span class="name">{{name}}</span>
          <span class="regTime">注册于{{getTimeBefore(regDate)}}</span>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="menus">
          <el-dropdown-item @click="$router.push('/profile')">个人中心</el-dropdown-item>
          <el-dropdown-item @click="clickLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </div>

</div>

</template>

<script lang="ts" setup>
import {getTimeBefore} from "@/utils/getTimeBefore"
import {Moon,Sunny} from "@element-plus/icons-vue"
import {emitter} from "@/emitter"
import {useValidateIDisabled} from "@/hooks/validateIDisabled"
import { useDark, useToggle } from '@vueuse/core'
const loginSuccessState = ref(false)
const userImg = ref("")
const regDate = ref("")
const name = ref("")
const router = useRouter()


//切换主题
const isDark = useDark()
const toggleDark = useToggle(isDark)


type Tmenu = {
  name:string,
  icon:string,
  path:string,

}
const menuList = ref<Tmenu[]>([
  {name:"首页",icon:"none",path:"/home"},
  {name:"写文章",icon:"none",path:"/write/article"},
  {name:"工具链接",icon:"none",path:"/tools/link"},
  {name:"关于",icon:"none",path:"/about"},
  {name:"访问统计",icon:"none",path:"/statistics"},
])


const changeTheme = ()=>{
  emitter.emit("changeDark")
}


onMounted(async ()=>{
  const isDisable =await useValidateIDisabled("访问")
  if(isDisable) {
    menuList.value = menuList.value?.filter((item:Tmenu)=>item.name!="访问统计")
  }
  getStoreUserInfo()
})

//获取本地用户信息
const getStoreUserInfo = ()=>{
  const userInfo = localStorage.getItem("userInfo")
  const token = localStorage.getItem("token")
  if(userInfo && token){
    loginSuccessState.value = true
    const {userImg:img,regDate:date,name:nickName} = JSON.parse(userInfo as string)
    regDate.value =date
    userImg.value = img
    name.value = nickName
  }
}

emitter.on('updateUserInfoGlobal',()=>{
  getStoreUserInfo()
})

const navigateLogin = (value:string)=>{
  router.push(`/login?commit=${value}`)
}

//接收登录成功的消息
emitter.on("loginSuccess", (value:any)=>{
  const {userImgParams,regDateParams,nameParams} =value
  loginSuccessState.value = true
  regDate.value = regDateParams
  userImg.value = userImgParams
  name.value = nameParams
})

//点击退出登录
const clickLogout = ()=>{
  ElMessageBox.confirm(
      '您确定要退出登录嘛?',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        localStorage.removeItem("userInfo")
        localStorage.removeItem("token")
        loginSuccessState.value = false
        router.push("/home")
        ElMessage({
          type: 'success',
          message: '已退出登录',
        })

      })
      .catch(() => { })
}
</script>

<style scoped lang="scss">
.navbar{
  width: 1320px;
  height: 60px;
  margin:0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  .left{
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .detail{
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        width: 90px;
        height: 160%;
        position: relative;
        top: -1px;
        object-fit: cover;
      }
      .menus{
        margin-left: 50px;
        min-width: 540px;
        // background: skyblue;
        a{
          text-decoration: none;
          margin-right: 80px;
          font-size: 16px;
          display: inline-block;
          color: var(--el-text-color-regular);
          transition: all .3s ease-out;
          position: relative;
          &:hover{
            color: teal;
          }
        }
        .active{
          color: teal;
          &::after {
            content: "";
            width: 120%;
            height: 3px;
            background: teal;
            position: absolute;
            bottom:-20px;
            left: -2px;
          }
        }
      }
    }
    .search{
      width: 290px;
      height: 100%;
      margin-right: 100px;
      display: flex;
      // background: red;
      align-items: center;
    }
  }
  .changeTheme{
    margin-right: 20px;
    background-color: var(--el-bg-color);
    color: var(--el-text-color);
    transition: border-color var(--el-transition-duration),background-color var(--el-transition-duration-fast);
    background-color: transparent;
    //display: none;
    border: 1px solid var(--border-color);
  }
  .right{
    width: 300px;
    height: 100%;
    .el-dropdown{
      height: 100%;
      .login_yes{
        display: flex;
        height: 100%;
        align-items: center;
        cursor: pointer;

        img{
          width: 47px;
          height: 80%;
          object-fit: cover;
          border-radius: 5px;
        }
        .userInfo{
          margin-left: 6px;
          span{
            display: inline-block;
            color: #555;
            font-size: 15px;
            width: 140px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .name{
            margin-top: 5px;
          }
          .regTime{
            font-size: 12px;
            margin-top: 2px;
          }


        }
      }
    }
    .login_no{
      display: flex;
      height: 100%;
      align-items: center;
    }
  }
}
.menus{
  //position: relative;
  //top: -40px;
}
//el-scrollbar__wrap--hidden-default
//el-popper is-pure is-light el-dropdown__popper
::v-deep(.el-popper>.el-scrollbar){
  position: relative !important;
  top: -12px !important;
}
</style>