import { createRouter, createWebHistory,createWebHashHistory } from "vue-router";
import { ElMessage } from 'element-plus'
import { routes } from "./routes"
const router = createRouter({
  routes,
  history: createWebHistory()
})
const needLogin = ["/select", "/profile/userInfo",
  "/profile/article", "/profile/collect", "/profile/like", "/profile/update/userInfo", "/profile/suggestion"]
router.beforeEach((to, from, next) => {
  const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId
  const token = localStorage.getItem("token")
  // if(to.meta.title) { // @ts-ignore
  //     document.title = to.meta.title as string
  // }
  if (userId && token) {
    //已登录
    if (to.path.includes("/login") || to.path.includes("/repsd")) {
      next("/")
    }
  } else {
    sessionStorage.setItem("navigateLoginPre", from.path)
    if (needLogin.includes(to.path)) {
      next("/login")
      ElMessage.warning("请先登录")
    }
  }
  next()
})

router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

})
export default router