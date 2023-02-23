<template>
  <div class="pinglun" id="pinglinya">
    <h4 class="color-change-5x">来都来啦！留下脚印吧</h4>
    <div class="liulan">
      <div>
        浏览:<el-tag class="ml-2">{{ pageView }}</el-tag>
      </div>
      <div>
        评论:<el-tag class="ml-2" type="success">{{ artPcomment }}</el-tag>
      </div>
      <div>
        收藏:<el-tag class="ml-2" type="warning">{{ collectCount }}</el-tag>
      </div>
    </div>
    <el-button type="primary" :disabled="submitBtn" @click="huifu1(1, 2)" plain
      >我也来说两句</el-button
    >
    <el-empty
      v-if="!data.commentList"
      description="暂无评论"
      class="empty"
    ></el-empty>
    <div
      class="pinglun-box"
      v-show="data.commentList.length > 0"
      v-for="item in data.commentList"
      :key="item.Pid"
    >
      <div class="first">
        <div class="left">
          <img v-if="item.userImg" :src="item.userImg" alt="" />
          <img
            v-if="item.userImg == 'undefined'"
            src="../../assets/images/dongtu.gif"
            alt=""
          />
          <img
            v-if="item.userImg == ''"
            src="../../assets/images/dongtu.gif"
            alt=""
          />
        </div>
        <div class="right">
          <div class="name">
            {{ item.name
            }}<i class="el-icon-position" v-show="item.Paddress"></i>
            <span
              style="
                background-color: #e8e8ea;
                padding: 2px 5px;
                user-select: none;
              "
              v-show="item.Paddress?.split('.')[1]"
            >
              <!-- <el-tag class="ml-2" type="info"  > -->
              IP:{{ item.Paddress?.split("·")[1] }}
              <!-- </el-tag> -->
            </span>
          </div>
          <div class="Pcontents">
            {{ item.Pcontent }}
          </div>
          <div class="bott">
            <div class="Pdate">{{ item.Pdate }}</div>
            <div class="huifu" v-if="!submitBtn">
              <a
                v-if="item.userId == userId"
                @click="deleteHuiFu(item.Pid, item.parent)"
                style="margin-right: 10px; color: red"
                >删除</a
              >
              <a @click="huifu1(item.Pid, item.name)">回复</a>
            </div>
          </div>
          <div
            class="num"
            @click="clickShowPingLun(item.Pid)"
            v-if="item.children"
          >
            {{ item.children.length }}条回复
            <!-- <i class="el-icon-arrow-down" v-show="isUpOrDown"></i>
            <i v-show="!isUpOrDown" class="el-icon-arrow-up"></i> -->
          </div>
        </div>
      </div>
      <!-- 第二层 -->
      <div
        class="secound"
        v-show="item1.parent == indexPid"
        v-for="item1 in item.children"
        :key="item1.Pid"
      >
        <div class="left">
          <img v-if="item1.userImg" :src="item1.userImg" alt="" />
          <img
            v-if="item1.userImg == 'undefined'"
            src="../../assets/images/dongtu.gif"
            alt=""
          />
          <img
            v-if="item1.userImg == ''"
            src="../../assets/images/dongtu.gif"
            alt=""
          />
        </div>
        <div class="right">
          <div class="name">
            {{ item1.name
            }}<i class="el-icon-position" v-show="item1.Paddress"></i>
            <span
              style="
                background-color: #e8e8ea;
                padding: 2px 5px;
                user-select: none;
              "
              v-show="item.Paddress?.split('.')[1]"
            >
              <!-- <el-tag class="ml-2" type="info"  > -->
              IP:{{ item.Paddress?.split("·")[1] }}
              <!-- </el-tag> -->
            </span>
          </div>
          <div class="Pcontents">
            {{ item1.Pcontent }}
          </div>
          <div class="bott">
            <div class="Pdate">{{ item1.Pdate }}</div>
            <div class="huifu" v-if="!submitBtn">
              <a
                v-if="item1.userId == userId"
                @click="deleteHuiFu(item1.Pid)"
                style="margin-right: 10px; color: red"
                >删除</a
              >
              <a @click="huifu1(item.Pid, item1.name)">回复</a>
            </div>
          </div>
          <div class="num" @click="shouqi">
            收起 <i class="el-icon-arrow-up"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="发表评论"
    width="35%"
    @close="closeDialog"
  >
    <el-input
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 9 }"
      show-word-limit
      maxlength="200"
      v-model.trim="submitCom.Pcontent"
      placeholder="请输入评论内容  善语结人缘，恶语伤人心~"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">再想想</el-button>
        <el-button
          type="primary"
          :disabled="!submitCom.Pcontent"
          @click="submitComments"
          >提交评论</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  getCommentCountByIdAll,
  submitComment,
  deleteComment,
  // selectSettingOne,
} from "@/api/request"
import {
  onMounted,
  reactive,
  ref,
  toRaw,
  defineEmits,
  defineProps,
  computed,
} from "@vue/runtime-core"
import {getCurTime} from "@/utils/getCurTime"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRoute, useRouter } from "vue-router"
import {emitter} from "@/emitter"
import {useValidateIDisabled} from "@/hooks/validateIDisabled"
import {useValidateLogin} from "@/hooks/validateLogin"
const route = useRoute()
const router = useRouter()
const name = JSON.parse(localStorage.getItem("userInfo"))?.name
const userId = JSON.parse(localStorage.getItem("userInfo"))?.userId
const emit = defineEmits(["updates"])
const props = defineProps([
  "pageView",
  "collect",
  "comment",
  "collectCount",
  "artPcomment",
])
let data = reactive({
  commentList: [],
})
let indexPid = ref("")
const submitBtn = ref(false)
let dialogVisible = ref(false)

