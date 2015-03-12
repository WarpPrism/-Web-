//窗口加载时所发生的事件
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}
//获取文档中所有的表格对象
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
