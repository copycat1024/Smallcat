// constants
var frameTable = "<table id=\"maintable\"><thead id=\"thead\"></thead><tbody id=\"tbody\"></tbody><tfoot id=\"tfoot\"></tfoot></table>";

// get element by id
function gebi(id){
	return document.getElementById(id);
}

// get element by classname
function gebc(cls){
	return document.getElementsByClassName(cls);
}

// wrap text by html tag
function wrap(tag, text, attr){
	attr = attr || "";
	return "<"+tag+" "+attr+">"+ekfu(text)+"</"+tag+">";
}

// extract key from url
function ekfu(str){
	if (str.slice(0,4)=="http"){
		var l = str.split("/");
		return l[l.length-2];
	}
	return str;
}

// extract from id
function efid(id){
	var l = id.split("_");
	return {"field":l[1],"pk":l[2]};
}

// uppercase first char
function up1(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// remove primary key
function rmpk(keys){
	keys.splice(keys.indexOf("pk"), 1);
}

// bind event to class
function betc(cls, type, callback){
	l = gebc(cls);
	Object.keys(l).forEach(function(k){
		ele = l[k];
		ele.addEventListener(type, callback);
	});
}

// remove element
function rme(ele){
	ele.parentNode.removeChild(ele);
}

// debug write
function dw(data){
	console.log(JSON.stringify(data));
}

// get input from element
function gife(id){
	var t = gebi(id).innerText;
	return t.slice(0, t.length-1);
}