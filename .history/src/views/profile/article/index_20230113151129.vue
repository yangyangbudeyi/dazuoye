<template>
    <div  class="Article">
    <div class="top">
      <el-tag size="large" v-if="loading" plain
        >正在拼命加载数据...</el-tag
      >
      <el-tag size="large" v-else plain
        >{{ key ? "已为您查询到" : "您已经发表了" }}<b>{{ total }}</b
        >篇文章</el-tag
      >
      <div class="search">
        <el-input
          @focus="inputFocus"
          @blur="inputBlur"
          v-model="key"
          class="w-50 m-2 "
          :class="!changeInput?'':'inp'"
          @change="searchChange"
          :maxlength="10"
          :placeholder="!changeInput?'搜索已发布文章':'请输入您想要查询的文章按回车键查询'"
          clearable
          :disabled="loading || !total"
          @clear="reset"
        />
        <el-button @click="reset" :disabled="!key">重置</el-button>
      </div>
    </div>
    <Loading :height="480" class="searchLoading" :key="Date.now()" :top="-65" v-show="loading"/>
   <div v-show="!loading">
    <div class="item" >
      <div class="artItem" v-for="item in artData" :key="item.artId">
        <div
          class="title"
          @click="navigateDetails(item.artId, item.mangerHidden)"
        >
          {{ item.artTitle }}
        </div>
        <div class="bottom">
          <p class="time">{{ item.artDate }}</p>
          <p class="pageView">
            <span>{{ item.pageView }}人预览</span>
            <span>{{ item.collectCount }}人收藏</span>
            <span>{{ item.artPcomment }}条评论</span>
          </p>
          <p class="show">
            <span class="mangerShow" v-if="item.mangerHidden == '1'"
              > <el-tag class="ml-2" type="danger">已被管理员禁用</el-tag></span
            >
            <span class="selfShow" v-if="item.hidden == '1'">仅自己可见</span>
          </p>
        </div>
        <div class="button">
          <div
            class="showView circleCss"
            @click="changeShow(item.artId ?? '', item.hidden ?? '',item.mangerHidden??'')"
          >
            <el-icon v-if="item.hidden != '1'"><View /></el-icon>
            <el-icon v-else><Hide /></el-icon>
          </div>
          <div class="edit circleCss" @click="navigateEditor(item.artId ?? '',item.mangerHidden??'')">
            <el-icon><Edit /></el-icon>
          </div>
          <div class="del circleCss" @click="deleteArt(item.artId ?? '')">
            <el-icon><Delete /></el-icon>
          </div>
          <div></div>
        </div>
      </div>
      <div v-if="!selectAllEmpty">
        <Pagination
          v-if="!empty"
          :pageOn="objParams.pageOn"
          :pageCount="objParams.pageCount"
          :total="total"
          @changeNum="changeNum"
        ></Pagination>
      </div>
    </div>
    <el-result v-show="empty " icon="warning" title="您还没有发表过相关文章呢" />
    <el-result
      v-show="selectAllEmpty"
      icon="warning"
      title="您还没有发布过文章呢"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/write/article')"
          >去写文章</el-button
        >
      </template>
    </el-result>
   </div>
  </div>
</template>

<script lang="ts" setup>
import {
  getSubmitByUserId,
  updateArtHidden,
  updateArtVisible,
  deletePublishById,
  getSearchArtPublishUser,
} from "@/api/request";
import {
  IArticleData,
  IUserPublishArtParams,
  IUserPublishArtSearchParams,
} from "@/types/article";
import { useValidateLogin } from "@/hooks/validateLogin";
import { useValidateIDisabled } from "@/hooks/validateIDisabled";
import { IIndexArticleParams } from "@/views/home/types";
import { Edit, Delete, Hide, View } from "@element-plus/icons-vue";
const key = ref("");
const empty = ref(false);
const selectAllEmpty = ref(false);
const isSearch = ref(false);
const loading = ref(true);
const total = ref(0);
const changeInput = ref(false);
const mangerHidden = ref("0");
const artData = ref<IArticleData[]>([]);
const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId;
const objParams: IIndexArticleParams = reactive({
  pageOn: 1,
  pageCount: 10,
});
onMounted(() => {
  const scrollTop: any = sessionStorage.getItem("artScrollTop");
  if (scrollTop) {
    document.documentElement.scrollTo({
      top: scrollTop * 1,
      behavior: "smooth",
    });
  } 
  const storeKey = sessionStorage.getItem("artSearchKey");
  const storePage: any = sessionStorage.getItem("artPageOn");
  if (storeKey) {
    storePage ? (objParams.pageOn = storePage * 1) : (objParams.pageOn = 1);
    key.value = storeKey;
    getSearch();
  } else {
    storePage ? (objParams.pageOn = storePage * 1) : (objParams.pageOn = 1);
    getArt();
  }
});

//按下回车搜索
const searchChange = () => {
  if (!key.value) return;
  sessionStorage.setItem("artSearchKey", key.value);
  sessionStorage.setItem("artPageOn", "1");
  objParams.pageOn = 1;
  if (selectAllEmpty.value) {
    ElMessage.warning("您还没有发表过任何文章呢");
    return;
  }
  loading.value= true
  getSearch();
};

onBeforeUnmount(() => {
  sessionStorage.setItem(
    "artScrollTop",
    document.documentElement.scrollTop as any
  );
});

//输入框获取以及焦点改变宽度
const inputFocus = ()=>{
  console.log("inputFocus")
  changeInput.value = true
}
const inputBlur = ()=>{
  console.log("inputBlur")
  changeInput.value = false
}

