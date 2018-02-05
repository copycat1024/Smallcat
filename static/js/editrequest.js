function sendEditRequest(addList, editList){
	var updateList = [];
	var deleteList = [];

	Object.keys(editList).forEach(function(k){
		if (editList[k] == "update"){
			updateList.push(k);
		} else if (editList[k] == "delete") {
			deleteList.push(k);			
		}
	});

	var c = 0;
	var d = 0;
	var r = {};

	if (addList.length > 0) d++;
	if (updateList.length > 0) d++;
	if (deleteList.length > 0) d++;

	if (d == 0) finishRequest(r);

	sendAddRequest(addList, res => {
		dw(res);
		c++;
		r["add"] = res;
		if (c == d) finishRequest(r);
	});

	sendUpdateRequest(updateList, res => {
		dw(res);
		c++;
		r["update"] = res;
		if (c == d) finishRequest(r);
	});

	sendDeleteRequest(deleteList, res => {
		dw(res);
		c++;
		r["delete"] = res;
		if (c == d) finishRequest(r);
	});
}

function sendAddRequest(addList, callback){
	var count = addList.length;
	var done = 0;
	var response = {};
	addList.forEach(pk => {
		var data = collectAddInput("add", pk);
		if (objET.setPK){
			data["pk"] = data[objET.setPK];
		}
		requestREST("POST", objET.url, data, request => {
			dw(objET.url);
			dw(request.responseText);
			response[pk] = JSON.parse(request.responseText);
			done++;
			if (done == count){
				var res = {};
				Object.keys(response).filter(k=>!(response[k].pk)).forEach(k=>res[k]=response[k]);
				callback(res);
			}
		});
	});
}

function sendDeleteRequest(deleteList, callback){
	var count = deleteList.length;
	var done = 0;
	var response = {};
	deleteList.forEach(pk => {
		requestREST("DELETE", objET.url+pk+"/", {}, request => {
			response[pk] = request.responseText;
			done++;
			if (done == count) callback(response);
		});
	});
}

function sendUpdateRequest(updateList, callback){
	var count = updateList.length;
	var done = 0;
	var response = {};
	updateList.forEach(pk => {
		var data = collectUpdateInput("item", pk);
		if (objET.setPK){
			data["pk"] = data[objET.setPK];
		}
		requestREST("PUT", objET.url+pk+"/", data, request => {
			response[pk] = JSON.parse(request.responseText);
			done++;
			if (done == count){
				var res = {};
				Object.keys(response).filter(k=>!(response[k].pk)).forEach(k=>res[k]=response[k]);
				callback(res);
			}
		});
	});
}

function collectAddInput(type, pk){
	var data = {};
	objET.keys.forEach(k => {data[k] = gife(type+"_"+k+"_"+pk)});
	objET.linkKeys.forEach(k => {data[k] = "http://localhost:8000/"+k+"/"+data[k]+"/"});
	return data;
}

function collectUpdateInput(type, pk){
	var data = {};
	objET.keys.forEach(k => {data[k] = gebi(type+"_"+k+"_"+pk).innerText});
	objET.linkKeys.forEach(k => {data[k] = "http://localhost:8000/"+k+"/"+data[k]+"/"});
	return data;
}

function finishRequest(res){
	dw(res);
	showTable(objET.num);
}