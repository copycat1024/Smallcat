var EDIT_V = {};
var EDIT = {};

EDIT_V.init = function(){
	this.last = "";

	// Setup add cells at footer
	this._make_footer(EDIT_M.meta.keys);

	// Setup body input cells
	_.each(TABLE_V.body, e => e.click(EDIT_C.handler.input_start).bind("blur", EDIT_C.handler.input_end));

	// Setup delete button
	_.each(TABLE_V.remove, e => e.text("X").click(EDIT_C.handler.remove));

};

EDIT_V._make_footer = function(keys){
	var r = DOM("tfoot").add("tr");
	for (i=0; i<keys.length; i++){
		r.add("td")
		.id("add_"+i)
		.click(EDIT_C.handler.input_start)
		.bind("blur", EDIT_C.handler.input_end);
	}
	r.add("td")
	.cls("pad")
	.text("Add")
	.id("add_btn")
	.click(EDIT_C.handler.add);
};

EDIT_V._make_row = (row, pk) => {
	var r = DOM("tbody").add("tr");
	for (i=0; i<row.length; i++){
		var val = "";
		r.add("td")
		.text(row[i])
		.id("bd_"+pk+"_"+i)
		.click(EDIT_C.handler.input_start)
		.bind("blur", EDIT_C.handler.input_end);

	}
	r.add("td")
	.text("X")
	.cls("pad")
	.id("rm_"+pk)
	.click(EDIT_C.handler.remove);
};