import{d as G,a as i,o as K,N as U,b as Q,r as z,a8 as me,a9 as Ee,aa as _e,ab as fe,ac as ge,ad as ve,ae as Fe,af as Ae,ag as Be,z as De,ah as we,ai as he,i as D,j as C,p as l,q as n,B as Ie,A as W,F as Ce,l as ye,m as P,u as q,aj as be,ak as Ve,J as h,G as $,k as M,w as xe,S as Te,n as O,al as Se,am as ke,P as J,t as Ue,an as qe,O as f,ao as He,U as Ne,V as Oe,_ as X,f as je}from"./index.d44dcaab.js";/* empty css                  *//* empty css                    *//* empty css                *//* empty css                    *//* empty css                     */import{_ as Me}from"./index.adb9de73.js";/* empty css               *//* empty css                  */import{u as Re}from"./upload.b654424a.js";import{g as L}from"./getCurTime.0eecd4be.js";import{u as j}from"./validateLogin.de5b868a.js";const Y=w=>(Ne("data-v-4ddd5e54"),w=w(),Oe(),w),ze={class:"artInfoForm"},Pe=h("\u63D0\u4EA4"),$e=h("\u91CD\u7F6E"),Je=["src"],Le={key:2,class:"el-upload__text"},Ge=h(" \u53EF\u62D6\u62FD\u56FE\u7247\u81F3\u6B64\u6B21\u5904\u6216 "),Ke=Y(()=>M("em",null,"\u70B9\u51FB\u9009\u62E9\u4E0A\u4F20\u56FE\u7247",-1)),Qe=[Ge,Ke],We=Y(()=>M("div",{class:"el-upload__tip"}," \u53EF\u4E0A\u4F20jpg/png\u7C7B\u578B\u7684\u56FE\u7247 ",-1)),Xe={class:"dialog-footer"},Ye=h("\u5173\u95ED"),Ze=G({__name:"index",props:{data:null},setup(w){const g=i(),c=i(!1),v=i(!1),p=i(!1),F=i(!1),d=i(""),H=i(!1),R=i(!1),N=Ie(),y=i(),b=W();K(async()=>{if(await U("\u53D1\u5E03"))return H.value=!0});const I=i("");Q(async()=>{var e,t;if((e=g.value)==null||e.resetFields(),I.value=N.query.artId,y.value=(t=JSON.parse(localStorage.getItem("userInfo")))==null?void 0:t.userId,N.query.artId){if(I.value=N.query.artId,Z(),await U("\u4FEE\u6539"))return R.value=!0}else if(await U("\u53D1\u5E03"))return H.value=!0});const Z=async()=>{var E,_,A,r,B,V,x,T,S,k,o;const{data:e}=await ke(I.value,y.value);if(console.log(e==null?void 0:e.data[0]),e.code==404||y.value!=((E=e==null?void 0:e.data[0])==null?void 0:E.userId))return b.replace("/notFound");const t=(_=e==null?void 0:e.data[0])==null?void 0:_.hidden,a=(A=e==null?void 0:e.data[0])==null?void 0:A.mangerHidden,s=(r=e==null?void 0:e.data[0])==null?void 0:r.userId;if(t=="1"&&s!=y.value||a=="1")return b.replace("/notFound");u.artTitle=(B=e==null?void 0:e.data[0])==null?void 0:B.artTitle,u.artIntroduce=(V=e==null?void 0:e.data[0])==null?void 0:V.artIntroduce,u.isHidden=((x=e==null?void 0:e.data[0])==null?void 0:x.hidden)=="1",u.tag=(S=(T=e==null?void 0:e.data[0])==null?void 0:T.tag)==null?void 0:S.split(",");const m=(o=(k=e.data[0])==null?void 0:k.artContent)==null?void 0:o.replace(/shuangyinghao/g,'"');u.artContent=m==null?void 0:m.replace(/danyinhao/g,"'")},ee=(e,t,a)=>{t===""?a(new Error("\u6587\u7AE0\u6807\u9898\u4E0D\u80FD\u4E3A\u7A7A")):t.length<8||t.length>60?a(new Error("\u6807\u9898\u7684\u5B57\u6570\u5E94\u8BE5\u57288-60\u4E4B\u95F4")):a()},te=(e,t,a)=>{t===""?a(new Error("\u6587\u7AE0\u63CF\u8FF0\u4E0D\u80FD\u4E3A\u7A7A")):t.length<8||t.length>120?a(new Error("\u63CF\u8FF0\u7684\u5B57\u6570\u5E94\u8BE5\u57288-120\u4E4B\u95F4")):a()},ue=(e,t,a)=>{t.length==0?a(new Error("\u5206\u7C7B\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A")):t.length>3?a(new Error("\u6700\u591A\u53EF\u9009\u62E93\u4E2A\u6807\u7B7E")):a()},ae=(e,t,a)=>{t.length==0?a(new Error("\u6587\u7AE0\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A")):a()},u=z({artTitle:"",artIntroduce:"",tag:[],isHidden:!1,artContent:""}),oe=z({artTitle:[{validator:ee,required:!0,trigger:"change"}],artIntroduce:[{validator:te,required:!0,trigger:"change"}],tag:[{validator:ue,required:!0,trigger:"change"}],artContent:[{validator:ae,required:!0,trigger:"change"}]}),le=()=>{},ne=e=>{!e||e.validate(t=>{if(t)I.value?J.confirm("\u60A8\u786E\u5B9A\u8981\u63D0\u4EA4\u4FEE\u6539\u5417?","\u6E29\u99A8\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4\u63D0\u4EA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async()=>{const{state:a,login:s}=await j();!a||!s||se()}).catch(()=>{}):v.value=!0;else return!1})},se=async()=>{var E;const e=(E=u.artContent)==null?void 0:E.replace(/"/g,"shuangyinghao"),t=e==null?void 0:e.replace(/(',’,‘)/g,"danyinhao"),a=u.isHidden?"1":"0",s={artId:I.value,updatetime:L(),artContent:t,artTitle:u.artTitle,artIntroduce:u.artIntroduce,tag:Ue(u.tag).join(","),hidden:a},{data:m}=await qe(s);if(m.code!=200)return f.error("\u4FEE\u6539\u63D0\u4EA4\u5931\u8D25");f.success("\u4FEE\u6539\u63D0\u4EA4\u6210\u529F")},re=e=>{!e||J.confirm("\u91CD\u7F6E\u4EE5\u540E\u6240\u6709\u5185\u5BB9\u5C06\u4F1A\u88AB\u6E05\u7A7A\uFF01\u60A8\u786E\u5B9A\u8981\u8FD9\u6837\u505A\u5417\uFF1F","\u6E29\u99A8\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4\u91CD\u7F6E",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{e.resetFields()}).catch(()=>{})},ie=()=>{var e;if(!((e=u.artContent)!=null&&e.trim()))return f.warning("\u6587\u7AE0\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A\u54E6");c.value=!c.value},de=async()=>{var _,A,r,B;const{state:e,login:t}=await j();if(!e||!t)return;F.value=!0;const m={artContent:((_=u.artContent)==null?void 0:_.replace(/"/g,"shuangyinghao")).replace(/(',’,‘)/g,"danyinhao"),artId:new Date().getTime()+new Date().getTime(),artImg:d.value,userId:(A=JSON.parse(localStorage.getItem("userInfo")))==null?void 0:A.userId,artTitle:u.artTitle,artDate:L(),tag:(r=u.tag)==null?void 0:r.join(","),artIntroduce:u.artIntroduce,hidden:u.isHidden?"1":"0"},{data:E}=await He(m).finally(()=>F.value=!1);E.code!=200&&f.error("\u6587\u7AE0\u63D0\u4EA4\u5931\u8D25"),v.value=!1,(B=g.value)==null||B.resetFields(),d.value="",f({message:"\u6587\u7AE0\u53D1\u5E03\u6210\u529F",grouping:!0,type:"success"})},ce=e=>{if(e.code!=200)return f.error("\u56FE\u7247\u4E0A\u4F20\u5931\u8D25");d.value=e.url},pe=async e=>{const{state:t,login:a}=await j();if(!(!t||!a||await U("\u5220\u9664"))&&e.size/1024/1024>2)return f.error("\u56FE\u7247\u5927\u5C0F\u57282MB\u4EE5\u5185!"),!1};return(e,t)=>{const a=me,s=Ee,m=_e,E=fe,_=Me,A=ge,r=ve,B=Fe,V=Ae,x=Be,T=De,S=we,k=he;return D(),C("div",ze,[l(B,{ref_key:"ruleFormRef",ref:g,model:u,"status-icon":"",rules:oe,"label-width":"120px",class:"demo-ruleForm"},{default:n(()=>[l(s,{label:"\u5185\u5BB9\u6807\u9898",class:"item",prop:"artTitle"},{default:n(()=>[l(a,{clearable:"",modelValue:u.artTitle,"onUpdate:modelValue":t[0]||(t[0]=o=>u.artTitle=o),modelModifiers:{trim:!0},placeholder:"\u8BF7\u586B\u5199\u5185\u5BB9\u6807\u9898",type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1}),l(s,{label:"\u5185\u5BB9\u8BE6\u60C5",class:"item",prop:"artIntroduce"},{default:n(()=>[l(a,{type:"textarea",autosize:{minRows:2,maxRows:4},clearable:"",modelValue:u.artIntroduce,"onUpdate:modelValue":t[1]||(t[1]=o=>u.artIntroduce=o),modelModifiers:{trim:!0},placeholder:"\u8BF7\u586B\u5199\u5185\u5BB9\u8BE6\u60C5(\u7B80\u5355\u63CF\u8FF0\u6587\u7AE0\u4E3B\u4F53\u5185\u5BB9)",autocomplete:"off"},null,8,["modelValue"])]),_:1}),l(s,{label:"\u6587\u7AE0\u5206\u7C7B",prop:"tag"},{default:n(()=>[l(E,{style:{width:"25%"},onVisibleChange:le,clearable:"","ultiple-limit":3,multiple:"",modelValue:u.tag,"onUpdate:modelValue":t[2]||(t[2]=o=>u.tag=o),filterable:"",placeholder:"\u8BF7\u9009\u62E9\u6587\u7AE0\u6240\u5C5E\u5206\u7C7B"},{default:n(()=>[(D(!0),C(Ce,null,ye(w.data,o=>(D(),P(m,{key:o.tagId,label:o.name,value:o.name},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(s,{prop:"artContent",class:"markdown",label:"\u6587\u7AE0\u5185\u5BB9"},{default:n(()=>[l(_,{previewOnly:!1,value:u.artContent,modelValue:u.artContent,"onUpdate:modelValue":t[3]||(t[3]=o=>u.artContent=o)},null,8,["value","modelValue"])]),_:1}),l(s,{label:"\u4EC5\u81EA\u5DF1\u53EF\u89C1"},{default:n(()=>[l(A,{modelValue:u.isHidden,"onUpdate:modelValue":t[4]||(t[4]=o=>u.isHidden=o),class:"ml-2",width:60,"inline-prompt":"","active-icon":q(be),"inactive-icon":q(Ve),style:{"--el-switch-on-color":"teal","--el-switch-off-color":"#DCDFE6"}},null,8,["modelValue","active-icon","inactive-icon"])]),_:1}),l(s,null,{default:n(()=>[l(r,{plain:"",class:"submitBtn",disabled:R.value,type:"primary",onClick:t[5]||(t[5]=o=>ne(g.value))},{default:n(()=>[Pe]),_:1},8,["disabled"]),l(r,{plain:"",type:"danger",class:"resetBtn",onClick:t[6]||(t[6]=o=>re(g.value))},{default:n(()=>[$e]),_:1}),l(r,{plain:"",class:"previewBtn",onClick:ie},{default:n(()=>[h($(c.value?"\u5173\u95ED":"\u9884\u89C8"),1)]),_:1})]),_:1})]),_:1},8,["model","rules"]),l(V,{direction:"ltr","show-close":"",size:"60%",modelValue:c.value,"onUpdate:modelValue":t[7]||(t[7]=o=>c.value=o),"with-header":!1},{default:n(()=>[l(_,{previewOnly:!0,value:u.artContent},null,8,["value"])]),_:1},8,["modelValue"]),l(k,{modelValue:v.value,"onUpdate:modelValue":t[10]||(t[10]=o=>v.value=o),title:"\u6E29\u99A8\u63D0\u793A",width:"35%",top:"25vh","show-close":!1},{footer:n(()=>[M("span",Xe,[l(r,{onClick:t[9]||(t[9]=o=>v.value=!1)},{default:n(()=>[Ye]),_:1}),l(r,{type:"primary",loading:F.value,disabled:H.value,onClick:de},{default:n(()=>[h($(F.value?"\u63D0\u4EA4\u4E2D...":"\u63D0\u4EA4"),1)]),_:1},8,["loading","disabled"])])]),default:n(()=>[l(x,{modelValue:p.value,"onUpdate:modelValue":t[8]||(t[8]=o=>p.value=o),label:"\u70B9\u51FB\u9009\u62E9\u4E0A\u4F20\u6807\u9898\u914D\u56FE(\u53EF\u4EE5\u5FFD\u7565\u4E0A\u4F20)",size:"large"},null,8,["modelValue"]),xe(l(S,{class:"upload-demo upload",drag:"",action:q(Re),multiple:"","on-success":ce,"before-upload":pe,"show-file-list":!1},{tip:n(()=>[We]),default:n(()=>[d.value?(D(),C("img",{key:0,style:{width:"100%",height:"100%","object-fit":"cover"},src:d.value,class:"avatar"},null,8,Je)):O("",!0),d.value?O("",!0):(D(),P(T,{key:1,class:"el-icon--upload"},{default:n(()=>[l(q(Se))]),_:1})),d.value?O("",!0):(D(),C("div",Le,Qe))]),_:1},8,["action"]),[[Te,p.value]])]),_:1},8,["modelValue"])])}}});const et=X(Ze,[["__scopeId","data-v-4ddd5e54"]]),tt={class:"writeArticle"},ut=G({__name:"index",setup(w){const g=W(),c=i([]);K(()=>{v()}),Q(()=>{var d;const p=(d=JSON.parse(localStorage.getItem("userInfo")))==null?void 0:d.userId,F=localStorage.getItem("token");(!p||!F)&&(f.warning("\u8BF7\u5148\u767B\u5F55"),sessionStorage.setItem("navigateLoginPre","/write/article"),g.replace("/login"))});const v=async()=>{const{data:p}=await je();if(p.code!=200)return c.value=[];c.value=p.data};return(p,F)=>(D(),C("div",tt,[l(et,{data:c.value},null,8,["data"])]))}});const _t=X(ut,[["__scopeId","data-v-347d774c"]]);export{_t as default};
