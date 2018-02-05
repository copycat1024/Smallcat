/* --- Sample use
requestREST("GET", "/course", {}, function(request){
	alert(request.responseText);
});
*/

function requestREST(method, url, data, callback){
	var request = new XMLHttpRequest();
	request.open(method, url, true);
	request.setRequestHeader("X-CSRFToken", readCookie("csrftoken"));
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			callback(request);
		}
	};
	request.send(JSON.stringify(data));
}
 
function readCookie(name) {
	var nameEQ = encodeURIComponent(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}