const a=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}};a();class l{constructor(){this.setParams(),this.bind()}setParams(){const s=document.querySelector(".strings-wrap").getAttribute("data-strings");this.pushElement(s),this.cont=[],this.stringsArray=document.querySelectorAll(".string"),this.stringsArray.forEach((t,n)=>{let e={rate:0,posTg2:{x:0,y:0},posTg1:{x:0,y:0},posNow:{x:0,y:0},el:t,scale:1,isStart:!1};this.reset(e,n*.3,n),this.cont.push(e)})}pushElement(s){const t=s.split(""),n=document.querySelector(".strings-wrap");t.forEach(e=>{const r=document.createElement("div");r.textContent=e,r.classList.add("string"),n.appendChild(r)})}reset(s,t,n){let e=window.innerWidth,r=window.innerHeight;s.rate=0,s.posNow.x=this.random(e*.25,e*.75),s.posNow.y=-r*.25,s.posTg2.x=e*.5+e*.03*(n-6.5),s.posTg2.y=r*.5;let o=1;s.posTg1.x=s.posNow.x+this.random(-e*o,e*o),s.posTg1.y=this.random(r*.4,r*.6),s.scale=this.random(.8,1),TweenMax.killTweensOf(s),TweenMax.to(s,1,{rate:1,ease:Power3.easeOut,delay:t})}update(){this.cont.forEach(t=>{if(t.rate>0){let n=t.posTg1.x*(1-t.rate)+t.posTg2.x*t.rate,e=t.posTg1.y*(1-t.rate)+t.posTg2.y*t.rate;t.posNow.x+=(n-t.posNow.x)*.08,t.posNow.y+=(e-t.posNow.y)*.08}TweenMax.set(t.el,{x:t.posNow.x,y:t.posNow.y,scale:t.scale})}),window.requestAnimationFrame(this.update.bind(this))}random(s,t){return Math.random()*(t-s)+s}bind(){window.requestAnimationFrame(this.update.bind(this))}}window.addEventListener("DOMContentLoaded",()=>{new l});