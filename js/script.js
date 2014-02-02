$(document).ready(function () {
	$.getJSON("bars.json", function(json){
		for (var i = 0; i < json.bars.length; i++) {
			var barName = json.bars[i].barName;
			$('ul.barList').append(
			    $('<li>').append(
			        $('<a>').attr({
			        	href:'#barInfo',
			        	onClick: 'getBarInfo("' + barName + '")'
			        }).append(barName)
				)
			); 
		} 
		$('ul.barList').listview('refresh');  
	});
});

function getBarInfo(name){
	$('ul.specialsList').empty();
	/*$(#barNameTitle h1).append({
		text:name
	});*/
	$.getJSON("bars.json", function(json){
		var index;
		for (var i = 0; i < json.bars.length; i++) {
			if(name === json.bars[i].barName){
				index = i;
				break;
			}
		}
		var specials = json.bars[index].specials;
		var day = null;
		for(var i = 0; i < json.bars[index].specials.length; i++){
			if(day !== specials[i].weekday){
				day = json.bars[index].specials[i].weekday;
				$('ul.specialsList').append(
				    $('<li data-role="list-divider">').append(day)
				);
			}
			var beverage = specials[i].beverage;
			var price = specials[i].price;
			$('ul.specialsList').append(
			    $('<li>').append(beverage)
			);
		}
		$('ul.specialsList').listview('refresh');  
	});
}