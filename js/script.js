$(document).ready(function () {
	$.getJSON("bars.json", function(json){
		for (var i = 0; i < json.bars.length; i++) {
			var barName = json.bars[i].barName;
			$('ul.barList').append('<li><a href="barInfo.html">' + barName + '</a></li>').listview('refresh');   
		}
	});
});