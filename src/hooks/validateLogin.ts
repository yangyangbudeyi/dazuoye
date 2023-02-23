/*
    1.用于验证用户是否登录
    2.判断用户的账号状态
* */
import {getUserInfoById} from "@/api/request"
import { ElMessage, ElMessageBox } from 'element-plus'
import router from "@/router";
export const useValidateLogin = async ()=>{
    const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId
    const token = localStorage.getItem("token")
    if(userId && token){
        const {data:res} = await getUserInfoById(userId)
        if(res.code!=200){
            ElMessage.error("您的账号当前异常！您可选择尝试重新登录！")
                return {
                    login:true,
                    state:false
                }
        }
        const userState = res.data[0].userState
        if(userState=="1"){
            return {
                login:true,
                state:true
            }
        }else{
            ElMessage.error("您的账号当前异常！您可选择尝试重新登录！")
            return {
                login:true,
                state:false
            }
        }

    }else{
        ElMessageBox.confirm(
            '您需要登录以后才能进行当前操作?是否跳转登录？',
            '温馨提示',
            {
                confirmButtonText: '跳转登录',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                router.push("/login")
            })
            .catch(() => {})
        return {
            login:false,
            state:false
        }
    }

}