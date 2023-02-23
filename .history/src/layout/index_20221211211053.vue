<template>
  <div class="layout">
      <div class="top">
        <Navbar></Navbar>
      </div>
      <div class="center">
        <div class="sss">
          <router-view v-slot="{Component}">
            <transition name="view">
              <keep-alive>
              <component  :key="$route.meta.title" :is="Component" v-if="$route.meta.keepAlive"></component>
              </keep-alive>
            </transition>
            <transition name="view">
              <component  :key="$route.meta.title" :is="Component" v-if="!$route.meta.keepAlive"></component>
            </transition>
          </router-view>
        </div>
      </div>
      <div class="bottom">
        <Footer v-if="!$route.meta.disAbledFooter"></Footer>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.layout{
  width: 100%;
  min-height: 100vh;
  display: flex;
  height: 100%;
  margin: 0 auto;
  flex-direction: column;
  .top{
    position: sticky;
    top: 0;
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color);
    z-index: 900;
    margin-bottom: 15px;
  }
  .center{
    flex: 1;
    height: 1000px;
    .sss{
      width:1400px;
      margin:0 auto;
    }
  }
  .bottom{
    margin-top: 16px;
    color: var(--el-text-color-regular);
    background: var(--el-bg-color);
  }
}

.view-enter-from,.view-leave-to{
  opacity: 0;
  display: none;
}
.view-enter-to,.view-leave-from{
  opacity: 1;
  transition: all .6s;
}


</style>