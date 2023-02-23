<template>
  <div class="updateUserInfo">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="修改信息" name="userInfo">
        <BaseInfo @updateUserInfo="updateUserInfo" :userInfo="userInfo" :isDisableUpdate="isDisableUpdate"></BaseInfo>
      </el-tab-pane>
      <el-tab-pane label="修改头像" name="avatar">
       <div class="upload">
         <el-upload
             class="avatar-uploader"
             :action="uploadAction"
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload"
         >
           <img v-if="userImg" :src="userImg" class="avatar" />
           <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
         </el-upload>
         <el-button  :isDisableUpdate="isDisableUpdate" class="updateImg" type="primary" plain @click="submitUserImg">提交</el-button>
       </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="psd">
        <UpdatePsd :isDisableUpdate="isDisableUpdate"></UpdatePsd>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import BaseInfo from "./components/baseInfo/index.vue"
import UpdatePsd from "./components/updatePsd/index.vue"
import type { TabsPaneContext } from 'element-plus'
import {IUserInfoData} from "@/types/user";
import {useValidateIDisabled} from "@/hooks/validateIDisabled"
import {useValidateLogin} from "@/hooks/validateLogin"
import {getUserInfoById} from "@/api/request";
import {emitter} from "@/emitter";
import {uploadAction} from "@/api/upload";
import {Plus} from "@element-plus/icons-vue"
import {updateUserInfoImg} from "@/api/request"
const activeName = ref('userInfo')
const userImg = ref('')
const userInfo = ref<IUserInfoData[]>([])
const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId
const isDisableUpdate = ref(false)
onMounted(async ()=>{
  document.documentElement.scrollTop=0
  getStoreUserInfo()
  const isDisable =await useValidateIDisabled("修改")
  if(isDisable) {
    isDisableUpdate.value = true
  }
})

//获取本地用户信息
const getStoreUserInfo = ()=>{
  const users = JSON.parse(localStorage.getItem("userInfo") as string)
  userInfo.value = [users]
}

//更新用户信息
const updateUserInfo = async ()=>{
  const {data:res} = await getUserInfoById(userId)
  if(res.code!=200) return ElMessage.error("服务异常，请稍后再试")
  localStorage.setItem("userInfo",JSON.stringify(res.data[0]))
  getStoreUserInfo()
  emitter.emit("updateUserInfoGlobal")
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
}
const handleAvatarSuccess = (response:any, uploadFile:any) => {
  userImg.value = response.url;
};

//点击提交修改按钮 修改用户头像
let submitUserImg = async () => {
  const {state,login} =await useValidateLogin()
  if(!state||!login) return
  if (!userImg.value) return ElMessage.warning("请先上传图片");
  let { data: res } = await updateUserInfoImg(userId, userImg.value);
  if (res.code !== 200) return ElMessage.error("图像修改失败");
  ElMessage.success("图像修改成功");
  userImg.value = "";
  updateUserInfo()
};


const beforeAvatarUpload = async (rawFile:any) => {
  const {state,login} =await useValidateLogin()
  if(!state||!login) return
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("头像大小为2MB以内!")
    return false
  }
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("请上传jpg格式的图片!")
    return false
  }
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.src = URL.createObjectURL(rawFile)
    image.onload = () => {
      let canvas = document.createElement("canvas")
      let ctx:any = canvas.getContext("2d")
      let initSize = image.src.length
      let { width } = image,
          { height } = image
      canvas.width = width
      canvas.height = height
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0, width, height)
      let compressData = canvas.toDataURL("image/jpeg", 0.1)
      let byteString
      if (compressData.split(",")[0].indexOf("base64") >= 0) {
        byteString = atob(compressData.split(",")[1])
      } else {
        byteString = unescape(compressData.split(",")[1])
      }
      let mimeString = compressData.split(",")[0].split(":")[1].split(";")[0]
      let ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i)
      }
      let qwe = new Blob([ia], { type: mimeString })
      resolve(qwe)
    }
  })
};
</script>

<style lang="scss" scoped>
.updateUserInfo{
  padding: 25px;
  box-sizing: border-box;
  user-select: none;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

::v-deep(.el-upload){
  background-color: var(--el-disabled-bg-color);
  box-shadow: 0 0 0 1px var(--el-disabled-border-color) inset;
}

.upload{
  margin-top: 20px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed red;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.updateImg{
  margin-top: 25px;
  width: 17%;
}
</style>