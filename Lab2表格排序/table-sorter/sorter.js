window.onload = function () {
	var tables = getAllTables();
	//alert(tables[0].id);
	makeAllTablesSortable(tables);
}
function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
}
function makeAllTablesSortable(element) {
	for (var i = 0; i < element.length; i++) {
		var ths = element[i].getElementsByTagName("th");
		var length = ths.length;
		for (var j = 0; j < length; j++) {
			ths[j].onclick = function() {
				var thead = document.getElementsByTagName("th");
				for (var k = 0; k < thead.length; k++) {
					if (thead[k] != this) {
						thead[k].style.background = "#000080";
					}
				}
				this.style.background = "url('./ascend.png') no-repeat right #a4b1fb";
			}
		}
	}
}
