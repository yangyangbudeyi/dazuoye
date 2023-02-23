<template>
  <p>重置密码</p>
  <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
  >
    <el-form-item prop="username">
      <el-input
          placeholder="请输入您的邮箱账号"
          v-model.trim="ruleForm.username"
          type="text"
          autocomplete="off"
          :prefix-icon="User"
      />
    </el-form-item>
    <el-form-item class="sendCode" prop="validateCode" >
      <el-input
          placeholder="请输入验证码"
          v-model.trim="ruleForm.validateCode"
          type="text"
          autocomplete="off"
          :prefix-icon="Monitor"
      />
      <el-button :disabled="disabledSendCode || disabledBtn" @click="clickSendCode">
        {{ codeMsg }}
      </el-button>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
          v-model.trim="ruleForm.password"
          type="password"
          autocomplete="off"
          show-password
          placeholder="请输入您的密码"
          :prefix-icon="Unlock"
      />
    </el-form-item>
    <el-form-item prop="checkoutPassword" >
      <el-input
          v-model.trim="ruleForm.checkoutPassword"
          type="password"
          show-password
          autocomplete="off"
          placeholder="请再次输入密码"
          :prefix-icon="Unlock"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
                 :disabled="disabledBtn"
                 class="loginBtn" @click="submitForm(ruleFormRef)"
      >重置密码
      </el-button
      >
    </el-form-item>

  </el-form>
  <div class="links">
    <router-link to="/login?commit=login">立即登录</router-link>
    <router-link to="/home">回到首页</router-link>
  </div>
</template>

<script lang="ts" setup>
import {getSendCodeRepsd, updatePsd, } from "@/api/request"
import {ILoginParams} from "@/types/login"
import {emitter} from "@/emitter"
import type {FormInstance} from 'element-plus'
import {User, Unlock, Monitor, Connection} from '@element-plus/icons-vue'
import {nanoid} from "nanoid";
import {getCurTime} from "@/utils/getCurTime";
import {IUserRegParams} from "@/types/user";
import {ElNotification} from "element-plus"
const ruleFormRef = ref<FormInstance>()
//是否禁用发送验证码按钮
const disabledSendCode = ref(false)
//设置发送验证码后文字提示
const codeMsg = ref("发送验证码")
//判断当前是登录或者注册
 defineProps<{  disabledBtn:boolean }>()


const router = useRouter()
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('账号不能为空'))
  } else {
    let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if (!reg.test(value)) {
      callback(new Error('请输入合法的邮箱'))
    }
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (!reg.test(value)) {
    callback(new Error('密码必须由数字字母组成且为8-16位'))
  } else {
    callback()
  }
}
const validateCheckoutPassword = (rule: any, value: any, callback: any) => {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  if (value === '') {
    callback(new Error('确认密码不能为空'))
  } else if (!reg.test(value)) {
    callback(new Error('确认密码必须由数字字母组成且为8-16位'))
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}

const validateCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('验证码不能为空'))
  }  else {
    callback()
  }
}

const ruleForm = reactive<ILoginParams>({
  username: '',
  password: '',
  checkoutPassword: "",
  validateCode: "",
})

const rules = reactive({
  username: [{validator: validateUsername, trigger: 'change'}],
  password: [{validator: validatePassword, trigger: 'change'}],
  checkoutPassword: [{validator: validateCheckoutPassword, trigger: 'change'}],
  validateCode: [{validator: validateCode, trigger: 'change'}],
})


const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      getReg()
    } else {
      return false
    }
  })
}

//注册提交
const getReg = async ()=>{
  const params:IUserRegParams = {
    username:ruleForm.username,
    password:ruleForm.password,
    code:ruleForm.validateCode,
  }
  const {data:res} = await updatePsd(params)
  if (res.code == 403) return ElMessage.warning("账号不存在")
  if (res.code == 400) return ElMessage.error("验证码不正确")
  if (res.code == 404) return ElMessage.error("重置密码失败！")
  ElMessage.success("重置密码成功")
  router.push("/login?commit=login")


}


//点击发送验证码  2806247140@qq.com  2806247140@qq.com
const clickSendCode = async () => {
  ruleFormRef.value?.validateField("username", async (params, invalidFields) => {
        const errMsg = invalidFields?.username[0].message
        if (!params) {
          return ElMessage.warning(errMsg)
        }
        const {data: res} = await getSendCodeRepsd(ruleForm.username)
        if (res.code == 405) return ElMessage.warning("该账号已存在")
        if (res.code == 404) return ElMessage.error("验证码发送失败")
    disabledSendCode.value = true
        ElNotification({
          title: "验证码通知",
          message: "验证码发送成功！请注意查收",
          type: "success",
        })
        let time = 120
        let timeId = setInterval(() => {
          time -= 1
          codeMsg.value = `${time}后重新发送`
          if (time <= 0) {
            clearInterval(timeId)
            codeMsg.value = "发送验证码"
            disabledSendCode.value = false
          }
        }, 1200)
      }
  )
}




</script>

<style lang="scss" scoped>
p{
  text-align: center;
  font-size: 45px;
  margin: 50px 0 36px;
}
.el-form {
  width: 100%;
  margin-top: 20px;
  position: relative;
  right: 44px;
  .sendCode {
    display: flex !important;

    .el-button {
      margin-left: 8px;
      height: 40px;
    }
  }

  .forgetPsd {
    width: 100%;

    .el-button {
      position: absolute;
      right: 0;
    }
  }

  ::v-deep(.el-form-item__content) {
    display: flex !important;
    flex-wrap: nowrap;
  }

  ::v-deep(.el-input) {
    height: 40px;
  }

  .el-form-item {
    &:nth-child(n+1) {
      padding-bottom: 15px;
    }
  }

  .loginBtn {
    width: 100%;
    height: 40px;
  }
}
.links{
  display: flex;
  justify-content: center;
  a{
   text-decoration: none;
    font-size: 12px;
    margin: 0 16px;
    color: var(--el-text-color-regular);
  }

}
</style>