<template>
    <el-input
        v-model.trim="input"
        class="w-50 m-2"
        size="large"
        placeholder="全站搜索"
        :prefix-icon="Search"
        @clear="clear"
        @change="change"
        :maxlength="12"
    />
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const input = ref('')
const router = useRouter()
const route = useRoute()
//清空输入框
const clear = ()=>{
  input.value = ""
}
//失去焦点会按下回车
const change = ()=>{
  if(!input.value) return
  router.push(`/search?keyword=${input.value}`)
  input.value = ""
}

</script>

<style lang="scss" scoped>
.el-input{
  width: 100%;
}

</style>