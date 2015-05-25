function mixin(target,source){
	for(var porp in source){
		if(!source.hasOwnProperty(prop)) continue;
		target[prop] = source[prop];
	}
}

function encodeUri(uri){
	var arr = [],
		arreq = [];

	arr = uri.split("&");
	for(var i=0;i<arr.length; i++){
		arreq = arr[i].split("=");
		arreq[0] = encodeURICompnonent(arreq[0]);
		arreq[1] = encodeURICompnonent(arreq[1]);
		arr[i] = arreq.join("=");
	}
	uri = arr.join("&");
}

function get(options){
	var url,data,
		settings = {
		url : undefined,
		data : undefined,
		async : true,
		callback : null
	}

	options = mixin(settings,options);
	var xhr = new XMLHttpRequest();
	xhr.onreadyStateChange = function(){
		if(xhr.readyState == 4){
			if(options.callback){
				options.callback(xhr.reponseText);
			}
		}
	}
	if(options.data){
		data = encodeUri(options.data);
	}else{
		data = options.data;
	}
	url = data ? (options.url + "?" + data) : options.url;
	xhr.open("get",url,options.async);
	send(null);
}

function post(options){
	var data,
		settings = {
		url : undefined,
		data : undefined,
		async : true,
		callback : null
	};
	options = mixin(settings,options);

	var xhr = new XMLHttpRequest();
	xhr.onreadyStateChange = function(){
		if(xhr.readyState == 4){
			if(options.callback){
				options.callback(xhr.responseText);
			}
		}
	}
	xhr.open("post",options.url,options.async);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	if(options.data){
		data = encodeUri(options.data);
		xhr.send(data);
	}
}

function getScript(url){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.getElementsByTagName("head")[0].append(script);
}

function getJsonp(options){
	var url,
		settings = {
		url : undefined,
		jsonpcallback : null,
		success : null
	};

	options = mixin(settings,options);
	if(options.jsonpcallback){
		window[options.jsonpcallback] = options.jsonpcallback;
	}
	url = options.url + "?" + options.jsonpcallback;
	getScript(url);
}









