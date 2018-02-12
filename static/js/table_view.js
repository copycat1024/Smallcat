var TABLE_V = {};

TABLE_V.show = function (k){
	var t = DOM("main").clear().add("table");
	_.each(["thead", "tbody", "tfoot"], s => t.add(s).id(s));
	this._make_header(TABLE_M[k].meta.keys);
	this._make_body(TABLE_M[k].data, TABLE_M[k].meta);
	this.k = k;
}

TABLE_V._make_header = function(keys){
	var r = DOM("thead").add("tr");
	this.header = [];
	for (i=0; i<keys.length; i++){
		this.header.push(r.add("td")
		.text(up1(keys[i]))
		.id("hd_"+i));
	}
	r.add("td").cls("pad");
}

TABLE_V._make_row = function(row, pk){
	var r = DOM("tbody").add("tr");
	for (i=0; i<row.length; i++){
		var val = "";
		this.body.push(r.add("td")
		.text(row[i])
		.id("bd_"+pk+"_"+i));
	}
	this.remove.push(r.add("td")
	.cls("pad")
	.id("rm_"+pk));
}

TABLE_V._make_body = function(data, meta){
	this.body = [];
	this.remove = [];
	_.each(data, row => this._make_row(row, row[meta.pk]));
}