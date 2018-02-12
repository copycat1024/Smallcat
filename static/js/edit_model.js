var EDIT_M = {};

EDIT_M.init = function(){
	this.meta = TABLE_M[TABLE_V.k].meta;
	this.queue = [];
}

EDIT_M.edit = function(id, col, old_txt, new_txt){
	this.queue.push({
		"type" : "edit",
		"id"   : id,
		"col"  : col,
		"old"  : old_txt,
		"new"  : new_txt,
	});
}

EDIT_M.remove = function(id){
	this.queue.push({
		"type" : "remove",
		"id"   : id,
	});
}

EDIT_M.add = function(row, id){
	this.queue.push({
		"type" : "add",
		"id"   : id,
		"row"  : row,
	});
}

EDIT_M.reduce = function(){
	var d = {};
	_.each(EDIT_M.queue, q => {
		if (d[q.id] == null){
			d[q.id] = q.type;
		} else if (q.type == "add") {
			let org = d[q.id];
			d[q.id] = "add";
			if (org == "remove-edit") d[q.id] = "edit";
			if (org == "remove") d[q.id] = "edit";
		} else if (q.type == "remove") {
			if (d[q.id] == "add")  d[q.id] = "remove-add";
			if (d[q.id] == "edit") d[q.id] = "remove-edit";
		}
	});
	return d;
}