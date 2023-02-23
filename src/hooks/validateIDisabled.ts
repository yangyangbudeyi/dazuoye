//用于验证按钮是否禁用
import {getSettingOne} from "@/api/request"
import { ElMessage, ElMessageBox } from 'element-plus'
export const useValidateIDisabled =async (val:string)=>{
    if(!val) return false
    const {data:res} = await getSettingOne(val)
    if(res.code!=200) return  true
    if(res.data[0]?.type=="0"){
        return  true
    }else{
        return  false
    }
}