// //computed计算收藏和评论总数
// const getCollectTotal = computed(() => store.state.user.collectCount)
// const getCommentTotal = computed(() => store.state.user.artPcomment)

//提交评论数据
let submitCom = reactive({
  Pcontent: "",
  artId: route.params.artId,
  userId,
  parent: "",
  // Paddress: JSON.parse(localStorage.getItem("STATICSTICS"))?.Tcity,
})
onMounted(() => {
  getCommentByArtId()
  getBtnStatus()
})

//查询提交按钮状况
const getBtnStatus = async () => {
  const isDisable =await useValidateIDisabled("删除")
  if(isDisable) return submitBtn.value = false
}

//获取文章的评论内容
const getCommentByArtId = async () => {
  let { data: res } = await getCommentCountByIdAll(route.params.artId)
  data.commentList = res.data
}

//点击回复评论
const clickShowPingLun = (Pid) => {
  indexPid.value = Pid
}
//收起二级回复
const shouqi = (Pid) => {
  indexPid.value = -1
}

const huifu1 =async (Pid, name) => {
  const {state,login} =await useValidateLogin()
  if(!state||!login) return
  dialogVisible.value = true
  if (Pid == 1 && name == 2) {
    submitCom.name = name
    submitCom.parent = null
  } else {
    submitCom.name = name
    submitCom.parent = Pid
  }
}

//对话框关闭
const closeDialog = () => {
  submitCom.Pcontent = ""
}

//提交评论
const submitComments = async () => {
  const {state,login} =await useValidateLogin()
if(!state||!login) return
  if (!submitCom.Pcontent) return ElMessage.warning("评论内容不能为空")
  let obj = { ...toRaw(submitCom), Pdate: getCurTime() }
  let { data: res } = await submitComment(obj)
  if (res.code != 200) return ElMessage.error("评论失败，请再次尝试")
  emit("updates", "comment", "jia")
  getCommentByArtId()
  dialogVisible.value = false
  submitCom.Pcontent = ""
  indexPid.value = obj.parent
}

