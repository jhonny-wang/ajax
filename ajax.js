/*浅拷贝*/
function mixin(target,source){
	for(var prop in source){
		//过滤可枚举的继承属性
		if(!source.hasOwnProperty(prop)) continue;
		target[prop] = source[prop];
	}
	return target;
}
/*将查询字符串作为URI组件进行编码*/
function encode(uri){
	var arr = [],
		arreq = [];

	arr = uri.split("&");
	for(var i=0;i<arr.length; i++){
		arreq = arr[i].split("=");
		arreq[0] = encodeURIComponent(arreq[0]);
		arreq[1] = encodeURIComponent(arreq[1]);
		arr[i] = arreq.join("=");
	}
	uri = arr.join("&");

	return uri;
}

function get(options){
	var url,data,
		settings = {
		url : undefined,
		data : null,
		async : true,
		callback : null
	}
	options = mixin(settings,options);
	//创建xhr对象
	var xhr = new XMLHttpRequest();
	//监听xhr状态的变化
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
				if(options.callback){
					options.callback(xhr.responseText);
				}
			}
		}
	}
	if(options.data){
		//对data进行编码
		data = encode(options.data);
	}else{
		data = options.data;
	}
	//防止被请求页面做了缓存设置
	url = data ? (options.url + "?" + data + "&random=" + Math.random())
		: options.url + "?" + "random=" + Math.random();
	xhr.open("get",url,options.async);
	xhr.send(null);
}

function post(options){
	var data,
		settings = {
		url : undefined,
		data : null,
		async : true,
		callback : null
	};
	options = mixin(settings,options);
	//创建xhr对象
	var xhr = new XMLHttpRequest();
	//监听xhr状态的变化
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
				if(options.callback){
					options.callback(xhr.responseText);
				}
			}
		}
	}
	xhr.open("post",options.url,options.async);
	// 用xhr模仿表单提交，将提交内容类型设置为表单提交时的内容类型
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	if(options.data){
		data = encode(options.data);
	}
	xhr.send(data);
}

function getScript(url){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function getJsonp(options){
	var url,
		settings = {
		url : '',
		data : '',
		jsonpcallback : '',
		success : null
	};
	options = mixin(settings,options);

	if(options.jsonpcallback){
		window[options.jsonpcallback] = options.success;
		if(options.data){
			url = options.url + "?" + options.data + "&callback=" + options.jsonpcallback;
		}else{
			url = options.url + "?callback=" + options.jsonpcallback;
		}
	}
	
	getScript(url);
}









