<template>
  <div class="artInfoForm">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="内容标题" class="item" prop="artTitle">
        <el-input clearable v-model.trim="ruleForm.artTitle"  placeholder="请填写内容标题" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="内容详情" class="item"  prop="artIntroduce">
        <el-input clearable v-model.trim="ruleForm.artIntroduce"  placeholder="请填写内容详情(简单描述文章主体内容)" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="文章分类"  prop="tag">
        <el-select
            style="width: 25%"
            @visible-change="visibleChange"
            clearable
            :ultiple-limit="3"  multiple v-model="ruleForm.tag" filterable placeholder="请选择文章所属分类">
          <el-option
              v-for="item in data"
              :key="item.tagId"
              :label="item.name"
              :value="item.name"
          />
        </el-select>
      </el-form-item>
    
      <el-form-item   prop="artContent" class="markdown" label="文章内容" >
        <MarkDown  :previewOnly="false" :value="ruleForm.artContent" v-model="ruleForm.artContent" ></MarkDown>
      </el-form-item>
      <el-form-item label="仅自己可见" >
        <el-switch
            v-model="ruleForm.isHidden"
            class="ml-2"
            :width="60"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            style="
            --el-switch-on-color: teal;
             --el-switch-off-color: #DCDFE6"
        />
      </el-form-item>
      <el-form-item>
        <el-button plain class="submitBtn" :disabled="updateDisabled" type="primary" @click="submitForm(ruleFormRef)"
        >提交</el-button
        >
        <el-button plain  type="danger" class="resetBtn"  @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button  plain class="previewBtn"  @click="clickPreView">{{preViewOpen?'关闭':'预览'}}</el-button>
      </el-form-item>
    </el-form>
    <el-drawer direction="ltr"  show-close size="60%" v-model="preViewOpen"  :with-header="false">
      <MarkDown :previewOnly="true" :value="ruleForm.artContent"></MarkDown>
    </el-drawer>


    <el-dialog
        v-model="uploadShow"
        title="温馨提示"
        width="35%"
        top="25vh"
        :show-close="false"
    >
      <el-checkbox v-model="check"
                   label="点击选择上传标题配图(可以忽略上传)"
                   size="large"
      />
      <el-upload
          v-show="check"
          class="upload-demo upload"
          drag
          :action="uploadAction"
          multiple
          :on-success="handleAvatarSuccess"
          :before-upload="beforeUpload"
          :show-file-list="false"
      >
        <img v-if="artImg" style="width: 100%;height: 100%;object-fit: cover" :src="artImg" class="avatar" />
        <el-icon v-if="!artImg" class="el-icon--upload"><upload-filled /></el-icon>
        <div v-if="!artImg" class="el-upload__text">
          可拖拽图片至此次处或 <em>点击选择上传图片</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            可上传jpg/png类型的图片
          </div>
        </template>
      </el-upload>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="uploadShow = false">关闭</el-button>
        <el-button type="primary" :loading="submitLoading" :disabled="disAbleSubmit" @click="submitArt"
        >{{submitLoading?'提交中':'提交'}}</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {uploadAction} from "@/api/upload"
import {getCurTime} from "@/utils/getCurTime"
import {getSubmitPublish,getArtContentById,updatePublish} from "@/api/request"
import type { FormInstance } from 'element-plus'
import {IPublishArt, ITagsData, IUpdateArtParams} from "@/types/article";
import {useValidateLogin} from "@/hooks/validateLogin"
import {useValidateIDisabled} from "@/hooks/validateIDisabled"
import { Check, Close,UploadFilled } from '@element-plus/icons-vue'
defineProps<{data:ITagsData[]}>()
const ruleFormRef = ref<FormInstance>()
const preViewOpen  = ref(false)  //预览弹出层
const uploadShow  = ref(false)  //上传图片对话框
const check  = ref(false)  //是否需要上传标题配图
const submitLoading  = ref(false)  //提交时按钮处于加载中
const artImg  = ref("")  //上传图片路径
const disAbleSubmit = ref(false)
const updateDisabled = ref(false)
const route = useRoute()
const userId = ref()
const router = useRouter()
onMounted(async ()=>{
  const isDisable =await useValidateIDisabled("发布")
  if(isDisable) return disAbleSubmit.value = true
})


