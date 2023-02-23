export interface ILoginParams {
    username: string,
    password: string,
    name?: string,
    checkoutPassword?: string,
    validateCode?: string,
    rememberPsd?:boolean
}
