objMC = {
	"url"    : "http://copycat1024.pythonanywhere.com/",
	"tables" : [
		{
			"name" : "teacher",
			"pk"   : "username",
		},
		{
			"name" : "course",
		},
		
	],
};

function main(){
	showList();
}

var main_ele;
window.onload = function(){
	main_ele = gebi("main");
	top_ele = gebi("top");
	main();
}

