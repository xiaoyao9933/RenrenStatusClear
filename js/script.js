setTimeout(function(){
var htm=document.getElementsByClassName("nav-main")[0]
var t=htm.innerHTML
t=t+'<div class="menu"><div class="menu-title"><a accesskey="5" ui-async="async" id="cleardoing" onclick="goclear()"><span class="menu-title-text">清空</span></a></div></div>'
htm.innerHTML=t
var inserted='var del=function(id){new XN.NET.xmlhttp({url:"http://status."+XN.env.domain+"/doing/deleteDoing.do",data:"id="+id})};var ClearDoing=function (){var p = {userId : XN.user.id,/*XN.user.id*/ curpage : 0 || 0};new XN.net.xmlhttp({url : "http://status.renren.com/GetSomeomeDoingList.do",data : XN.array.toQueryString(p),method : "get",onSuccess:function(r){result=XN.JSON.parse(r.response).doingArray;for(var x=0;x<result.length;x++){del(result[x].id);}if(result.length!=0){ClearDoing();}else{XN.DO.alert("状态已经被清空 ~Have fun!");}}});};var goclear=function(){ XN.DO.confirm({message:"你确定删除所有状态？该操作不可恢复，请慎重！！        This plugin is powered by xiaoyao9933",callBack:function(r){if(r){ClearDoing()}}});}'
var head=document.getElementsByTagName("head")[0];
var x=document.createElement("script");
x.type="text/javascript";
x.innerText=inserted;
head.appendChild(x);
},1000);


