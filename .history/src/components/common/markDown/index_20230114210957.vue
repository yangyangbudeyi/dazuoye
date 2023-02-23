<template>
  <md-editor
      class="editor"
      v-model="value"
      :toolbars="toolbars"
      :theme="theme"
      :showCodeRowNumber="showCodeRowNumber"
      :previewTheme="previewTheme"
      :preview="options.preview"
      :previewOnly="previewOnly"
      @onGetCatalog="getCatalog"
      @onUploadImg="onUploadImg"
  />
</template>

<script lang="ts" setup>
import {emitter} from "@/emitter";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {useValidateLogin} from "@/hooks/validateLogin";
import {useValidateIDisabled} from "@/hooks/validateIDisabled";
import {editorUpload} from "@/api/upload"
import {ToolbarNames} from "md-editor-v3/lib/MdEditor/type"
import {compressImg} from "@/utils/compressImg"
import Axios from "axios"
const options ={
  // showCodeRowNumber:false,  //代码块是否显示行号
  // previewTheme:'vuepress',  //'default' | 'github' | 'vuepress'  |'mk-cute' | 'smart-blue' | 'cyanosis'
  preview:true,       //是否预览
  // previewOnly:false,    //是否只读
}
const theme:any = ref("light")
const showCodeRowNumber = ref(localStorage.getItem("line") &&localStorage.getItem("line") =='false'?false:true)
const previewTheme = ref(localStorage.getItem("codeTheme")?localStorage.getItem("codeTheme"):'vuepress') as any 



 defineProps<{previewOnly:boolean,value:string}>()


emitter.on("changeDark",()=>{
  let store = localStorage.getItem("vueuse-color-scheme")
  if(store==="dark"){
    theme.value = "light"
  }else{
    theme.value = "dark"
  }
})

//'default' | 'github' | 'vuepress'  |'mk-cute' | 'smart-blue' | 'cyanosis'
const themeDataAll = ref(['github','vuepress','','mk-cute','smart-blue','cyanosis','default'])
onMounted(()=>{
  const lineStore = localStorage.getItem("line")
  if(lineStore){
    if(lineStore=='true'){
      showCodeRowNumber.value = true
    }else{
      showCodeRowNumber.value = false
    }
  }else{
    showCodeRowNumber.value = true
  }

  const themeStore = localStorage.getItem("codeTheme");
  if(themeStore){

  }else{
    previewTheme.value ='vuepress'
  }
  setEditorTheme()
})


//判断当前主题
const setEditorTheme = ()=>{
  let store = localStorage.getItem("vueuse-color-scheme")
  if(store==="dark"){
    theme.value = "dark"
  }else{
    theme.value = "light"
  }
}

//上传图片
const onUploadImg = async (files:any, callback:any) => {
  const {state, login} = await useValidateLogin()
  if (!state || !login) return
  const isDisable =await useValidateIDisabled("发布")
  if(isDisable) return
  const isDisable1 =await useValidateIDisabled("修改")
  if(isDisable1) return
  const res = await Promise.all(
      Array.from(files).map((file) => {
        return new Promise(async (rev, rej) => {
          const form = new FormData()
          let f:any = await compressImg(file)
          form.append("file", f)
          Axios.post(editorUpload, form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
              .then((res) => rev(res))
              .catch((error) => rej(error))
        })
      })
  )

  callback(res.map((item:any) => item.data.url))
}

//获取目录导航
const getCatalog = (value:{text:string,level:number}[])=>{
  if(toRaw(value).length){
    emitter.emit("getArticleCatalog",value)
  }

}

const toolbars:ToolbarNames[] = ([
  'bold',
  'underline',
  'italic',
  '-',
  'strikeThrough',
  'title',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  // 'save',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
  'catalog',
]) ;
</script>

<style lang="scss" scoped>
.editor{
  padding: 0 ;
  overflow: hidden;
  min-height: 90vh;
  background:var(--el-bg-color);
  border-radius: 6px;
}
</style>