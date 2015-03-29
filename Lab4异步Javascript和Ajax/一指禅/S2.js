var sum = 0;

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
			start.innerHTML = "Running!";
			var current = 0;
			clickButton(buttons[current], buttons, current);
		}
	}(buttons, start);
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
	if (current == 4) {
		clickSum(sum);
		return;
	}
	if (current < buttons.length) {
		current++;
		clickButton(buttons[current], buttons, current);
	}
}

function clickSum(sum) {
	var Sum = document.getElementById("sum");
	Sum.innerHTML = sum;
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
	if (sum != 0) sum = 0;
	alert("All reseted!");
}
