window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var ths = tables[i].getElementsByTagName("th");
		theadClick(ths.length, ths, tables[i]);
	}
}

function theadClick(length, ths, table) {
	for (var j = 0; j < length; j++) {
		ths[j].onclick = function(j, length, ths, table) {
			return function() {
				if (this.className == "descend" || this.className == "") {
					for (var k = 0; k < length; k++) {
						if (k != j) {
							ths[k].className = "";
						}
					}
					this.className = "ascend";
					ascend(j, table);
				} else if (this.className == "ascend") {
					for (var k = 0; k < length; k++) {
						if (k != j) {
							ths[k].className = "";
						}
					}
					this.className = "descend";
					descend(j, table);
				}
			}
		}(j, length, ths, table);
	}
}

function ascend(curcol, table) {
	var body = table.getElementsByTagName("tbody");
	var bodyrow = body[0].getElementsByTagName("tr");
	var cells = new Array();
	for (var i = 0; i < bodyrow.length; i++) {
		var tds = bodyrow[i].getElementsByTagName("td");
		cells[i] = tds[curcol];
		//alert(cells[i].innerHTML);
	}
	for (var i = 0; i < cells.length; i++) {
		var min = cells[i].innerHTML;
		var index = i;
		var temp = 0;
		for (var j = i; j < cells.length; j++) {
			if (cells[j].innerHTML < min) {
				min = cells[j].innerHTML;
				index = j;
			}
		}
		temp = cells[i];
		cells[i] = cells[index];
		cells[index] = temp;
		swapRow(i + 1, index + 1, table);
	}
}

function descend(curcol, table) {
	var body = table.getElementsByTagName("tbody");
	var bodyrow = body[0].getElementsByTagName("tr");
	var cells = new Array();
	for (var i = 0; i < bodyrow.length; i++) {
		var tds = bodyrow[i].getElementsByTagName("td");
		cells[i] = tds[curcol];
		//alert(cells[i].innerHTML);
	}
	for (var i = 0; i < cells.length; i++) {
		var max = cells[i].innerHTML;
		var index = i;
		var temp = 0;
		for (var j = i; j < cells.length; j++) {
			if (cells[j].innerHTML > max) {
				max = cells[j].innerHTML;
				index = j;
			}
		}
		temp = cells[i];
		cells[i] = cells[index];
		cells[index] = temp;
		swapRow(i + 1, index + 1, table);
	}
}

function swapRow(a, b, table) {
	var rows = table.getElementsByTagName("tr");
	var temp;
	temp = rows[a].innerHTML;
	rows[a].innerHTML = rows[b].innerHTML;
	rows[b].innerHTML = temp;
}