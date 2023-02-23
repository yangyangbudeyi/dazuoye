<template>
  <div class="statistics">
    <el-table  highlight-current-row :data="data" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="Tdate" label="访问日期" width="240" />
      <el-table-column prop="Tip" label="IP"  width="200" :formatter="formatterIP"/>
      <el-table-column prop="Tbrowser" label="浏览器" width="180"/>
      <el-table-column prop="Tcontent" label="访问内容" width="160"/>
      <el-table-column prop="Tos" label="操作系统" width="140"/>
      <el-table-column  label="Status" prop="userStatus" width="180">
        <template #default="scope">
          <el-tag v-if="scope.row.userStatus=='user'">user</el-tag >
          <el-tag v-else >guest</el-tag >
        </template>
      </el-table-column>
      <el-table-column prop="Tcity" label="IP属地" width="180">
        <template #default="scope">
          <el-tag  type="success">{{scope.row.Tcity}}</el-tag >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
        v-if="!empty"
        :pageOn="objParams.pageOn"
        :pageCount="objParams.pageCount"
        :total="total"
        @changeNum = changeNum
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
import {getStatisticsPageNation} from "@/api/request"
import {IStatisticsData} from "@/types/statistics";
import {IIndexArticleParams} from "@/views/home/types";
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
const empty = ref(false)
const total = ref(0)
const data = ref<IStatisticsData[]>([])
const objParams:IIndexArticleParams = reactive({
  pageOn:1,
  pageCount:50
})
onMounted(()=>{
  document.documentElement.scrollTop=0
  getData()
})

const formatterIP = (row: IStatisticsData, column: TableColumnCtx<IStatisticsData>) => {
  const list = row.Tip.split(".")
  const newArr = [list[0],list[1],list[2]].join(",").replaceAll(",",".")+"."+"***"
  return newArr
}

const changeNum = (num:number)=>{
  objParams.pageOn = num
  sessionStorage.setItem("artPageOn",num +'')
  document.documentElement.scrollTop=0
  getData()
}

const getData = async ()=>{
  const {data:res} = await  getStatisticsPageNation(toRaw(objParams))
  if(res.code!=200){
    data.value = []
    empty.value = true
    total.value=0
    return
  }
  data.value = res.data
  empty.value = false
  total.value = res.total
}
</script>

<style scoped>
.statistics{
  width: 100%;
  min-height:80vh ;
  background: var(--el-bg-color);
  padding: 15px ;
  box-sizing: border-box;
  user-select: none;
}
</style>