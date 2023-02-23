<template>
  <div class="toolsLink" >
    <LinksNavBar @getSecondCate="getSecondCate" :firstCate="linkData.firstCate"></LinksNavBar>
    <LinkItem  :secondCate="linkData.secondCate"></LinkItem>
  </div>
</template>

<script setup lang="ts">
import {getAllLinks} from "@/api/request"
import LinkItem from "./components/linkItem/index.vue"
import LinksNavBar from "./components/linksNavBar/index.vue"
export interface SubSub {
    id:       number;
    linkDesc: string;
    linkImg:  string;
    name:     string;
    parent:   number;
    path:     null | string;
    sub:      any[];
    urls:     string;
}
let linkData = reactive<{
  firstCate:any[],
  secondCate:any[],
  allData:SubSub[],
}>({
  firstCate:[],
  secondCate:[],
  allData:[]
});

const getSecondCate = (index:number)=>{
  linkData.secondCate = linkData.allData[index].sub
}

//获取链接内容
onMounted(async ()=>{
  let {data:res} = await getAllLinks()
  console.log(res)
  linkData.firstCate  = res.map((item:any)=>item.name)
  linkData.allData = res
  linkData.secondCate  = res[0].sub
})


</script>

<style lang="scss" scoped>
.toolsLink{
  width: 100%;
  min-height:100vh;
  //background: #fff;
}

</style>