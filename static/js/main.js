MAIN = {
	"url"    : "http://localhost:8000/",
	"tables" : [],
};

MAIN.fillTable = function(data){
	_.each(_.keys(data), k => this.tables.push({"name":k, "url":data[k]}));
}

function main(){
	REST.request("GET", MAIN.url, "")
	.then(data => {
		MAIN.fillTable(data);
		showList();
	})
	.catch(xhr => console.log("REST error!"));
}

window.onload = () => main();