//文章搜索查询
const getSearch = async (val?:string) => {
  const obj: IUserPublishArtSearchParams = {
    userId,
    key: key.value,
    ...toRaw(objParams),
  };
  if(!val){
    loading.value = true;
  }
  const { data: res } = await getSearchArtPublishUser(obj).finally(()=>{
    setTimeout(()=>{
      loading.value= false
    },1000)
  })
  if (res.code != 200) {
    artData.value = [];
    selectAllEmpty.value = false;
    total.value = 0;
    empty.value = true;
    return;
  }
  empty.value = false;
  selectAllEmpty.value = false;
  artData.value = res.data;
  total.value = res.total;
};
//清空输入框
const reset = () => {
  sessionStorage.removeItem("artSearchKey");
  sessionStorage.removeItem("artPageOn");
  key.value = "";
  empty.value = false;
  objParams.pageOn = 1;
  if (selectAllEmpty.value) return;
  getArt();
};

//触发页码切换
const changeNum = (num: number) => {
  objParams.pageOn = num;
  sessionStorage.setItem("artPageOn", num + "");
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  if (key.value) {
    getSearch();
  } else {
    getArt();
  }
};
const router = useRouter();

//查询用户发布的所有文章
const getArt = async (val?:string) => {
  const params: IUserPublishArtParams = { userId, ...toRaw(objParams) };
  if(!val){
    loading.value = true;
  }
  const { data: res } = await getSubmitByUserId(params).finally(() => {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
  if (res.code != 200) {
    empty.value = false;
    selectAllEmpty.value = true;
    artData.value = [];
    return;
  }
  artData.value = res.data;
  selectAllEmpty.value = false;
  mangerHidden.value = res.data[0]?.mangerHidden;
  total.value = res.total;
};

//设置文章公开或仅自己可见
const changeShow = async (artId: string, hidden: string,mangerHidden:string) => {
  if(mangerHidden=='1'){
    return  ElMessage.error("内容涉及违规，或已被管理员禁用");
  }
  const { state, login } = await useValidateLogin();
  if (!state || !login) return;
  if (hidden == "1") {
    const { data: res } = await updateArtVisible(artId);
    if (key.value) {
      getSearch("hiddenLoading");
    } else {
      getArt("hiddenLoading");
    }
    ElMessage.success("已设为公开可见");
  } else {
    const { data: res } = await updateArtHidden(artId);
    if (key.value) {
      getSearch("hiddenLoading");
    } else {
      getArt("hiddenLoading");
    }
    ElMessage.success("已设为仅自己可见");
  }
};

//删除文章
const deleteArt = async (artId: string) => {
  const { state, login } = await useValidateLogin();
  if (!state || !login) return;
  const isDisable = await useValidateIDisabled("删除");
  if (isDisable) return;
  ElMessageBox.confirm("您确定要永久删除当前文章吗?", "温馨提示", {
    confirmButtonText: "确定删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const { data: res } = await deletePublishById(artId);
      if (res.code != 200) return ElMessage.error("服务异常！删除失败");
      ElMessage.success("删除成功");
      if (key.value) {
        getSearch("hiddenLoading");
      } else {
        getArt("hiddenLoading");
      }
    })
    .catch(() => {});
};

//跳转编辑页面
const navigateEditor = (artId: string,mangerHidden:string) => {
  if(mangerHidden=='1'){
    return  ElMessage.error("内容涉及违规，或已被管理员禁用");
  }
  router.push(`/write/article?artId=${artId}`);
};
//跳转文章详情
const navigateDetails = (artId: string | undefined, mangerHidden: any) => {
  if (!artId) return;
  if (mangerHidden == "1")
    return ElMessage.error("内容涉及违规，或已被管理员禁用");
  router.push({ name: "details", params: { artId } });
};
</script>

<style lang="scss" scoped>
.Article {
  width: 100%;
  min-height: 300px;
  padding: 25px 0;
  box-sizing: border-box;
  user-select: none;
  .top {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--el-border-color);
    box-sizing: border-box;
    padding: 0 15px;
    border-radius: 4px;
    .el-tag {
      font-size: 17px;
    }
    .search {
      display: flex;
      .el-input {
        width: 230px;
        transition: all .3s;
        background: skyblue !important;
        .el-input__inner{
          background: skyblue !important;
        }
      }
      .inp{
        width: 330px;
        background: none;
      }
      .el-button {
        margin-left: 12px;
      }
    }
  }
  .item {
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
    border-radius: 4px;
    box-sizing: border-box;
    .artItem {
      width: 100%;
      height: 80px;
      border-radius: 4px;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      padding: 0 18px;
      box-sizing: border-box;
      position: relative;
      .title {
        margin-top: 18px;
        font-size: 16px;
        font-weight: 700;
        transition: all 0.4s;
        cursor: pointer;
        &:hover {
          color: teal;
        }
      }
      .bottom {
        display: flex;
        margin-top: 16px;
        font-size: 12px;
        color: #666;
        p {
          margin: 0;
          margin-right: 15px;
        }
        .pageView {
          span {
            margin: 0 5px;
          }
        }
        .show {
          .selfShow,
          .mangerShow {
            color: #cc2c2c;
            margin: 0 5px;
          }
          .mangerShow{
            position: relative;
            top: -5px;
          }
        }
      }
      .button {
        position: absolute;
        right: 25px;
        bottom: 30px;
        display: flex;
        align-items: center;
        .edit,
        .del,
        .showView {
          width: 38px;
          height: 38px;
          position: absolute;
          transition: all 0.4s;
          &:hover {
            transform: scale(1.15);
          }
        }
        .showView {
          right: 140px;
        }
        .edit {
          right: 78px;
        }
        .del {
          right: 20px;
          &:hover {
            color: #cc2c2c;
          }
        }
      }
    }
  }
}
</style>
