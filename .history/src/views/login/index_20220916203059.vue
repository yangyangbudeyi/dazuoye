<template>
  <div class="login">
    <div class="container">
      <div class="tops">
        <img src="../../assets/logo.png" alt="">
        <span>欢迎访问</span>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="账号密码登录" name="login"><LoginForm :disabledBtn="disabledBtn" data="login"></LoginForm></el-tab-pane>
        <el-tab-pane label="立即注册" name="reg"><LoginForm :disabledBtn="disabledBtn" data="reg"></LoginForm></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "./components/loginForm/index.vue"
import type { TabsPaneContext } from 'element-plus'
import {useValidateIDisabled} from "@/hooks/validateIDisabled"
import {emitter} from "@/emitter";
import router from "@/router";
const activeName = ref('login')
const route = useRoute()
const commit = route.query.commit as string
if(commit){
  activeName.value = commit
}else{
  activeName.value = "login"
}

const disabledBtn =reactive ({
  login:false,
  reg:false
})
onMounted(async ()=>{
  const isDisable =await useValidateIDisabled("登录")
  if(isDisable) return disabledBtn.login = true
  const isDisable1 =await useValidateIDisabled("注册")
  if(isDisable1) return disabledBtn.reg = true
})

emitter.on("changeLogin",()=>{
  activeName.value = "login"
})
const handleClick = (tab: TabsPaneContext, event: Event) => {
  router.replace(`/login?commit=${tab.paneName}`)
}
</script>

<style lang="scss" scoped>
.login{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: var(--el-bg-color);
  display: flex;
  z-index: 999;
  align-items: center;
 justify-content: center;
  background-image: url("../src/assets/images/loginBg.svg");
  .container{
    width: 530px;
    height: 600px;
    text-align: center;
    .tops{
      //background: red;
      display: flex;
      align-items: center;
      height: 100px;
      justify-content: center;
      position: relative;
      left: -30px;
      img{
        width: 110px;
      }
      span{
        font-size: 44px;
      }
    }
    .el-tabs{
      margin-top: 30px;
    }
    .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
    }

    ::v-deep(.el-tabs__content){
      margin: 0 auto;
    }
    ::v-deep(.el-tabs__nav-scroll){
      width: 490px;
      display: flex;
      justify-content: center;
    }
    ::v-deep(.el-tabs__item){
      margin-left: 20px;
    }
      ::v-deep(.el-tabs__nav-wrap::after) {
      background: none;
    }

  }
}


</style>