<template>
  <div class="updatePsd">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="password">
        <el-input v-model.trim="ruleForm.password" show-password clearable placeholder="请填写原密码" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model.trim="ruleForm.newPassword" show-password clearable placeholder="请填写新密码(必须包含数字字母)" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model.trim="ruleForm.confirmPassword" show-password clearable placeholder="请填写确认密码(必须包含数字字母)" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disabledSubmit" @click="submitForm(ruleFormRef)"
        >提交修改</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import {updateUserPsdByProfile} from "@/api/request";
import {IProfileUpdatePsdParams} from "@/types/user";
import {useValidateLogin} from "@/hooks/validateLogin"
const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  password: "",
  newPassword: "",
  confirmPassword: "",
})

const disabledSubmit = ref(false)

type Props = {
  isDisableUpdate:boolean
}
const props = withDefaults(defineProps<Props>(),{
  isDisableUpdate:false
})

watch(props,()=>{
  const isDisableUpdate = toRaw(toRaw(props).isDisableUpdate)
  if(isDisableUpdate) return disabledSubmit.value = true
})

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('原密码不能为空'))
  }  else {
    callback()
  }
}
const validateNewPassword = (rule: any, value: any, callback: any) => {
  const reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  if (value === '') {
    callback(new Error('新密码不能为空'))
  }else if (!reg.test(value)) {
    callback(new Error('确认密码必须由数字字母组成且为8-16位'))
  }else if (value.length < 8) {
    callback(new Error('密码不得少于8位数'))
  } else {
    callback()
  }
}
const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  const reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  if (value === '') {
    callback(new Error('确认密码不能为空'))
  }else if (!reg.test(value)) {
    callback(new Error('确认密码必须由数字字母组成且为8-16位'))
  }else if (value.length < 8) {
    callback(new Error('确认密码不得少于8位数'))
  }else if (value !== ruleForm.newPassword) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}


const rules = reactive({
  password: [{ validator: validatePassword,required:true, trigger: 'change' }],
  newPassword: [{ validator: validateNewPassword, required:true,trigger: 'change' }],
  confirmPassword: [{ validator: validateConfirmPassword, required:true,trigger: 'change' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const {state,login} =await useValidateLogin()
      if(!state||!login) return
      getUpdatePsd()
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const router = useRouter()
//提交修改密码
const getUpdatePsd = async ()=>{
  const obj:IProfileUpdatePsdParams = {
    userId,
    ...toRaw(ruleForm)
  }
  const {data:res} = await  updateUserPsdByProfile(obj)
  if (res.code == 403) return ElMessage.warning("原密码不正确")
  if (res.code == 404) return ElMessage.error("密码修改失败")
  ElMessage.success("密码修改成功 请重新登录")
  localStorage.removeItem("token")
  localStorage.removeItem("userInfo")
  setTimeout(()=>{
    router.push("/login")
  },800)

}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.updatePsd{
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