const artId = ref("")
onActivated(async ()=>{
  ruleFormRef.value?.resetFields()
  artId.value = route.query.artId as string
  userId.value = JSON.parse(localStorage.getItem("userInfo") as string)?.userId
  if(route.query.artId){
    artId.value = route.query.artId as string
    getArtDetail()
    const isDisable =await useValidateIDisabled("修改")
    if(isDisable) return updateDisabled.value = true
  }else{
    const isDisable =await useValidateIDisabled("发布")
    if(isDisable) return disAbleSubmit.value = true
  }
})

//编辑页面文章内容获取
const getArtDetail = async ()=>{
  const {data:res} = await getArtContentById(artId.value,userId.value)
  console.log(res)
  const hidden = res?.data[0]?.hidden
  const mangerHidden = res?.data[0]?.mangerHidden
  const uid = res?.data[0]?.userId
  if(hidden=="1" && uid!=userId.value){
    return  router.replace("/notFound")
  }
  if(mangerHidden=="1"){
    return  router.replace("/notFound")
  }
  ruleForm.artTitle = res?.data[0]?.artTitle
  ruleForm.artIntroduce = res?.data[0]?.artIntroduce
  ruleForm.isHidden = res?.data[0]?.hidden == "1" ? true : false
  ruleForm.tag = res?.data[0]?.tag?.split(",")
  const Content = res.data[0]?.artContent?.replace(/shuangyinghao/g, '"') // 双引号
  ruleForm.artContent = Content?.replace(/danyinhao/g, "'") // 单引号
}


const validateArtTitle = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('文章标题不能为空'))
  } else
    if (value.length < 8 || value.length > 30) {
      callback(new Error('标题的字数应该在8-30之间'))
    }else {
    callback()
  }
}


const validateIntroduce = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('文章描述不能为空'))
  } else
    if (value.length < 8 || value.length > 40) {
      callback(new Error('描述的字数应该在8-40之间'))
    }else {
    callback()
  }
}
const validateTag = (rule: any, value: any, callback: any) => {
  if (value.length==0) {
    callback(new Error('分类标签不能为空'))
  }else if(value.length>3){
    callback(new Error('最多可选择3个标签'))
  }
   else {
    callback()
  }
}
const validateArtContent = (rule: any, value: any, callback: any) => {
  if (value.length==0) {
    callback(new Error('文章内容不能为空'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  artTitle: "",
  artIntroduce: "",
  tag: [],
  isHidden:false,
  artContent:"",
})

const rules = reactive({
  artTitle: [{ validator: validateArtTitle,required: true, trigger: 'change' }],
  artIntroduce: [{ validator: validateIntroduce,required: true, trigger: 'change' }],
  tag: [{ validator: validateTag,required: true, trigger: 'change' }],
  artContent: [{ validator: validateArtContent,required: true, trigger: 'change' }],
})


//打开select
const visibleChange = ()=>{
  // console.log("open")
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if(artId.value){
        ElMessageBox.confirm(
            '您确定要提交修改吗?',
            '温馨提示',
            {
              confirmButtonText: '确认提交',
              cancelButtonText: '取消',
              type: 'warning',
            }
        )
            .then(async () => {
              const {state,login} =await useValidateLogin()
              if(!state||!login) return
              getSubUpdate()
            })
            .catch(() => { })
      }else{
        uploadShow.value = true
      }
    } else {
      // console.log('error submit!')
      return false
    }
  })
}

