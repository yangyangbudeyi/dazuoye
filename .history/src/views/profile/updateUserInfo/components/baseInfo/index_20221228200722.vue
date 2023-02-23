<template>
  <div class="baseInfo">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="ID" prop="userId" >
        <el-input disabled v-model.trim="ruleForm.userId" type="text" placeholder="请填写用户ID" autocomplete="off" />
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input disabled v-model.trim="ruleForm.username" type="text" placeholder="请填写账号" autocomplete="off" />
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model.trim="ruleForm.name" type="text" placeholder="请填写昵称" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex" placeholder="请填写账号">
          <el-radio value="1" label="1">男</el-radio>
          <el-radio value="2" label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="地区" prop="address">
        <el-input v-model.trim="ruleForm.address" type="text" placeholder="请填写所在地区" autocomplete="off" />
      </el-form-item>
      <el-form-item label="签名" prop="introduce">
        <el-input v-model.trim="ruleForm.introduce" type="text" placeholder="请填写个性签名" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disabledSubmit" @click="submitForm(ruleFormRef)"
        >提交</el-button
        >
<!--        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import {IUpdateUserParams, IUserInfoData} from "@/types/user"
import {getCurTime} from "@/utils/getCurTime"
import {getUpdateUserInfo} from "@/api/request"
import {useValidateLogin} from "@/hooks/validateLogin"

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive<IUpdateUserParams>({
  username: '',
  sex: '1',
  address: '',
  userId: '',
  introduce: '',
  name: '',
})
const disabledSubmit = ref(true)

type Props = {
  userInfo:IUserInfoData[],
  isDisableUpdate:boolean
}
const props = withDefaults(defineProps<Props>(),{
  userInfo:()=>[],
  isDisableUpdate:false
})

const emits = defineEmits(["updateUserInfo"])

watch(props,()=>{
  const data:IUserInfoData[] = toRaw(toRaw(props).userInfo)
  const isDisableUpdate = toRaw(toRaw(props).isDisableUpdate)
  if(isDisableUpdate) return disabledSubmit.value = true
  if(data.length){
    disabledSubmit.value = false
    ruleForm.userId = data[0]?.userId as string | number
    ruleForm.sex = data[0]?.sex as string
    ruleForm.username = data[0]?.username as string
    ruleForm.introduce = data[0]?.introduce as string
    ruleForm.name = data[0]?.name as string
    ruleForm.address = data[0]?.address as string
  }
})

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户账号不能为空'))
  } else {
    callback()
  }
}

const validateSex = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('性别不能为空'))
  }  else {
    callback()
  }
}

const checkAddress = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback()
  }else if(value.length > 30){
    callback(new Error('所在地区长度不能超过30'))
  }  else {
    callback()
  }
}
const checkUserId = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户ID不能为空'))
  }  else {
    callback()
  }
}

const checkIntroduce = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback()
  }else if(value.length > 100){
    callback(new Error('个性签名长度不能超过100'))
  }  else {
    callback()
  }
}

const checkName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户昵称不能为空'))
  } else if(value.length > 10){
    callback(new Error('昵称长度不能超过10'))
  } else {
    callback()
  }
}




const rules = reactive({
  username: [{ validator: validateUsername,required:true, trigger: 'blur' }],
  sex: [{ validator: validateSex,required:true, trigger: 'blur' }],
  address: [{ validator: checkAddress, trigger: 'blur' }],
  userId: [{ validator: checkUserId, required:true,trigger: 'blur' }],
  introduce: [{ validator: checkIntroduce, trigger: 'blur' }],
  name: [{ validator: checkName,required:true, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const {state,login} =await useValidateLogin()
      if(!state||!login) return
      updateUser()
    } else {
      // console.log('error submit!')
      return false
    }
  })
}

//提交修改用户信息
const updateUser = async ()=>{
  if(!rules.userId) return
  const obj:IUpdateUserParams = {...toRaw(ruleForm),updateDate:getCurTime()}
  const {data:res} = await  getUpdateUserInfo(obj)
  if(res.code!=200) {
    ElMessage.error("个人信息修改失败")
    emits("updateUserInfo")
    return
  }
  emits("updateUserInfo")
  ElMessage.success("个人信息修改成功")
}


</script>

<style lang="scss" scoped>
.baseInfo{
  .el-form{
    width: 70%;
    margin-top: 30px;
    margin-left: -40px;
    .el-form-item{
      padding-bottom: 5px;
    }
  }
}

</style>