import {IPagination} from "./pagination"
//首页文章返回结果
export interface IArticleData {
    artCollect: number;
    artDate: string;
    artId?: string;
    artImg?: string;
    artIntroduce?: string;
    artIsHot: string;
    artLike: number;
    artPcomment: number;
    artTitle: string;
    collectCount: number;
    hidden: string;
    id?: number;
    mangerHidden: string;
    name: string;
    pageView: string ;
    tag: string;
    updatetime: string;
    userId?: string;
    userImg: string;
    artContent?:string;
    regDate?:string;
    collectTime?:string
    publishUserId?:string

}

//文章标签
export interface ITagsData {
    id:number,
    name:string,
    tagId:string
}


//关键字搜索文章请求参数
export  interface ISearchArtParams extends IPagination {
    keyword:string
}


//发布文章截图
export  interface IPublishArt {
    artContent:string,
    artId:string | number,
    artImg:string,
    userId:string | number,
    artTitle:string,
    artDate:string,
    tag:string,
    artIntroduce:string,
    hidden:string,
}


//查询用户发布的所有文章请求参数
export interface IUserPublishArtParams extends IPagination{
    userId:string | number
}
//查询用户收藏所有文章请求参数
export interface IUserCollectParams extends IPagination{
    userId:string | number
}

// 用户搜索已发布文章请求参数
export interface IUserPublishArtSearchParams extends IUserPublishArtParams{
    key:string
}

//修改文章参数
export interface IUpdateArtParams{
    artId:string,
    artTitle:string,
    artIntroduce:string,
    artContent:string,
    updatetime:string,
    tag:string,
    hidde:any,
}