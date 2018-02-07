var _DOM = {"ele" : {}};

_DOM.textEle = (de, txt) => {
	de.ele.innerHTML = txt;
	return de;
}

_DOM.addChild = (de, tag) => {
	var ele = document.createElement(tag);
	de.ele.appendChild(ele);
	return new _de(ele);
}

_DOM.setAttribute = (de, name, value) => {
	de.ele.setAttribute(name, value);
	return de;
}

_DOM.bindEventListener = (de, type, listener) => {
	de.ele.addEventListener(type, listener);
	return de;
}

_DOM.gebi = function(id){
	return new _de(document.getElementById(id));
}

// DOM element
function _de(ele){
	this.ele = ele;
	this.id  = ele.id;
	this.clear = () => _DOM.textEle(this, "");
	this.text = txt => _DOM.textEle(this, txt);
	this.add  = tag => _DOM.addChild(this, tag);
	this.sid  = val => _DOM.setAttribute(this, "id", val);
	this.scl  = val => _DOM.setAttribute(this, "class", val);
	this.attr = (n,v) => _DOM.setAttribute(this, n, v);
	this.bind = (t,l) => _DOM.bindEventListener(this, t, l);
	this.click = l    => _DOM.bindEventListener(this, "click", l);
}

function DOM(id){
	if (_DOM.ele[id]==null){
		_DOM.ele[id] = _DOM.gebi(id);
	}
	return _DOM.ele[id];
}

