objMain = {
	"url"    : "http://localhost:8000/",
	"tables" : [],
};

function main(){
	main_ele = gebi("main");
	top_ele = gebi("top");
	REST.request("GET", objMain.url, "")
	.then(xhr => {
		data = JSON.parse(xhr.responseText);
		_.each(_.keys(data), k => objMain.tables.push({"name":k, "url":data.k}));
		showList();
	}, xhr => {
		console.log("REST error: " + t.toString());
	});
}

window.onload = () => main();

