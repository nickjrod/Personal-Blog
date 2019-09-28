function openNav() {
  document.getElementById("mobile-nav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mobile-nav").style.width = "0%";
}

function addElement(parentId, elementTag, elementId, elementClass, html) {
	// get the parent in which we want to insert a new child
	var p = document.getElementById(parentId);
	console.log(p);
	// create child
	var child = document.createElement(elementTag);
	child.setAttribute('id', elementId);
	child.setAttribute('class', elementClass);
	child.innerHTML = html;
	p.append(child);
}

function removeElement(elementId){
	var element = document.getElementById(elementId);
	element.parentNode.removeChild(element);
}

// Remove Header Image on screen not big enough..
var added = 1;
var elId = "image-container";
var elClass = "top-item";

window.addEventListener("resize", function () {
	var w = window.innerWidth;
	if(w < 900 && added == 1){
		added = 0;
		removeElement(elId);
	} else if(w >= 900 && added == 0){
		console.log("here");
		var phtml = '<img src="photos/nick-header.png" id="header-photo" alt="">'
		addElement('toptile', 'div', elId, elClass, phtml);
		added = 1;
	}
});

