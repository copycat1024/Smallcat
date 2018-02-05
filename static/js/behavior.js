function showEditTable(num){
	requestREST("GET", "/"+objMC.tables[num].name+"/", {}, function(request){
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
	top_ele.innerHTML = "";

	var m = "";
	objMC.tables.forEach((t,i) => {
		m += wrap("li", up1(t.name), "onclick='showTable("+i+");'");
	});
	main_ele.innerHTML = "<p>Table list:</p>" + wrap("ul", m);
}