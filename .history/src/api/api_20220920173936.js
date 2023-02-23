import Axios from "./index.js";

// //城市接口
export const citySelect = ()=>Axios({url:"https://www.mxnzp.com/api/address/list?app_id=kurqj0keqlvvzdvc&app_secret=blJubjBkMVdyT2tPM1lDMXVrQ1puUT09",method:"get"})

// //1.首页文章详情列表(post)    /select/articles
// export const getArtContentAll = (obj)=>Axios({url:"/select/articles",method: "post",data:obj})


// //2.首页热门文章查询---通过时间指定(get)    /select/hot/article
// export const getArtContentTop = ()=>Axios({url:"/select/hot/article",method: "get"})

// //获取首页热门文章 --通过访问量 get  /sel/hot/article
// export const getHotArticle = (pageOn,pageCount)=>Axios({url:`/sel/hot/article?pageOn=${pageOn}&pageCount=${pageCount}`,method: "get"})


//  //3.用户搜索已发布文章(post)    /search/user/publish/article
// export const searchArtPublishUser= (obj)=>Axios({url:"/search/user/publish/article",method: "post",data:obj})

//  //3.修改文章的收藏总数(post)    /update/art/collect/count
// export const setCollectNum= (artId,value)=>Axios({url:"/update/art/collect/count",method: "post",data:{artId,value}})

//  //4.修改文章的评论总数(post)    /update/art/comment/count
// export const setCommentNum= (artId,value)=>Axios({url:"/update/art/comment/count",method: "post",data:{artId,value}})


// //5.查询指定文章内容(post)    /select/article/artId
// export const getArtContentById= (artId,userId)=>Axios({url:"/select/article/artId",method: "post",data:{artId,userId}})


// //6.查询指定用户信息(post)    /user/select/userInfo
// export const getUserInfoById= (userId)=>Axios({url:"/user/select/userInfo",method: "post",data:{userId}})


// //7.用户登录(post)    /user/login
// export const getUserLogin= (username, password)=>Axios({url:"/user/login",method: "post",data:{username, password}})


// //8.用户注册(post)    /user/register
// export const getRegisterUserInfo= (obj)=>Axios({url:"/user/register",method: "post",data:obj})


// //9.发送验证码--注册(post)    /user/sendMailer1
// export const getSendCode1= (mail)=>Axios({url:"/user/sendMailer1",method: "post",data:{mail}})


// //10.重置密码(post)    /user/update/psd
// export const updatePsd= (obj)=>Axios({url:"/user/update/psd",method: "post",data:obj})
//
//
// //11.发送验证码--重置密码(post)    /user/sendMailer2
// export const getSendCode2= (mail)=>Axios({url:"/user/sendMailer2",method: "post",data:{mail}})

//----------------------------------
// //12.查询指定文章的收藏数量(post)    /collect/CollectCounts
// export const getCollectCountById= (artId)=>Axios({url:"/collect/CollectCounts",method: "post",data:{artId}})
// //13.查询指定文章的评论数量(post)    /user/selectCommentCountById
// export const getCommentCountById= (artId)=>Axios({url:"/user/selectCommentCountById",method: "post",data:{artId}})


// //14.查询指定文章的所有评论内容(post)    /select/comments
// export const getCommentCountByIdAll= (artId)=>Axios({url:"/select/comments",method: "post",data:{artId}})


// //15.提交评论(post)    /add/comment
// export const submitComment= (obj)=>Axios({url:"/add/comment",method: "post",data:obj})


// //16.删除评论(post)    /delete/comment
// export const deleteComment= (Pid)=>Axios({url:"/delete/comment",method: "post",data:{Pid}})


// //17.修改文章的访问量(post)    /update/art/pageView
// export const updateCommentPageView= (artId,pageView)=>Axios({url:"/update/art/pageView",method: "post",data:{artId,pageView}})


//18.判断用户是否收藏当前文章(post)    /check/collect
export const getIsCollect= (artId,userId)=>Axios({url:"/check/collect",method: "post",data:{artId,userId}})


// //19.收藏当前文章(post)   /add/collect
// export const submitCollect= (obj)=>Axios({url:"/add/collect",method: "post",data:obj})


// //20.图片上传(post)    /upload/image
// export const uploadImg= (file)=>Axios({url:"/upload/image",method: "post",data:{file}})


// //21.提交发布文章(post)    /publish/article
// export const submitPublishSave= (obj)=>Axios({url:"/publish/article",method: "post",data:obj})


// //22.查询所有友情链接(get)    /links
// export const getAllLinks= ()=>Axios({url:"/links",method: "get"})


