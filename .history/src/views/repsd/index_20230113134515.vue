<template>
  <div class="repsd">
   <div class="contain">
    <div class="left">
      <img src="../../assets/images/reg_bg.jpg" alt="">
    </div>
    <div class="right">
      <RepsdForm :disabledBtn="disabledBtn"></RepsdForm>
    </div>
   </div>

  </div>
</template>

<script lang="ts" setup>
import RepsdForm from "./components/repsdForm/index.vue"
import {useValidateIDisabled} from "@/hooks/validateIDisabled";
const disabledBtn =ref(false)
onMounted(async ()=>{
  const isDisable =await useValidateIDisabled("改密")
  if(isDisable) return disabledBtn.value = true
})
</script>

<style lang="scss" scoped>
.repsd{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: var(--el-bg-color);
    display: flex;
    z-index: 999;
    align-items: center;
    justify-content: center;
    background-image: url("https://api.helloxlj.top/public/static/loginBg.svg");
  .contain{
      width:880px;
    height: 600px;
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    box-shadow:  0 0 10px var(--el-bg-color-bbb);
    .left{
      width: 50%;
      height: 100%;
      background: #2c3e50;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .right{
      width: 50%;
      height: 100%;
      background: var(--el-bg-color);

    }
  }
}



</style>