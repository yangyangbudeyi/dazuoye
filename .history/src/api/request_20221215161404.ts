import request  from "./index"
import {ILoginParams} from "@/types/login"
import {
    ISearchArtParams,
    IPublishArt,
    IUserPublishArtParams,
    IUserPublishArtSearchParams,
    IUserCollectParams,
    IUpdateArtParams
} from "@/types/article"
import {ITagParams} from "@/types/tags"
import {ICollectParams} from "@/types/collect"
import {ICommentDataParams} from "@/types/comment"
import {IUpdateUserParams,IProfileUpdatePsdParams,IUserRegParams} from "@/types/user"
import {IIndexArticleParams} from "@/views/home/types"
import {IPagination} from "@/types/pagination";
import Axios from "@/api/index";


//用户登录(post)    /user/login
export const getUserLogins = (login:ILoginParams)=>request.post("/user/login",login)

//首页文章详情列表(post)    /select/articles
export const getIndexArtAll = (obj:IIndexArticleParams)=>request.post("/select/articles",obj)

//首页热门文章查询---通过时间指定(get)    /select/hot/article
export const getIndexHotArtByTime = ()=>request.get("/select/hot/article")

//首页获取热门文章 --通过访问量 get  /sel/hot/article
export const getIndexHotArtByPreview = (pageOn:number,pageCount:number)=>request.get(`/sel/hot/article?pageOn=${pageOn}&pageCount=${pageCount}`)

//首页查询所有标签(post)    /select/tags
export const getTagsAll= ()=>request.get("/select/tags")

//关键字搜索(post)    /search/article
export const getSearchArticle= (obj:ISearchArtParams)=>request.get("/search/article",{params:obj})

//查询指定文章内容(post)    /select/article/artId
export const getArtContentById= (artId:string,userId:number|null)=>request.post("/select/article/artId",{artId,userId})

//.随机文章查询(get)    /select/article/random
export const getRandomArt= (num:number)=>request.get(`/select/article/random?num=${num}`)

//通过分类标签文章查询(get)    /search/tags
export const getSelectTagsArt= (obj:ITagParams)=>request.get("/search/tags",{params:obj})

//查询指定用户信息(post)    /user/select/userInfo
export const getUserInfoById= (userId:number|string)=>request.post("/user/select/userInfo",{userId})

//查询指定设置(post)    /select/setting/one
export const getSettingOne= (name:string)=>request.post("/select/setting/one",{name})

//收藏当前文章(post)   /add/collect
export const getSubmitCollect= (obj:ICollectParams)=>request.post("/add/collect",obj)

//提交发布文章(post)    /publish/article
export const getSubmitPublish= (obj:IPublishArt)=>request.post("/publish/article",obj)

//查询所有友情链接(get)    /links
export const getAllLinks= ()=>request.get("/links")

//友情链接关键字查询(get)    /search/links
export const getSearchLinks= (key:string)=>request.get(`/back/search/links?key=${key}`)

//关于内容(get)    /select/article/pc/about?artId=pc_about
export const getAboutContent= ()=>request.get("/select/article/pc/about?artId=pc_about")

//修改文章的访问量(post)    /update/art/pageView
export const getUpdatePageView= (artId:string,pageView:number|string)=>request.post("/update/art/pageView",{artId,pageView})

//查询用户发布的所有文章(post)   /select/articles
export const getSubmitByUserId= (obj:IUserPublishArtParams)=>request.post("/select/articles",obj)

//修改文章为隐藏状态(post)    /set/art/hidden
export const updateArtHidden= (artId:string)=>request.post("/set/art/hidden",{artId})

//修改文章为公开可见状态(post)   /set/art/show
export const updateArtVisible= (artId:string)=>request.post("/set/art/show",{artId})

//删除指定文章(get)    /del/article
export const deletePublishById= (artId:string)=>request.get(`/del/article?artId=${artId}`)

//用户搜索已发布文章(post)    /search/user/publish/article
export const getSearchArtPublishUser= (obj:IUserPublishArtSearchParams)=>request.post("/search/user/publish/article",obj)

//获取用户收藏列表-分页(post)    select/collect/user
export const getUserCollect= (obj:IUserCollectParams)=>request.post("select/collect/user",obj)

//用户删除指定收藏记录(post)    /delete/collect
export const deleteCollect= (id:number|string)=>request.post("/delete/collect",{id})

//切换用户收藏内容是否公开可见(post)    /user/update/collect/userState
export const updateCollectIsHidden= (userId:string|number,collectVisiable:string)=>request.post("/user/update/collect/userState",{userId,collectVisiable})

//修改用户信息(post)    /user/update/userInfo
export const getUpdateUserInfo= (obj:IUpdateUserParams)=>request.post("/user/update/userInfo",obj)

//修改用户头像(post)    /user/update/avatar
export const updateUserInfoImg= (userId:string|number,userImg:string)=>request.post("/user/update/avatar",{userId,userImg})

//个人首页内修改密码(post)    /user/update/psd/profile
export const updateUserPsdByProfile= (obj:IProfileUpdatePsdParams)=>request.post("/user/update/psd/profile",obj)

//修改文章内容(post)    /update/pub/article
export const updatePublish= (obj:any)=>request.post("/update/pub/article",obj)

//修改文章的收藏总数(post)    /update/art/collect/count
export const setCollectNum= (artId:number|string,value:string|number)=>request.post("/update/art/collect/count",{artId,value})

//获取所有访问记录-分页(post)    /select/statistics
export const getStatisticsPageNation= ( obj:IPagination)=>request.post("/select/statistics",obj)

//用户注册(post)    /user/register
export const getRegisterUserInfo= (obj:IUserRegParams)=>request.post("/user/register",obj)

//发送验证码--注册(post)    /user/sendMailer1
export const getSendCodeReg= (mail:string)=>request.post("/user/sendMailer1",{mail})

//重置密码(post)    /user/update/psd
export const updatePsd= (obj:IUserRegParams)=>request.post("/user/update/psd",obj)

//发送验证码--重置密码(post)    /user/sendMailer2
export const getSendCodeRepsd= (mail:string)=>request.post("/user/sendMailer2",{mail})

//查询其他用户发表的文章-分页(post)    /select/articles/by/select
export const getUserPublicOther= (obj:IUserPublishArtParams)=>request.post("/select/articles/by/select",obj)

// //查询文章隐藏状态(post)    /select/art/hidden/show
// export const getArtIsHidden= (artId:string)=>request.post("/select/art/hidden/show",{artId})

// // 获取用户收藏列表-分页(post)    select/collect/user
// export const getUserCollectBySelect= (obj:IUserPublishArtParams)=>request.post("select/collect/user",obj)

 //修改文章的评论总数(post)    /update/art/comment/count
 export const setCommentNum= (artId:string,value:number|string)=>request.post("/update/art/comment/count",{artId,value})

 //查询指定文章的所有评论内容(post)    /select/comments
export const getCommentCountByIdAll= (artId:string)=>request.post("/select/comments",{artId})

//提交评论(post)    /add/comment
export const submitComment= (obj:ICommentDataParams)=>request.post("/add/comment",obj)


//删除评论(post)    /delete/comment
export const deleteComment= (Pid:number|string)=>request.post("/delete/comment",{Pid})
