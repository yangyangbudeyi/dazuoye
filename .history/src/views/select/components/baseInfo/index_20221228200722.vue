<template>
  <div class="baseInfo">
    <div class="useInfo" v-for="(item,index) in data" :key="index">
      <div class="box">
        <div class="users">
          <div class="imgBox">
            <img :src="item.userImg" alt="" />
          </div>
          <div class="date">注册于：{{ getTimeBefore(item.regDate) }}</div>
        </div>
        <div class="info">
          <p>
          <span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</span
          ><span>{{ item.name ? item.name : "null" }}</span>
          </p>
          <p>
          <span>用&nbsp;&nbsp;户&nbsp;&nbsp;ID</span
          ><span>{{ item.userId }}</span>
          </p>
          <p>
          <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</span
          ><span>{{ item.sex === "1" ? "男" : "女" }}</span>
          </p>
          <p v-if="item.address">
          <span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区</span
          ><span>{{ item.address }}</span>
          </p>
          <div class="wan" v-if="item.introduce">
            <div class="nihaoaa">个性签名</div>
            <div class="jianjie">
              {{ item.introduce }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getTimeBefore} from "@/utils/getTimeBefore"
import {IUserInfoData} from "@/types/user";

defineProps<{data:IUserInfoData[]}>()
</script>

<style lang="scss" scoped>
.useInfo {
  padding: 40px ;
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  .box {
    display: flex;
    .users {
      width: 200px;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      div {
        margin-top: 20px;
      }
      .imgBox {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          transition: all 0.4s;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
      .date {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
      }
    }
    .info{
      flex: 1;
      p {
        text-align: left;
        margin-bottom: 30px;
        padding-bottom: 7px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
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
            transition: all 0.3s;
          }
          &:last-child {
            margin-left: 100px;
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
        }
        .jianjie {
          display: block;
          width: 150px;
          font-size: 16px;
          margin-left: 104px;
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
          font-size: 17px;
          transition: all 0.3s;
        }
        .tags {
          margin-left: 95px;
          font-size: 15px;
          font-weight: 200;
          cursor: pointer;
          transition: all 0.3s;
        }
      }
    }
  }
}
</style>