MAIN = {
	"url"    : "http://localhost:8000/",
	"tables" : {},
};

// Fill the table list with received data
MAIN.fillTables = function(data){
	
}

MAIN.errorREST = xhr => console.log("REST error!");

MAIN.loadTableList = () => REST.get(MAIN.url).then(data =>
	_.mapObject(data, (v,k) => MAIN.tables[k] = {"url":v})
);

function main(){
	MAIN.loadTableList().then(data => {
		showList();
	});
}

window.onload = () => main();

