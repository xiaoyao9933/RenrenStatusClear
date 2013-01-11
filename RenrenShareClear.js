var DiagTip;
var taskcount;
var FrameDiag;
var MainDiag;
var GetShareList=function(dom){
	x=dom.getElementsByClassName("share-itembox");
	var list=[];
	for (var j=0;j<x.length;j++)
	{
		list.push(parseInt(x[j].id.substr(6,20)));
	}
	return list
}
var delShare=function(id,userid)
{
new XN.net.xmlhttp({
				url : "http://share.renren.com/share/EditShare.do",
                		method : 'post',
				data:XN.array.toQueryString({'action':'del',
				      'sid':id,
				      'type':userid})
		
});
}


var SharePageClear=function(){
new XN.net.xmlhttp({
				url : "http://share.renren.com/share/"+XN.user.id+"?__view=async-html-reload",
                		method : 'get',
				onSuccess:function(r){
					tmpEle=document.createElement('renrenshare');
					tmpEle.innerHTML=r.response;
					list=GetShareList(tmpEle);
					for(var x=0;x<list.length;x++)delShare(list[x],XN.user.id)
					if (list.length!=0){SharePageClear();}
					else {taskcount=taskcount-1;if(taskcount==0){DiagTip.hide();XN.DO.alert("任务已完成");}}
					}
});};

delDoing=function(id){
	new XN.NET.xmlhttp({url:"http://status."+XN.env.domain+"/doing/deleteDoing.do",data:"id="+id})};

DoingPageClear=function (){
		var p = {
			userId : XN.user.id,//XN.user.id
			curpage : 0 || 0
		};
		new XN.net.xmlhttp({
				url : "http://status.renren.com/GetSomeomeDoingList.do",
				data : XN.array.toQueryString(p),
                		method : 'get',
				onSuccess:function(r){
					result=XN.JSON.parse(r.response).doingArray;
					for(var x=0;x<result.length;x++){
						delDoing(result[x].id);
						}
					if(result.length!=0){					
						DoingPageClear();
						}
					else{taskcount=taskcount-1;if(taskcount==0){DiagTip.hide();XN.DO.alert("任务已完成");}}
					}
		   });
};

var MainFunc=function()
{	taskcount=0;
	states=[];
	tmp=FrameDiag.getElementsByTagName("input");
	states.push(tmp[0].checked);
	states.push(tmp[1].checked);
	for(var p=0;p<states.length;p++){if(states[p]==true){taskcount=taskcount+1;}}
	if(taskcount==0){XN.DO.alert("你妹，你一个都没选啊！")}
	else{
	XN.DO.confirm({message:"你确定删除所有分享？该操作不可恢复，请慎重！！",callBack:function(r){
	if(r){
		DiagTip=XN.DO.alert("请稍等.....正在清除中");
		if(states[0]){DoingPageClear();};
		if(states[1]){SharePageClear();};
		}
	}});}
}

var PopClear=function(){
	MainDiag=XN.DO.alert("");
	FrameDiag=MainDiag.frame;
	var tmp=FrameDiag.getElementsByClassName("pop_content")[0];
	tmp=tmp.getElementsByTagName("span")[0];
	tmp.innerHTML="<span>人人清空器</span>"
	tmp=FrameDiag.getElementsByClassName("dialog_body")[0];
	tmp=tmp.appendHTML('<br>请勾选待清除的选项：</br><br><input type="checkbox" id="cstatus">状态</br><br><input type="checkbox" id="cshares">分享</br>');
	tmp=FrameDiag.getElementsByClassName("dialog_buttons")[0];
	tmp.innerHTML='<input type="button" class=" input-submit" value="确定" dialog="1" onclick="MainFunc()"><br></br><br>This tool is developed by <a href="http://chao.lu" >xiaoyao9933</a>  <a href="http://http://www.renren.com/248202869" >朝鲁</a></br>';
}


