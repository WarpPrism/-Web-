var sum = 0;
var order = new Array(5);
var arrindex = 0;

window.onload = function() {
	var controlRing = document.getElementById("control-ring");
	var buttons = controlRing.getElementsByTagName("li");
	var start = document.getElementById("start");
	var reset = document.getElementById("reset");
	robotStart(buttons, start);
	reset.onclick = function() {
		allReset(buttons);
	}
}

function robotStart(buttons, start) {
	start.onclick = function(buttons, start) {
		return function() {
			getOrder();
			start.innerHTML = "Order: ";
			showOrder(start);
			var current = order[arrindex];
			clickButton(buttons[current], buttons, current);
		}
	}(buttons, start);
}

function getOrder() {
	var i = 0;
	do {
		var random = Math.random() * 10;
		var index = 0;
		var repeat = false;
		if (random >= 0 && random <= 2) {
			index = 0;
		} else if (random >= 2 && random <= 4) {
			index = 1;
		} else if (random >= 4 && random <= 6) {
			index = 2;
		} else if (random >= 6 && random <= 8) {
			index = 3;
		} else if (random >= 8 && random <= 10) {
			index = 4;
		}
		for (var k = 0; k < order.length; k++) {
			if (index == order[k]) {
				repeat = true;
				break;
			}
		}
		if (repeat) continue;
		if (order[i] == undefined) {
			order[i] = index;
		}
		i++;
	} while (i < order.length);
}

function showOrder(start) {
	for (var i = 0; i < order.length; i++) {
		if (order[i] == 0) {
			start.innerHTML += "A";
		}
		if (order[i] == 1) {
			start.innerHTML += "B";
		}
		if (order[i] == 2) {
			start.innerHTML += "C";
		}
		if (order[i] == 3) {
			start.innerHTML += "D";
		}
		if (order[i] == 4) {
			start.innerHTML += "E";
		}
	}
}

function clickButton(button, buttons, current) {
	if (button.state == "disable" || button.state == "tempdisable") return;
	for (var k = 0; k < buttons.length; k++) {
		if (k != current && buttons[k].state != "disable") {
			buttons[k].style.background = "gray";
			buttons[k].state = "tempdisable";
		}
		if (k == current) {
			buttons[k].style.background = "#303F9F";
			var adder = buttons[k].getElementsByTagName("span");
			adder[0].style.display = "block";
			adder[0].innerHTML = "...";
			buttons[k].state = "tempdisable";
			httpRequest(adder[0], buttons, current);
		}
	}
}

function httpRequest(adder, buttons, current) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", "./", true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			handleResult(xmlhttp.responseText, adder, buttons, current);
		}
	}
}

function handleResult(result, adder, buttons, current) {
	adder.innerHTML = result;
	sum += parseInt(result);
	for (var i = 0; i < buttons.length; i++) {
		if (i != current && buttons[i].state == "tempdisable") {
			buttons[i].state = "enable";
			buttons[i].style.background = "#303F9F";
		} else if (i == current) {
			buttons[i].state = "disable";
			buttons[i].style.background = "gray";
		}
	}
	if (arrindex == 4) {
		clickSum(sum);
		return;
	}
	if (current < buttons.length) {
		arrindex++;
		var current = order[arrindex];
		clickButton(buttons[current], buttons, current);
	}
}

function clickSum(sum) {
	var Sum = document.getElementById("sum");
	Sum.innerHTML = sum;
	for (var i = 0; i < order.length; i++) {
		order[i] = undefined;
	}
	var start = document.getElementById("start");
	arrindex = 0;
	start.innerHTML = "Completed!";
	start.onclick = function() {
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
	var start = document.getElementById("start");
	start.innerHTML = "RobotStart!";
	var infobar = document.getElementById("info-bar");
	infobar.style.background = "gray";
	var Sum = infobar.getElementsByTagName("span");
	Sum[0].innerHTML = "";
	//disableSum();
	for (var i = 0; i < order.length; i++) {
		order[i] = undefined;
	}
	if (sum != 0) sum = 0;
	arrindex = 0;
	start.onclick = function(buttons, start) {
		return function() {
			getOrder();
			start.innerHTML = "Order: ";
			showOrder(start);
			var current = order[arrindex];
			clickButton(buttons[current], buttons, current);
		}
	}(buttons, start);
	alert("All reseted!");
}