//23.上传统计信息(post)    /add/statistics
export const submitStatistics= (obj)=>Axios({url:"/add/statistics",method: "post",data:obj})


// //24.获取所有访问记录-分页(post)    /select/statistics
// export const getStatisticsPageNation= ( pageOn, pageCount)=>Axios({url:"/select/statistics",method: "post",data:{ pageOn, pageCount}})




// //27.查询用户发布的所有文章(post)   /select/articles
// export const getSubmitByUserId= (userId, pageOn, pageCount)=>Axios({url:"/select/articles",method: "post",data:{userId, pageOn, pageCount}})




// //29.修改文章为隐藏状态(post)    /set/art/hidden
// export const updateArtHidden= (artId)=>Axios({url:"/set/art/hidden",method: "post",data:{artId}})
//
//
// //30.修改文章为公开可见状态(post)   /set/art/show
// export const updateArtVisible= (artId)=>Axios({url:"/set/art/show",method: "post",data:{artId}})


// //31.修改文章内容(post)    /update/pub/article
// export const updatePublish= (obj)=>Axios({url:"/update/pub/article",method: "post",data:obj})


// //32.删除指定文章(post)    /del/article
// export const deletePublishById= (artId)=>Axios({url:"/del/article",method: "get",data:{artId}})


// //33.获取用户收藏列表-分页(post)    select/collect/user
// export const getUserCollect= (userId,pageOn,pageCount)=>Axios({url:"select/collect/user",method: "post",data:{userId,pageOn,pageCount}})


// //34.切换用户收藏内容是否公开可见(post)    /user/update/collect/userState
// export const updateCollectIsHidden= (userId,collectVisiable)=>Axios({url:"/user/update/collect/userState",method: "post",data:{userId,collectVisiable}})


// //36.查询文章隐藏状态(post)    /select/art/hidden/show
// export const getArtIsHidden= (artId)=>Axios({url:"/select/art/hidden/show",method: "post",data:{artId}})


// //37.修改用户信息(post)    /user/update/userInfo
// export const updateUserInfo= (obj)=>Axios({url:"/user/update/userInfo",method: "post",data:obj})


// //38.修改用户头像(post)    /user/update/avatar
// export const updateUserInfoImg= (userId,userImg)=>Axios({url:"/user/update/avatar",method: "post",data:{userId,userImg}})


// //39.个人首页内修改密码(post)    /user/update/psd/profile
// export const updateUserPsd= (obj)=>Axios({url:"/user/update/psd/profile",method: "post",data:obj})


// //40.关键字搜索(post)    /search/article
// export const searchPublishArticle= (obj)=>Axios({url:"/search/article",method: "get",params:obj})


//41.查询所有轮播数据(get)    /swiper
export const getSwiperData= ()=>Axios({url:"/swiper",method: "get"})


// //42.查询其他用户发表的文章-分页(post)    /select/articles
// export const getUserPublicOther= (userId,pageOn,pageCount)=>Axios({url:"/select/articles",method: "post",data:{userId,pageOn,pageCount}})

// //42.查询其他用户发表的文章-分页(post)    /select/articles/by/select
// export const getUserPublicBySelectPage= (userId,pageOn,pageCount)=>Axios({url:"/select/articles/by/select",method: "post",data:{userId,pageOn,pageCount}})


//44.用户删除指定收藏记录(post)    /delete/collect
export const deleteCollect= (id)=>Axios({url:"/delete/collect",method: "post",data:{id}})


//45.查询指定发布文章-文章id--在前台编辑页面中可以通过(post)    /user/selectPublishArticleArtIdPre
export const getArtContentByEditor= (artId)=>Axios({url:"/user/selectPublishArticleArtIdPre",method: "post",data:{artId}})


// //46.友情链接关键字查询(post)    /search/links
// export const linkSelectLinks= (key)=>Axios({url:"/search/links",method: "get",params:{key}})


// //47.查询所有标签(post)    /select/tags
// export const selectTags= ()=>Axios({url:"/select/tags",method: "get"})


// //48.查询指定设置(post)    /select/setting/one
// export const selectSettingOne= (name)=>Axios({url:"/select/setting/one",method: "post",data:{name}})


// //49.通过分类标签文章查询(post)    /search/tags
// export const selectTagsArt= (obj)=>Axios({url:"/search/tags",method: "get",params:obj})

// //50.随机文章查询(post)    /select/article/random
// export const randomArtSelect= (num)=>Axios({url:"/select/article/random",method: "get",params:{num}})


// //51.关于内容(post)    /select/article/pc/about?artId=pc_about
// export const getAboutContent= ()=>Axios({url:"/select/article/pc/about?artId=pc_about",method: "get"})


