import{d as S,a as D,o as L,E as x,h as B,i as o,j as n,k as a,R as h,w as H,S as V,m as N,F as d,l as g,n as _,T as F,U as w,V as I,A as C,p as i,q as A,G as m,J as R,u as b,H as j,_ as $}from"./index.d44dcaab.js";const q=e=>(w("data-v-e15ae0f2"),e=e(),I(),e),z={class:"top"},G=q(()=>a("div",{class:"title"},"Top Article",-1)),J={class:"switch"},M={class:"item"},U=["onClick"],K={class:"title"},O={class:"box"},Q={key:0,class:"time"},W=S({__name:"index",props:{data:{default:()=>[]},hotArticleLoading:{type:Boolean},skeleton:{type:Boolean,default:!0},homePage:{type:Boolean,default:!0}},emits:["changeHotSort"],setup(e,{emit:k}){const v=e,s=D(!1);L(()=>{const t=sessionStorage.getItem("indexSort");t?t==="preview"?s.value=!1:s.value=!0:s.value=!1});const y=C(),r=t=>{y.push({name:"details",params:{artId:t}})},u=t=>{t!=s.value&&(v.hotArticleLoading||(t?s.value=!0:s.value=!1,k("changeHotSort",t)))};return(t,c)=>{const P=F,f=x,E=B;return o(),n("div",{class:h(e.homePage?"hot_article":"hot_article detailPage")},[a("div",z,[G,a("div",J,[a("span",{class:h(s.value?"":"sortActive"),onClick:c[0]||(c[0]=l=>u(!1))},"\u70ED\u95E8\u63A8\u8350",2),a("span",{class:h(s.value?"sortActive":""),onClick:c[1]||(c[1]=l=>u(!0))},"\u6700\u65B0\u53D1\u5E03",2)])]),a("div",M,[H((o(),N(P,{height:e.homePage?210:100,class:"searchLoading",key:Date.now(),top:e.homePage?-145:-205},null,8,["height","top"])),[[V,e.hotArticleLoading]]),e.hotArticleLoading?_("",!0):(o(),n(d,{key:0},[!e.data.length&&e.skeleton?(o(),n(d,{key:0},g(10,l=>i(E,{key:l,animated:""},{template:A(()=>[i(f,{class:"items",style:{width:"82%"}}),i(f,{class:"items",style:{width:"15%"}})]),_:2},1024)),64)):_("",!0)],64)),e.data.length?(o(!0),n(d,{key:1},g(e.data,(l,T)=>(o(),n("li",{onClick:ae=>{var p;return r((p=l.artId)!=null?p:"")},key:l.artId},[a("div",K,[a("div",O,[a("span",null,m(T+1),1)]),R(" "+m(l.artTitle),1)]),e.homePage?(o(),n("p",Q,m(b(j)(l.artDate)),1)):_("",!0)],8,U))),128)):_("",!0)])],2)}}});const oe=$(W,[["__scopeId","data-v-e15ae0f2"]]),X=e=>(w("data-v-a20c0a8e"),e=e(),I(),e),Y=X(()=>a("div",{class:"top"},[a("div",{class:"title"},"\u5206\u7C7B\u6807\u7B7E")],-1)),Z={class:"item"},ee=["onClick"],te=S({__name:"index",props:{data:{default:()=>[]},sticky:{type:Boolean,default:!0},skeleton:{type:Boolean,default:!0},homePage:{type:Boolean,default:!0}},setup(e){const k=C(),v=s=>{k.push(`/tags?key=${s}`)};return(s,y)=>{const r=x,u=B;return o(),n("div",{class:h(e.homePage?e.sticky?"tags_article isSticky ":"tags_article ":"tags_article detailPage")},[Y,a("div",Z,[!e.data.length&&e.skeleton?(o(),n(d,{key:0},g(8,t=>i(u,{key:t,animated:""},{template:A(()=>[i(r,{class:"items",style:{width:"45%"}}),i(r,{class:"items",style:{width:"45%"}})]),_:2},1024)),64)):(o(!0),n(d,{key:1},g(e.data,t=>(o(),n("li",{onClick:c=>v(t.name),key:t.tagId},m(t.name),9,ee))),128))])],2)}}});const ne=$(te,[["__scopeId","data-v-a20c0a8e"]]);export{oe as H,ne as T};