//提交修改
const getSubUpdate = async ()=>{
  const Content1 = ruleForm.artContent?.replace(/"/g, "shuangyinghao") // 双引号
  const coo = Content1?.replace(/(',’,‘)/g, "danyinhao") // 单引号
  const boo = ruleForm.isHidden ? "1" : "0"
  const params = {
    artId: artId.value,
    updatetime: getCurTime(),
    artContent:coo,
    artTitle: ruleForm.artTitle,
    artIntroduce: ruleForm.artIntroduce,
    tag: toRaw(ruleForm.tag).join(","),
    hidden: boo,
  }
  const {data:res} = await updatePublish(params)
  if(res.code!=200) return ElMessage.error("修改提交失败")
  ElMessage.success("修改提交成功")
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  ElMessageBox.confirm(
      '重置以后所有内容将会被清空！您确定要这样做吗？',
      '温馨提示',
      {
        confirmButtonText: '确认重置',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        formEl.resetFields()
      })
      .catch(() =>{})

}
//点击预览
const clickPreView = ()=>{
  if(!ruleForm.artContent.trim()) return ElMessage.warning("文章内容不能为空哦")
  preViewOpen.value=!preViewOpen.value
}



//提交服务器
const submitArt = async ()=>{
  const {state,login} =await useValidateLogin()
  if(!state||!login) return
  submitLoading.value = true
  const Content1 = ruleForm.artContent?.replace(/"/g, "shuangyinghao") // 双引号
  const coo = Content1.replace(/(',’,‘)/g, "danyinhao") // 单引号
  const obj:IPublishArt = {
    artContent:coo,
    artId:new Date().getTime() + new Date().getTime(),
    artImg:artImg.value,
    userId:JSON.parse(localStorage.getItem("userInfo")  as string)?.userId,
    artTitle:ruleForm.artTitle,
    artDate:getCurTime(),
    tag:ruleForm.tag?.join(","),
    artIntroduce:ruleForm.artIntroduce,
    hidden:ruleForm.isHidden?"1":"0",
  }
  const {data:res}= await getSubmitPublish(obj).finally(()=>{
    return submitLoading.value = false
  })
  if (res.code != 200) ElMessage.error("文章提交失败")
  uploadShow.value = false
  ruleFormRef.value?.resetFields()
  artImg.value = ""
  // ElMessage({
  //   message: '文章发布提交成功,已进入审核中！请您耐心等待',
  //   grouping: true,
  //   type: 'success',
  //   showClose:true,
  //   duration:8000
  // })
  ElMessage({
    message: '文章发布成功',
    grouping: true,
    type: 'success',
  })
}

//上传图片
//上传图片相关
const handleAvatarSuccess = (response:any) => {
  if (response.code != 200) return ElMessage.error("图片上传失败")
  artImg.value = response.url
}

const beforeUpload =async (rawFile:any) => {
  const {state, login} = await useValidateLogin()
  if (!state || !login) return
  const isDisable =await useValidateIDisabled("删除")
  if(isDisable) return
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小在2MB以内!")
    return false
  }
}


</script>

<style lang="scss" scoped>
.artInfoForm{
  width: 100%;
  min-height: 300px;
  background: var(--el-bg-color);
  overflow: hidden;
  border-radius: 4px;
  .el-form{
    width: 95%;
    margin-top: 40px;
    padding-right: 100px;
    .el-form-item{
      padding-bottom: 4px;
      .submitBtn,.resetBtn,.previewBtn{
        position: fixed;
        top: 130px;
        right:45px;
        z-index: 888;
      }
      .submitBtn{
        top: 130px;
      }
      .resetBtn{
        top: 180px;
      }
      .previewBtn{
        top: 230px;
      }
    }
  }
  .item{
    width: 70%;
  }
  .markdown{
    //width: 100%;
    display: flex;
    flex-direction: column;
    ::v-deep(.el-form-item__content){
      padding-left: 50px !important;

    }
    ::v-deep(.el-form-item__error){
      padding-left: 50px !important;

    }
  }
}

.el-upload{
  height: 180px !important;
}
.upload{
  width: 340px;
  height: 230px;
  min-height: 100px;
  padding: 0 !important;
  margin: 0 !important;
  box-sizing: border-box;
}
::v-deep(.el-upload-dragger){
  height: 100%;
  padding: 0!important;
}
</style>