import{_ as i}from"./index.744ea876.js";import{d,a,o as p,b as m,Y as v,O as f,i as h,j as g,w as s,S as u,p as _,T as b,_ as x}from"./index.41016c19.js";import"./validateLogin.4aa471ef.js";import"./upload.b654424a.js";const w={class:"about"},y=d({__name:"index",setup(E){const n=a(""),e=a(!0);p(()=>{document.documentElement.scrollTo({behavior:"smooth",top:0}),c()}),m(()=>{document.documentElement.scrollTo({behavior:"smooth",top:0})});const c=async()=>{var t;const{data:o}=await v().finally(()=>{setTimeout(()=>{e.value=!1},1e3)});if(o.code!=200)return f.error("\u670D\u52A1\u5F02\u5E38\uFF01");n.value=(t=o.data[0])==null?void 0:t.artContent};return(o,t)=>{const l=b,r=i;return h(),g("div",w,[s(_(l,{height:1e3},null,512),[[u,e.value]]),s(_(r,{previewOnly:!0,value:n.value},null,8,["value"]),[[u,!e.value]])])}}});const C=x(y,[["__scopeId","data-v-8980ef3a"]]);export{C as default};