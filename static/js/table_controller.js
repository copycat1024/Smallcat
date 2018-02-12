var TABLE_C = {};

TABLE_C.init = url => {
	return REST.get(url)
	.then(data => TABLE_M._init(data));
};

TABLE_C.showTable = k => {
	if (TABLE_M[k].loaded){
		TABLE_V.show(k);
	} else {
		TABLE_C._loadTable(k)
		.then(k => TABLE_V.show(k));
	}
}

TABLE_C._loadTable = k => {
	var q = new RESTQ();
	q.add("meta", REST.options(TABLE_M[k].url));
	q.add("data", REST.get(TABLE_M[k].url));
	return q.run().then(data => TABLE_M[k].load(data))
}