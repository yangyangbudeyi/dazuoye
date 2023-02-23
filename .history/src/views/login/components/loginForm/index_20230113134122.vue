<template>
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
    <el-form-item class="sendCode" prop="validateCode" v-if="data==='reg'">
      <el-input
          placeholder="请输入验证码"
          v-model.trim="ruleForm.validateCode"
          type="text"
          autocomplete="off"
          :prefix-icon="Monitor"
      />
      <el-button :disabled="disabledSendCode || (data==='reg' && disabledBtn.reg) " @click="clickSendCode">
        {{ codeMsg }}
      </el-button>
    </el-form-item>
    <el-form-item prop="name" v-if="data==='reg'">
      <el-input
          placeholder="请填写一个好听的昵称吧"
          v-model.trim="ruleForm.name"
          type="text"
          autocomplete="off"
          :prefix-icon="Connection"
      />
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
    <el-form-item props="rememberPsd" class="forgetPsd" v-if="data==='login'">
      <el-checkbox v-model="ruleForm.rememberPsd">记住我的登录状态</el-checkbox>
      <el-button type="primary" text @click="forgetPsd">忘记密码</el-button>
    </el-form-item>
    <el-form-item prop="checkoutPassword" v-if="data==='reg'">
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
                 :disabled="(data==='login' && disabledBtn.login ) || (data==='reg' && disabledBtn.reg )"
                 class="loginBtn" @click="submitForm(ruleFormRef)"
      >{{ data === "login" ? '登录' : '立即注册' }}
      </el-button
      >
    </el-form-item>

  </el-form>
</template>

<script lang="ts" setup>
import {getUserLogins, getRegisterUserInfo, getSendCodeReg} from "@/api/request"
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
const ifData = defineProps<{ data: string, disabledBtn: { login: boolean, reg: boolean } }>()


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
const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('昵称不能为空'))
  } else if (value.length < 3) {
    callback(new Error("昵称长度至少为3"))
  } else if (value.length > 16) {
    callback(new Error("昵称长度不能超过15"))
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
  name: "",
  checkoutPassword: "",
  validateCode: "",
  rememberPsd: true
})

const rules = reactive({
  username: [{validator: validateUsername, trigger: 'change'}],
  password: [{validator: validatePassword, trigger: 'change'}],
  name: [{validator: validateName, trigger: 'change'}],
  checkoutPassword: [{validator: validateCheckoutPassword, trigger: 'change'}],
  validateCode: [{validator: validateCode, trigger: 'change'}],
})


const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      if (ifData.data === "login") {
        const {username, password} = ruleForm
        const obj = {username, password}
        const {data: res} = await getUserLogins(obj)
        if (res.code == 403) return ElMessage.warning("您输入账号不存在")
        if (res.code == 404) return ElMessage.error("账号或密码错误")
        localStorage.setItem("userInfo", JSON.stringify(res.data[0]))
        localStorage.setItem("token", res.token)
        ElMessage.success("登录成功")
        emitter.emit("loginSuccess", {
          userImgParams: res.data[0].userImg,
          regDateParams: res.data[0]?.regDate,
          nameParams: res.data[0]?.name
        })
        const path = sessionStorage.getItem("navigateLoginPre")
        if (path) {
          router.push(path)
          sessionStorage.removeItem("navigateLoginPre")
          return
        } else {
          router.push("/")
          sessionStorage.removeItem("navigateLoginPre")
          return
        }
        return
      } else {
        getReg()
        return
      }
      return
    } else {
      return false
    }
  })
}

//注册提交
const getReg = async ()=>{
  const params:IUserRegParams = {
    name:ruleForm.name,
    username:ruleForm.username,
    password:ruleForm.password,
    checkedPsd:ruleForm.checkoutPassword,
    code:ruleForm.validateCode,
    regDate:getCurTime(),
    userId: nanoid().toLocaleLowerCase(),
  }
  const {data:res} = await getRegisterUserInfo(params)
  if (res.code == 403) return ElMessage.warning("账号已存在")
  if (res.code == 400) return ElMessage.error("验证码不正确")
  if (res.code == 404) return ElMessage.error("注册失败")
  ElMessage.success("注册成功！")
  emitter.emit("changeLogin")
  router.push("/login?commit=login")


}


//点击发送验证码  2806247140@qq.com  2806247140@qq.com
const clickSendCode = async () => {
  ruleFormRef.value?.validateField("username", async (params, invalidFields) => {
        const errMsg = invalidFields?.username[0].message
        if (!params) {
          return ElMessage.warning(errMsg)
        }
        const {data: res} = await getSendCodeReg(ruleForm.username)
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

//点击忘记密码
const forgetPsd = () => {
  router.push("/repsd")
}


</script>

<style lang="scss" scoped>
.el-form {
  width: 485px;
  margin-top: 20px;
  position: relative;
  left: -20px;

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
</style>