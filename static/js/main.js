objMC = {
	"url"    : "http://localhost:8000/",
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

