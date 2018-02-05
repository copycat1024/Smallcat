function makeTable(data, num){
	var keys = Object.keys(data[0]);
	rmpk(keys);

	top_ele.innerHTML = "<button onclick='showList();'>Back</button>";
	top_ele.innerHTML += "<button onclick='showEditTable("+num+");'>Edit</button>";
	
	main_ele.innerHTML = frameTable;
	var thead = gebi("thead");
	var tbody = gebi("tbody");
	var tfoot = gebi("tfoot");
	thead.innerHTML = makeHeader(keys);
	tbody.innerHTML = makeBody(keys, data);
}

function makeHeader(keys){
	var hr = "";
	keys.forEach(function(k){
		hr += wrap("td", up1(k), "id='hdr_"+k+"'");
	});
	hr += "<td class='td_pad'></td>";
	return wrap("tr", hr);	
}

function makeBody(keys, data){
	var bd = "";
	data.forEach(function(row){
		var bdr = "";
		keys.forEach(function(k){
			bdr += wrap("td", row[k]);
		});
		bdr += "<td class='td_pad'></td>";
		bd += wrap("tr", bdr);
	});
	return bd;
}