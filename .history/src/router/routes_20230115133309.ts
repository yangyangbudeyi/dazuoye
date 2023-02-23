import {RouteRecordRaw} from "vue-router"

const Home = () => import("@/views/home/index.vue")
const About = () => import("@/views/about/index.vue")
const WriteArticle = () => import("@/views/writeArticle/index.vue")
const Statistics = () => import("@/views/statistics/index.vue")
const ToolsLink = () => import("@/views/toolsLink/index.vue")
const Details = () => import("@/views/details/index.vue")
const Search = () => import("@/views/search/index.vue")
const Tags = () => import("@/views/tags/index.vue")
const SearchLink = () => import("@/views/searchLink/index.vue")
const Select = () => import("@/views/select/index.vue")
const NotFound = () => import("@/views/notFound/index.vue")
const Login = () => import("@/views/login/index.vue")
const Repsd = () => import("@/views/repsd/index.vue")
const Profile = () => import("@/views/profile/index.vue")
const UserInfo = () => import("@/views/profile/userInfo/index.vue")
const Article = () => import("@/views/profile/article/index.vue")
const Collect = () => import("@/views/profile/collect/index.vue")
const Like = () => import("@/views/profile/like/index.vue")
const Suggestion = () => import("@/views/profile/suggestion/index.vue")
const Setting = () => import("@/views/profile/setting/index.vue")
const UpdateUserInfo = () => import("@/views/profile/updateUserInfo/index.vue")
export const routes:RouteRecordRaw[] = [
    {path: "/", redirect: "home"},
    {path: "/home", component: Home,meta:{title:"首页",keepAlive:true}},
    {path: "/about", component: About,meta:{title:"关于",keepAlive:true}},
    {path: "/statistics", component: Statistics,meta:{title:"访问统计"}},
    {path: "/tools/link", component: ToolsLink,meta:{title:"工具链接",keepAlive:true}},
    {path: "/write/article", component: WriteArticle,meta:{title:"写文章",keepAlive:true}},
    {path: "/details/:artId",name:"details", component: Details,meta:{title:"文章详情",disAbledFooter:true,keepAlive:true}},
    {path: "/search", component: Search,meta:{title:"文章搜索",keepAlive:true}},
    {path: "/tags", component: Tags,meta:{title:"分类标签",keepAlive:true}},
    {path: "/search/link", component: SearchLink,meta:{title:"链接搜索"}},
    {path: "/select/:userId", name:"select",component: Select,meta:{title:"用户信息"}},
    {path: "/login", component: Login,meta:{title:"登录"}},
    {path: "/repsd", component: Repsd,meta:{title:"重置密码"}},
    {path: "/profile", redirect: "/profile/userInfo"},
    {
        path: "/profile", component: Profile, children: [
            {path: "userInfo", component: UserInfo,meta:{title:"个人信息"}},
            {path: "article", component: Article,meta:{title:"我的文章"}},
            {path: "collect", component: Collect,meta:{title:"我的收藏",keepAlive:true}},
            {path: "like", component: Like,meta:{title:"点赞喜欢"}},
            {path: "suggestion", component: Suggestion,meta:{title:"意见反馈"}},
            {path: "setting", component: Setting,meta:{title:"个性设置"}},
            {path: "update/userInfo", component: UpdateUserInfo,meta:{title:"修改信息"}},
        ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound,meta:{title:"404"} },
]