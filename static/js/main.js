MAIN = {
	"url"    : "http://localhost:8000/",
};

MAIN.init = () => 
	TABLE_C.init(MAIN.url)
	.then(MAIN.showList);


MAIN.showList = function(){
	DOM("top").clear();

	DOM("main").clear();
	DOM("main").add("p").text("Table list:");

	_.each(TABLE_M._list, k => 
		DOM("main").add("li").text(up1(k)).click(e =>
			MAIN.showTable(k)
		)
	);
}

MAIN.showTable = function(k){
	var t = DOM("top").clear();
	t.add("button").text("Back").click(MAIN.showList);
	t.add("button").text("Edit").click(MAIN.enableEdit);

	TABLE_C.showTable(k);
}

MAIN.enableEdit = function(){
	var t = DOM("top").clear();
	t.add("button").text("Save").click(EDIT_C.save);
	t.add("button").text("Cancel").click(EDIT_C.cancel);

	EDIT_C.enable();
}

window.onload = () => MAIN.init();

