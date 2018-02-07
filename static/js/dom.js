// DOM element's id
var objDEI = {
	"newEle" : ele => {
		
	},
}

function dei(id){
	this.ele = document.getElementById(id);
	this.clear = () => {this.ele.innerHTML = "";};
	this.add = () => 
}

var objDOM = {
	"ele" : {},
};

function DOM(id){
	if (objDOM.ele[id]==null){
		objDOM.ele[id] = new dei(id);
	}
	return objDOM.ele[id];
}