//删除评论
const deleteHuiFu = (id, parent) => {
  let preData = toRaw(data.commentList)
  let newData = preData?.filter((item) => item.Pid === id)
  let preCommentCount = newData[0]?.children?.length ?? 0
  const {state,login} =await useValidateLogin()
if(!state||!login) return
  ElMessageBox.confirm("确定要永久删除此条评论吗?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "再想想",
    type: "warning",
  })
    .then(async () => {
      emitter.emit("delPreUpdates")
      let { data: res } = await deleteComment(id)
      if (res.code !== 200) return ElMessage.error("删除失败")
      emit("updates", "comment", "jian", Number(preCommentCount) + 1)
      getCommentByArtId()
      indexPid.value = obj.parent
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.pinglun {
  width: 100%;
  min-height: 230px;
  border-radius: 3px;
  margin-top: 10px;
  padding-bottom: 30px;
  background: #fff !important;
  user-select: none;
  h4 {
    padding-top: 20px;
    font-size: 25px;
    margin: 0px 0 35px;
    user-select: none;
    text-align: center;
    font-weight: 200;
  }
  .liulan {
    user-select: none;
    text-align: left;
    margin-left: 50px;
    display: flex;
    div {
      margin-right: 20px;
      .el-tag {
        margin-left: 10px;
      }
    }
  }
  .el-button {
    float: right;
    position: relative;
    margin-right: 5%;
    margin-bottom: 20px;
  }
  .empty {
    margin: 0 auto;
    margin-left: 13%;
  }
  .pinglun-box {
    width: 90%;
    border: 1px solid #eee;
    padding: 2px 0;
    border-radius: 4px;
    margin: 15px auto;
    transition: all 0.4s;
    overflow: hidden;
    .first {
      display: flex;
      &:hover {
        .right {
          .bott {
            .huifu {
              opacity: 1;
              transition: all 0.5s;
            }
          }
        }
      }
      .left {
        width: 60px;
        height: 60px;
        margin: 13px 10px 10px 12px;
        border-radius: 5px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
        }
      }
      .right {
        width: 90%;
        text-align: left;
        padding-left: 10px;
        .name {
          user-select: none;
          margin-top: 6px;
          font-size: 15px;
          span {
            user-select: none;
            font-size: 12px;
            margin-left: 10px;
          }
        }
        .Pcontents {
          margin-bottom: 4px;
          padding-right: 55px;
          transition: all 0.2s;
          padding: 2px 0;
          user-select: none;
        }
        .bott {
          display: flex;
          justify-content: space-between;
          .Pdate {
            font-size: 12px;
          }
          .huifu {
            opacity: 0;
            a {
              color: #333;
              transition: all 0.2s;
              &:hover {
                color: rgb(136, 204, 247);
              }
            }
          }
        }
        .num {
          cursor: pointer;
          font-size: 13px;
        }
      }
    }
    .secound {
      padding: 2px 0;
      width: 100%;
      border-top: 1px solid #eee;
      display: flex;
      &:hover {
        .right {
          .bott {
            .huifu {
              opacity: 1;
              transition: all 0.5s;
            }
          }
        }
      }
      .left {
        width: 50px;
        height: 50px;
        margin: 13px 10px 10px 60px;
        border-radius: 5px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
        }
      }
      .right {
        width: 90%;
        text-align: left;
        padding-left: 10px;
        .name {
          margin-top: 6px;
          font-size: 15px;
          span {
            font-size: 12px;
            margin-left: 10px;
          }
        }
        .Pcontents {
          margin-bottom: 4px;
          padding-right: 55px;
          transition: all 0.3s;
          user-select: none;
          // &:hover {
          //   color: teal;
          // }
        }
        .bott {
          display: flex;
          justify-content: space-between;
          .Pdate {
            font-size: 12px;
          }
          .huifu {
            opacity: 0;
            position: relative;
            right: 10px;
            a {
              color: #333;
              transition: all 0.3s;
              &:hover {
                color: rgb(136, 204, 247);
              }
            }
          }
        }
        .num {
          cursor: pointer;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
