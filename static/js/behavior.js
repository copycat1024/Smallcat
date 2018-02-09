function showList(){
	DOM("top").clear();

	var m = DOM("main").clear();
	m.add("p").text("Table list:");

	_.mapObject(MAIN.tables, (v,k) => {
		m.add("li")
		.text(up1(k))
		.click(e => showTable(v.url));
	});
}

function showTable(url){
	var t = DOM("top");
	t.add("button").text("Back").click(e => showList());
	t.add("button").text("Edit").click(e => showEditTable());

	var data;
	REST.get(url)
	.then(d => {
		data = d;
		return REST.options(url);
	})
	.then(opt => makeTable(opt, data));
}

function showEditTable(url){

	requestREST("GET", url, {}, function(request){
		var data = JSON.parse(request.responseText);
		makeEditTable(data, objMC.tables[num], num);
	});
}