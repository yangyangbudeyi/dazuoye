import Axios from "axios"
// @ts-ignore
import Nprogress from "nprogress"
// import "nprogress/nprogress.css"
import router from "@/router";
const  request = Axios.create({
    // baseURL:"http://localhost:3303/api",
    baseURL:"https://api.helloxlj.top/api",
})


request.interceptors.request.use((config:any)=>{
    const localHref = location.href
    const token = localStorage.getItem("token");
    if(token){
        config.headers.authorization = token
    }
    if(localHref.includes("profile") && !token){
        router.replace("/login")
        return;
    }
    Nprogress.start()
    return config
},error => console.log(error))

request.interceptors.response.use(res=>{
    const token = res.headers.authorization
    if(localStorage.getItem("token")){
        if(token){
            localStorage.setItem("token",token)
        }
    }
    if(res.data.code==4044){
        ElMessageBox.confirm(
            '您当前的登录信息已失效,您可选择停留在当前页面。是否重新登录?',
            '温馨提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                localStorage.removeItem("token")
                localStorage.removeItem("userInfo")
                router.push("/login")
            })
            .catch(() => {})
    }
    Nprogress.done()
    return res
},error => console.log(error))


export default request