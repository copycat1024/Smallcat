// object for edit table
var objET;

function makeEditTable(data, table, num){	
	initEditTable(data, table, num);

	top_ele.innerHTML = "<button class='btn_save'>Save</button>";
	
	main_ele.innerHTML = frameTable;
	var thead = gebi("thead");
	var tbody = gebi("tbody");
	var tfoot = gebi("tfoot");
	thead.innerHTML = makeEditHeader();
	tbody.innerHTML = makeEditBody(data);
	tfoot.innerHTML = makeEditFooter();

	bindEditTable();
}

function bindEditTable(){
	betc("td_input", "click", bind_td_input);
	betc("td_delete", "click", bind_td_delete);
	betc("td_add", "click", bind_td_add);
	betc("btn_save", "click", bind_btn_save);
}

function initEditTable(data, table, num){
	objET = {};
	
	var keys = Object.keys(data[0]);
	rmpk(keys);
	objET.keys = keys;

	objET.linkKeys = [];
	keys.forEach(k => {
		if (data[0][k].slice(0,4)=="http"){
			objET.linkKeys.push(k);
		}
	});

	objET.editList = {};
	data.forEach(function(k){
		objET.editList[k.pk] = "none";
	});
	objET.addList = [];
	objET.addNum = 0;

	objET.url = objMC.url+table.name+"/";
	objET.setPK = table.pk;
	objET.num = num;
}

function editEditList(pk, cmd){
	if (cmd == "update"){
		if (objET.editList[pk] == "none"){
			objET.editList[pk] = "update";
		}
	} else if (cmd == "delete"){
		objET.editList[pk] = "delete";
	}
}

function makeEditHeader(){
	var hr = "";
	objET.keys.forEach(function(k){
		hr += wrap("td", up1(k), "id='hdr_"+k+"'");
	});
	hr += "<td class='td_pad'></td>";
	return wrap("tr", hr);
}

function makeEditBody(data){
	var bd = "";
	data.forEach(function(row){
		var bdr = "";
		objET.keys.forEach(function(k){
			bdr += wrap("td", row[k], "class='td_input' id='item_"+k+"_"+row["pk"]+"'");
		});
		bdr += "<td class='td_delete' id='td_delete_"+row["pk"]+"'>x</td>";
		bd += wrap("tr", bdr);
	});
	return bd;
}

function makeEditFooter(){
	var ft = "";
	objET.keys.forEach(function(k){
		ft += wrap("td", "", "class='td_input' id='add_"+k+"_"+objET.addNum+"'");
	});
	ft += "<td class='td_add' id='td_add_"+objET.addNum+"'>Add</td>";
	return wrap("tr", ft);
}

function bind_td_input(event){
	if (objET.lastEle){
		if (objET.lastVal != objET.lastEle.innerHTML ){
			editEditList(efid(objET.lastEle.id).pk, "update");
		}
		objET.lastEle.contentEditable = false;
	}
	var ele = event.target;
	objET.lastEle = ele;
	objET.lastVal = ele.innerHTML;
	ele.contentEditable = true;
	ele.focus();
}

function bind_td_delete(event){
	var ele = event.target;
	editEditList(efid(ele.id).pk, "delete");
	rme(ele.parentNode);
}

function bind_td_add(event){
	var ele = event.target;
	ele.removeEventListener("click", bind_td_add);
	ele.addEventListener("click", bind_td_add_delete);
	ele.className = "td_add_delete";
	ele.innerHTML = "x"
	objET.addList.push(objET.addNum);
	objET.addNum++;
	gebi("tbody").appendChild(ele.parentNode);
	tfoot.innerHTML = makeEditFooter();
	betc("td_input", "click", bind_td_input);
	betc("td_add", "click", bind_td_add);
}

function bind_td_add_delete(event){
	var ele = event.target;
	objET.addList = objET.addList.filter(item => item != efid(ele.id).pk);
	rme(ele.parentNode);
}

function bind_btn_save(event){
	if (objET.lastEle){
		if (objET.lastVal != objET.lastEle.innerHTML ){
			editEditList(efid(objET.lastEle.id).pk, "update");				
		}
		objET.lastEle.contentEditable = false;
	}
	sendEditRequest(objET.addList, objET.editList);
}