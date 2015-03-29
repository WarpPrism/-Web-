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
			clickButtons(buttons);
		}
	}(buttons, start);
}

function clickButtons(buttons) {
	for (var i = 0; i < buttons.length; i++) {
		var adder = buttons[i].getElementsByTagName("span");
		adder[0].style.display = "block";
		adder[0].innerHTML = "...";
		httpRequest(adder[0], buttons, i);
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
	sum += parseInt(result);
	adder.innerHTML = result;
	for (var i = 0; i < buttons.length; i++) {
		if (i == current) {
			buttons[i].style.background = "gray";
		}
	}
	if (allIsReady(buttons)) {
		clickSum(sum);
		disableStart();
		return;
	}
}

function allIsReady(buttons) {
	for (var i = 0; i < buttons.length; i++) {
		var adder = buttons[i].getElementsByTagName("span");
		if (adder[0].innerHTML == "...") {
			return false;
		}
	}
	return true;
}

function clickSum(sum) {
	var Sum = document.getElementById("sum");
	Sum.innerHTML = sum;
}

function disableStart() {
	var start = document.getElementById("start");
	start.innerHTML = "Completed!";
	start.onclick = function() {
		return;
	};
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
	var start = document.getElementById("start");
	start.onclick = function(buttons, start) {
		return function() {
			start.innerHTML = "Running!";
			clickButtons(buttons);
		}
	}(buttons, start);
	alert("All reseted!");
}