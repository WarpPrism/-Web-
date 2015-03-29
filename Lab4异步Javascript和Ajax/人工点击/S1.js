var sum = 0;
/*var serverbusy = false;*/

window.onload = function() {
	var reset = document.getElementById("tip");
	var controlRing = document.getElementById("control-ring");
	var buttons = controlRing.getElementsByTagName("li");
	clickButtons(buttons);
	reset.onclick = function() {
		allReset(buttons);
	}
}

function clickButtons(buttons) {
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function(buttons, i) {
			return function() {
				if (buttons[i].state == "disable" || buttons[i].state == "tempdisable") return;
				for (var k = 0; k < buttons.length; k++) {
					if (k != i && buttons[k].state != "disable") {
						buttons[k].style.background = "gray";
						buttons[k].state = "tempdisable";
					}
					if (k == i) {
						buttons[k].style.background = "#303F9F";
						var adder = buttons[k].getElementsByTagName("span");
						adder[0].style.display = "block";
						adder[0].innerHTML = "...";
						buttons[k].state = "tempdisable";
						httpRequest(adder[0], buttons, i);
					}
				}
			}
		}(buttons, i);
	}
}

function httpRequest(adder, buttons, i) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", ".\\", true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			handleResult(xmlhttp.responseText, adder, buttons, i);
		}
	}
}

function handleResult(result, adder, buttons, i) {
	adder.innerHTML = result;
	for (var k = 0; k < buttons.length; k++) {
		if (k != i && buttons[k].state == "tempdisable") {
			buttons[k].style.background = "#303F9F";
			buttons[k].state = "enable";
		} else if (k == i) {
			buttons[k].style.background = "gray";
			buttons[k].state = "disable";
		}
	}
	sum += parseInt(result);
	var j = 0;
	do {
		if (buttons[j].state == "disable") {
			j++;
		} else {
			return;
		}
	} while (j < buttons.length);
	enableSum(sum);
}

function enableSum(sum) {
	var infobar = document.getElementById("info-bar");
	infobar.style.background = "#303F9F";
	var Sum = infobar.getElementsByTagName("span");
	Sum[0].innerHTML = "OK";
	infobar.onclick = function() {
		Sum[0].innerHTML = sum;
		infobar.style.background = "gray";
	}
}

function disableSum() {
	sum = 0;
	var infobar = document.getElementById("info-bar");
	infobar.onclick = function() {
		return;
	}
}

function allReset(buttons) {
	for (var i in buttons) {
		if (!isNaN(i)) {
			buttons[i].state = "";
			buttons[i].style.background = "#303F9F";
			var adder = buttons[i].getElementsByTagName("span");
			adder[0].style.display = "none";
		}
	}
	var infobar = document.getElementById("info-bar");
	infobar.style.background = "gray";
	var Sum = infobar.getElementsByTagName("span");
	Sum[0].innerHTML = "";
	disableSum();
	if (sum != 0) sum = 0;
	alert("All reseted!");
}