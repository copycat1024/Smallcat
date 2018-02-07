function showEditTable(url){
	requestREST("GET", url, {}, function(request){
		var data = JSON.parse(request.responseText);
		makeEditTable(data, objMC.tables[num], num);
	});
}

function showTable(num){
	requestREST("GET", "/"+objMC.tables[num].name+"/", {}, function(request){
		var data = JSON.parse(request.responseText);
		makeTable(data, num);
	});
}

function showList(){
	DOM("top").clear();
	DOM("main").add("p")
	.text("Table list:");

	_.each(MAIN.tables, t => {
		DOM("main").add("li")
		.text(up1(t.name))
		.click(e => showTable(t.url));
	});
}