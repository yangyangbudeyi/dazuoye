import{d as L,a as v,A as q,r as I,i as E,m as w,q as n,p as s,u as D,aT as J,aU as O,J as h,G as b,n as x,aV as X,aW as U,aX as G,O as c,Q as k,aY as Q,aZ as W,a_ as Y,a8 as H,a9 as K,ad as ee,ag as ue,ae,_ as M,o as te,N as $,aR as oe,aS as se,j as re,k as V,B as ne,X as le,U as de,V as ie,a$ as me}from"./index.d44dcaab.js";/* empty css                    *//* empty css                     *//* empty css                    */import{g as ce}from"./getCurTime.0eecd4be.js";let fe=(o=21)=>crypto.getRandomValues(new Uint8Array(o)).reduce((l,i)=>(i&=63,i<36?l+=i.toString(36):i<62?l+=(i-26).toString(36).toUpperCase():i>62?l+="-":l+="_",l),"");const ge=h("\u8BB0\u4F4F\u6211\u7684\u767B\u5F55\u72B6\u6001"),pe=h("\u5FD8\u8BB0\u5BC6\u7801"),Be=L({__name:"index",props:{data:null,disabledBtn:null},setup(o){const l=o,i=v(),p=v(!1),m=v("\u53D1\u9001\u9A8C\u8BC1\u7801"),f=q(),y=(d,e,u)=>{e===""?u(new Error("\u8D26\u53F7\u4E0D\u80FD\u4E3A\u7A7A")):(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(e)||u(new Error("\u8BF7\u8F93\u5165\u5408\u6CD5\u7684\u90AE\u7BB1")),u())},C=(d,e,u)=>{e===""?u(new Error("\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A")):/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(e)?u():u(new Error("\u5BC6\u7801\u5FC5\u987B\u7531\u6570\u5B57\u5B57\u6BCD\u7EC4\u6210\u4E14\u4E3A8-16\u4F4D"))},F=(d,e,u)=>{e===""?u(new Error("\u786E\u8BA4\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A")):/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(e)?e!==a.password?u(new Error("\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4")):u():u(new Error("\u786E\u8BA4\u5BC6\u7801\u5FC5\u987B\u7531\u6570\u5B57\u5B57\u6BCD\u7EC4\u6210\u4E14\u4E3A8-16\u4F4D"))},A=(d,e,u)=>{e===""?u(new Error("\u6635\u79F0\u4E0D\u80FD\u4E3A\u7A7A")):e.length<3?u(new Error("\u6635\u79F0\u957F\u5EA6\u81F3\u5C11\u4E3A3")):e.length>16?u(new Error("\u6635\u79F0\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC715")):u()},P=(d,e,u)=>{e===""?u(new Error("\u9A8C\u8BC1\u7801\u4E0D\u80FD\u4E3A\u7A7A")):u()},a=I({username:"",password:"",name:"",checkoutPassword:"",validateCode:"",rememberPsd:!0}),R=I({username:[{validator:y,trigger:"change"}],password:[{validator:C,trigger:"change"}],name:[{validator:A,trigger:"change"}],checkoutPassword:[{validator:F,trigger:"change"}],validateCode:[{validator:P,trigger:"change"}]}),T=d=>{!d||d.validate(async e=>{var u,r;if(e)if(l.data==="login"){const{username:g,password:B}=a,_={username:g,password:B},{data:t}=await G(_);if(t.code==403)return c.warning("\u60A8\u8F93\u5165\u8D26\u53F7\u4E0D\u5B58\u5728");if(t.code==404)return c.error("\u8D26\u53F7\u6216\u5BC6\u7801\u9519\u8BEF");localStorage.setItem("userInfo",JSON.stringify(t.data[0])),localStorage.setItem("token",t.token),c.success("\u767B\u5F55\u6210\u529F"),k.emit("loginSuccess",{userImgParams:t.data[0].userImg,regDateParams:(u=t.data[0])==null?void 0:u.regDate,nameParams:(r=t.data[0])==null?void 0:r.name});const S=sessionStorage.getItem("navigateLoginPre");if(S){f.push(S),sessionStorage.removeItem("navigateLoginPre");return}else{f.push("/"),sessionStorage.removeItem("navigateLoginPre");return}}else{Z();return}else return!1})},Z=async()=>{const d={name:a.name,username:a.username,password:a.password,checkedPsd:a.checkoutPassword,code:a.validateCode,regDate:ce(),userId:fe().toLocaleLowerCase()},{data:e}=await Q(d);if(e.code==403)return c.warning("\u8D26\u53F7\u5DF2\u5B58\u5728");if(e.code==400)return c.error("\u9A8C\u8BC1\u7801\u4E0D\u6B63\u786E");if(e.code==404)return c.error("\u6CE8\u518C\u5931\u8D25");c.success("\u6CE8\u518C\u6210\u529F\uFF01"),k.emit("changeLogin"),f.push("/login?commit=login")},z=async()=>{var d;(d=i.value)==null||d.validateField("username",async(e,u)=>{const r=u==null?void 0:u.username[0].message;if(!e)return c.warning(r);const{data:g}=await W(a.username);if(g.code==405)return c.warning("\u8BE5\u8D26\u53F7\u5DF2\u5B58\u5728");if(g.code==404)return c.error("\u9A8C\u8BC1\u7801\u53D1\u9001\u5931\u8D25");p.value=!0,Y({title:"\u9A8C\u8BC1\u7801\u901A\u77E5",message:"\u9A8C\u8BC1\u7801\u53D1\u9001\u6210\u529F\uFF01\u8BF7\u6CE8\u610F\u67E5\u6536",type:"success"});let B=120,_=setInterval(()=>{B-=1,m.value=`${B}\u540E\u91CD\u65B0\u53D1\u9001`,B<=0&&(clearInterval(_),m.value="\u53D1\u9001\u9A8C\u8BC1\u7801",p.value=!1)},1200)})},j=()=>{f.push("/repsd")};return(d,e)=>{const u=H,r=K,g=ee,B=ue,_=ae;return E(),w(_,{ref_key:"ruleFormRef",ref:i,model:a,"status-icon":"",rules:R,"label-width":"100px",class:"demo-ruleForm"},{default:n(()=>[s(r,{prop:"username"},{default:n(()=>[s(u,{placeholder:"\u8BF7\u8F93\u5165\u60A8\u7684\u90AE\u7BB1\u8D26\u53F7",modelValue:a.username,"onUpdate:modelValue":e[0]||(e[0]=t=>a.username=t),modelModifiers:{trim:!0},type:"text",autocomplete:"off","prefix-icon":D(J)},null,8,["modelValue","prefix-icon"])]),_:1}),o.data==="reg"?(E(),w(r,{key:0,class:"sendCode",prop:"validateCode"},{default:n(()=>[s(u,{placeholder:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",modelValue:a.validateCode,"onUpdate:modelValue":e[1]||(e[1]=t=>a.validateCode=t),modelModifiers:{trim:!0},type:"text",autocomplete:"off","prefix-icon":D(O)},null,8,["modelValue","prefix-icon"]),s(g,{disabled:p.value||o.data==="reg"&&o.disabledBtn.reg,onClick:z},{default:n(()=>[h(b(m.value),1)]),_:1},8,["disabled"])]),_:1})):x("",!0),o.data==="reg"?(E(),w(r,{key:1,prop:"name"},{default:n(()=>[s(u,{placeholder:"\u8BF7\u586B\u5199\u4E00\u4E2A\u597D\u542C\u7684\u6635\u79F0\u5427",modelValue:a.name,"onUpdate:modelValue":e[2]||(e[2]=t=>a.name=t),modelModifiers:{trim:!0},type:"text",autocomplete:"off","prefix-icon":D(X)},null,8,["modelValue","prefix-icon"])]),_:1})):x("",!0),s(r,{prop:"password"},{default:n(()=>[s(u,{modelValue:a.password,"onUpdate:modelValue":e[3]||(e[3]=t=>a.password=t),modelModifiers:{trim:!0},type:"password",autocomplete:"off","show-password":"",placeholder:"\u8BF7\u8F93\u5165\u60A8\u7684\u5BC6\u7801","prefix-icon":D(U)},null,8,["modelValue","prefix-icon"])]),_:1}),o.data==="login"?(E(),w(r,{key:2,props:"rememberPsd",class:"forgetPsd"},{default:n(()=>[s(B,{modelValue:a.rememberPsd,"onUpdate:modelValue":e[4]||(e[4]=t=>a.rememberPsd=t)},{default:n(()=>[ge]),_:1},8,["modelValue"]),s(g,{type:"primary",text:"",onClick:j},{default:n(()=>[pe]),_:1})]),_:1})):x("",!0),o.data==="reg"?(E(),w(r,{key:3,prop:"checkoutPassword"},{default:n(()=>[s(u,{modelValue:a.checkoutPassword,"onUpdate:modelValue":e[5]||(e[5]=t=>a.checkoutPassword=t),modelModifiers:{trim:!0},type:"password","show-password":"",autocomplete:"off",placeholder:"\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801","prefix-icon":D(U)},null,8,["modelValue","prefix-icon"])]),_:1})):x("",!0),s(r,null,{default:n(()=>[s(g,{type:"primary",disabled:o.data==="login"&&o.disabledBtn.login||o.data==="reg"&&o.disabledBtn.reg,class:"loginBtn",onClick:e[6]||(e[6]=t=>T(i.value))},{default:n(()=>[h(b(o.data==="login"?"\u767B\u5F55":"\u7ACB\u5373\u6CE8\u518C"),1)]),_:1},8,["disabled"])]),_:1})]),_:1},8,["model","rules"])}}});const N=M(Be,[["__scopeId","data-v-1ff49a6b"]]),Ce=o=>(de("data-v-631880ad"),o=o(),ie(),o),Fe={class:"login"},Ee={class:"container"},_e={class:"tops"},we=Ce(()=>V("img",{src:me,alt:""},null,-1)),De=L({__name:"index",setup(o){const l=v("login"),p=ne().query.commit,m=v("\u767B\u5F55");p?(l.value=p,p=="login"?m.value="\u767B\u5F55":m.value="\u6CE8\u518C"):(l.value="login",m.value="\u767B\u5F55");const f=I({login:!1,reg:!1});te(async()=>{if(await $("\u767B\u5F55"))return f.login=!0;if(await $("\u6CE8\u518C"))return f.reg=!0}),k.on("changeLogin",()=>{l.value="login"});const y=(C,F)=>{C.paneName=="login"?m.value="\u767B\u5F55":m.value="\u6CE8\u518C",le.replace(`/login?commit=${C.paneName}`)};return(C,F)=>{const A=oe,P=se;return E(),re("div",Fe,[V("div",Ee,[V("div",_e,[we,V("span",null,"\u6B22\u8FCE"+b(m.value),1)]),s(P,{modelValue:l.value,"onUpdate:modelValue":F[0]||(F[0]=a=>l.value=a),class:"demo-tabs",onTabClick:y},{default:n(()=>[s(A,{label:"\u8D26\u53F7\u5BC6\u7801\u767B\u5F55",name:"login"},{default:n(()=>[s(N,{disabledBtn:f,data:"login"},null,8,["disabledBtn"])]),_:1}),s(A,{label:"\u7ACB\u5373\u6CE8\u518C",name:"reg"},{default:n(()=>[s(N,{disabledBtn:f,data:"reg"},null,8,["disabledBtn"])]),_:1})]),_:1},8,["modelValue"])])])}}});const ye=M(De,[["__scopeId","data-v-631880ad"]]);export{ye as default};
