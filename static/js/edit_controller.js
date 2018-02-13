var EDIT_C = {"handler":{}};

EDIT_C.enable = function(){
	EDIT_C.last = "";

	EDIT_M.init();
	EDIT_V.init();
}

EDIT_C.cancel = () => {
	MAIN.showTable(TABLE_V.k);
};

EDIT_C.save = () => {
	EDIT_R.send(EDIT_M.reduce());
}

EDIT_C.handler.input_start = e => {
	EDIT_C.last = e.text();
	e.editable(true).focus();
};

EDIT_C.handler.input_end = e => {
	e.editable(false);
	if (EDIT_C.last != e.text() && EDIT_C.parse(e.id()).type == "body"){
		var p = EDIT_C.parse(e.id());
		EDIT_M.edit(p.id, p.col, EDIT_C.last, e.text());
	}
}

EDIT_C.handler.add = e => {
	clean = str => str.substring(0, str.length - 4);

	key = clean(DOM("add_"+EDIT_M.meta.pk).text());
	if (key == ""){
		alert("Empty primary key.");
	} else {
		var row = [];
		for (i=0; i<EDIT_M.meta.keys.length; i++){
			row.push(clean(DOM("add_"+i).text()));
			DOM("add_"+i).text("");
		}
		EDIT_V._make_row(row, key);
		EDIT_M.add(row, key);
	}
};

EDIT_C.handler.remove = e => {
	EDIT_M.remove(EDIT_C.parse(e.id()).id);
	e.parent().remove();
};

EDIT_C.parse = id => {
	let l = id.split("_");
	if (l[0] == "bd"){
		return {
			type : "body",
			id   : l[1],
			col  : l[2],
		};
	} else if (l[0] == "add"){
		return {
			type : "add",
			col  : l[1],
		};
	} else if (l[0] == "rm"){
		return {
			type : "remove",
			id   : l[1],
		};
	}
}