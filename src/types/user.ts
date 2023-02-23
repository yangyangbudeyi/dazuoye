import {getCurTime} from "@/utils/getCurTime";
import {nanoid} from "nanoid";

export interface IUpdateUserParams {
    username: string,
    sex: string,
    address: string,
    userId: string | number,
    introduce: string,
    name: string,
    updateDate?: string
}

export interface IUserInfoData {
    address?: string;
    collectVisiable?: string;
    id?: number;
    introduce?: string;
    name?: string;
    other?: string;
    publishContent?: string;
    regDate?: string;
    sex?: string;
    updateDate?: string;
    userCollect?: string;
    userId?: string | number;
    userImg?: string;
    userLile?: string;
    username?: string;
    userRight?: string;
    userRole?: string;
    userState?: string;
}


//个人首页修改密码参数
export interface IProfileUpdatePsdParams {
    userId:string|number,
    password:string,
    newPassword:string,
}


//用户注册请求参数
export interface IUserRegParams {
    username:string,
    password:string,
    code?:string,
    name?:string,
    regDate?:string,
    userId?:string,
    checkedPsd?:string,
}