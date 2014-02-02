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
		$('ul.barList').listview('refresh');  
	});
});

function getBarInfo(name){
	$.getJSON("bars.json", function(json){
		var index;
		for (var i = 0; i < json.bars.length; i++) {
			alert(json.bars[i].barName);
			if(name === json.bars[i].barName){
				index = i;
				break;
			}
		} 
		for(var i = 0; i < json.bars[index].specials.length; i++){
			//alert(json.bars[index].address);
			var beverage = json.bars[index].specials[i].beverage;
			alert(beverage);
			$('ul.specialsList').append(
			    $('<li>').append(
			        $('<a>').attr({
			        	href:'#'
			        }).append(beverage)
				)
			);
		}
		$('ul.specialsList').listview('refresh');  
	});
}