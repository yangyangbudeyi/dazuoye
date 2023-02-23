<template>
  <div class="userInfo">
    <Loading/>
    <div class="useInfo" v-loading="loading">
      <div class="box slide-in-elliptic-bottom-fwd">
        <p>
        <span>昵称</span
        ><span>{{ data.name ? data.name : "null" }}</span>
        </p>
        <p>
        <span>账号</span
        ><span>{{ data.username }}</span>
        </p>
        <p>
          <span>用户ID</span><span>{{ data.userId }}</span>
        </p>
        <p>
        <span>性别</span
        ><span>{{ data.sex === "1" ? "男" : "女" }}</span>
        </p>
        <p>
        <span>地区</span
        ><span>{{ data.address ? data.address : "未设置" }}</span>
        </p>
        <p>
        <span>注册时间</span
        >
          <span>{{getTimeBefore(data.regDate)}} ({{ data.regDate}})</span>
        </p>

        <div class="wan">
          <div class="nihaoaa">个性签名</div>
          <div class="jianjie">
            {{ data.introduce ? data.introduce : "未设置" }}
          </div>
        </div>

        <div class="state">
          <span>账号状态</span>
          <el-tag
              v-if="data.userState == '1'"
              size="large"
              class="ml-2 tags"
              type="success"
          >正常</el-tag
          >
          <el-tag v-else class="ml-2 tags" type="warning">异常</el-tag>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { getUserInfoById } from "@/api/request";
import {getTimeBefore} from "@/utils/getTimeBefore"
const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId
const loading = ref(false)
const data = reactive({
  address: "",
  name: "",
  regDate: "",
  sex: "",
  userId: "",
  userState: "",
  username: "",
  introduce: "",
});

onMounted(() => {
  document.documentElement.scrollTo({
    top:0,
    behavior:"smooth"
  })
  getUserInfo();
});
//获取用户信息
const getUserInfo = async () => {
  let { data: res } = await getUserInfoById(userId);
  if (res.code !== 200){
    loading.value = false
    return ElMessage.error("服务异常");
  }
  data.address = res.data[0].address;
  data.name = res.data[0].name;
  data.regDate = res.data[0].regDate;
  data.sex = res.data[0].sex;
  data.userId = res.data[0].userId;
  data.username = res.data[0].username;
  data.userState = res.data[0].userState;
  data.introduce = res.data[0].introduce;
  loading.value = false
};
</script>

<style lang="scss" scoped>

  .useInfo {
    width: 100%;
    min-height: 400px;
    box-sizing: border-box;
    padding:50px;
    background: var(--el-bg-color);
    user-select: none;
    .box {
      p {
        text-align: left;
        margin-bottom: 30px;
        padding-bottom: 7px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        span{
            &:first-child{
            user-select: none;
          }
        }
        &:hover {
          span {
            display: inline-block;
            &:first-child {
              color: sandybrown;



            }
            &:last-child {
              transition: all 0.3s;
              color: rgb(247, 191, 146);
            }
          }
        }
        span {
          display: inline-block;
          &:first-child {
            font-size: 17px;
            cursor: pointer;
            width: 100px;
            transition: all 0.3s;
          }
          &:last-child {
            margin-left: 50px;
            font-size: 15px;
            font-weight: 200;
            cursor: pointer;
            transition: all 0.3s;
          }
        }
      }
      .wan {
        display: flex;
        font-size: 18px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        &:hover {
          .nihaoaa {
            cursor: pointer;
            color: sandybrown;
          }
          .jianjie {
            color: sandybrown;
          }
        }
        .nihaoaa {
          font-size: 16px;
          transition: all 0.3s;
          user-select: none;
          width: 100px;
        }
        .jianjie {
          display: block;
          width: 150px;
          font-size: 16px;
          margin-left: 50px;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.3s;
        }
      }
      .state {
        display: flex;
        font-size: 18px;
        align-items: center;
        border-bottom: 1px solid #ddd;
        height: 70px;
        line-height: 78px;
        span {
          display: inline-block;
          width: 100px;
          font-size: 17px;
          transition: all 0.3s;
          user-select: none;
        }
        .tags {
          margin-left: 50px;
          font-size: 15px;
          font-weight: 200;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          justify-content: center;
        }
      }
    }

}
</style>