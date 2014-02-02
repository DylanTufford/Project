$(document).ready(function () {
	$.getJSON("bars.json", function(json){
		for (var i = 0; i < json.bars.length; i++) {
			var barName = json.bars[i].barName;
			$('ul.barList').append(
			    $('<li>').append(
			        $('<a>').attr({
			        	href:'barInfo.html',
			        	onClick: 'getBarInfo("' + barName + '")'
			        }).append(barName)
				)
			); 
		} 
		$('ul').listview('refresh');  
	});
});

function getBarInfo(name){
	alert(name);
}