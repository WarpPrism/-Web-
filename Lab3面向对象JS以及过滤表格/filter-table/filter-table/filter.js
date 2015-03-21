window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
}

function makeAllTablesFilterable(tables) {
	for (var i in tables) {
		if (!isNaN(i)) {
			var input = document.createElement("input");
			tables[i].parentNode.insertBefore(input, tables[i]);
			addEventHandler(input, tables[i]);
		}
	}
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