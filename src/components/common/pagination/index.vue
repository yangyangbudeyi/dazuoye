<template>
  <el-pagination
      class="pageNation"
     v-model:currentPage="pageOn"
      v-model:page-size="pageCount"
      :page-count="Math.ceil(totals/pageCount)"
      @current-change="currentChange"
      @update:page-size="pageSize"
     background layout="prev, pager, next"
      :disabled="disabledPageNation"
   />
 <!--<el-pagination-->
<!--      class="pageNation"-->
<!--     :page-size="pageCount"-->
<!--     :currentPage="pageOn"-->
<!--      :page-count="total"-->
<!--      @current-change="currentChange"-->
<!--      @update:page-size="pageSize"-->
<!--     background layout="prev, pager, next"-->
<!--     hide-on-single-page-->
<!--     :disabled="disabledPageNation"-->
<!--   />-->

</template>

<script lang="ts" setup>
import {IIndexArticleParams} from "@/views/home/types";
const disabledPageNation = ref(false)
interface IProps {
  pageOn:number,
  pageCount:number,
  total:number
}
const emits = defineEmits(["changeNum"])
const props = defineProps(["pageOn","pageCount","total"])
const totals = computed(()=>props.total)

const currentChange = (values:any)=>{
  // console.log("currentChange",values)
  emits("changeNum",values)
}
const pageSize = (values:any)=>{
  // console.log("pageSize",values)
}

const total = ref(0)

</script>

<style lang="scss" scoped>
.pageNation{
  margin:25px 15px 40px;
}
</style>