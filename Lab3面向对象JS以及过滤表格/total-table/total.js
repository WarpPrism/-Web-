window.onload = function() {
	var tables = getAllTables();
	makeFilterable(makeSortable(tables));
}

function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
}

function makeSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var ths = tables[i].getElementsByTagName("th");
		theadClick(ths.length, ths, tables[i]);
	}
	return tables;
}
// 单击表头发生的事件

function theadClick(length, ths, table) {
	for (var j = 0; j < length; j++) {
		//通过闭包为子函数传入参数
		ths[j].onclick = function(j, length, ths, table) {
			return function() {
				//通过类名来控制不同的排序状态
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
//升序函数 curcol代表当前列，即需要排序的列

function ascend(curcol, table) {
	var body = table.getElementsByTagName("tbody");
	var bodyrow = body[0].getElementsByTagName("tr");
	var cells = new Array();
	for (var i = 0; i < bodyrow.length; i++) {
		var tds = bodyrow[i].getElementsByTagName("td");
		cells[i] = tds[curcol];
		//alert(cells[i].innerHTML);
	}
	//选择排序
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
//降序函数 curcol代表当前列，即需要排序的列

function descend(curcol, table) {
	var body = table.getElementsByTagName("tbody");
	var bodyrow = body[0].getElementsByTagName("tr");
	var cells = new Array();
	for (var i = 0; i < bodyrow.length; i++) {
		var tds = bodyrow[i].getElementsByTagName("td");
		cells[i] = tds[curcol];
		//alert(cells[i].innerHTML);
	}
	//选择排序
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
//实现行交换的函数

function swapRow(a, b, table) {
	var rows = table.getElementsByTagName("tr");
	var temp;
	temp = rows[a].innerHTML;
	rows[a].innerHTML = rows[b].innerHTML;
	rows[b].innerHTML = temp;
}


function makeFilterable(tables) {
	for (var i in tables) {
		if (!isNaN(i)) {
			var input = document.createElement("input");
			tables[i].parentNode.insertBefore(input, tables[i]);
			addEventHandler(input, tables[i]);
		}
	}
	return tables;
}
function addEventHandler(input, table) {
	input.oninput = function() {
		var value = input.value;
		textMatch(table, value);
	}
}
function textMatch(table, value) {
	var trs = table.getElementsByTagName("tr");
	for (var i in trs) {
		if (!isNaN(i) && i != 0) {
			var tds = trs[i].getElementsByTagName("td");
			var matched = false;
			for (var j in tds) {
				if (!isNaN(j)) {
					clearHighlight(tds[j]);
					if (tds[j].innerHTML.indexOf(value) != -1) {
						matched = true;
						Highlight(value, tds[j]);
					}
				}
			}
			if (matched == true) {
				trs[i].style.display = "table-row";
			} else {
				trs[i].style.display = "none";
			}
		}
	}
}
function Highlight(value, td) {
	var innerHTML = td.innerHTML;
	var index = td.innerHTML.indexOf(value);
	td.innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>"
	            + innerHTML.substring(index, index + value.length) + "</span>"
	            + innerHTML.substring(index + value.length, innerHTML.length);
}

function clearHighlight(td) {
	var clearString = td.innerHTML.replace(/<[^>]+>/g, "");
	td.innerHTML = clearString;
}
