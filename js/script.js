$(document).ready(function () {
	$.getJSON("bars.json", function(json){
		for (var i = 0; i < json.bars.length; i++) {
			var barName = json.bars[i].barName;
			$('ul.barList').append(
			    $('<li>').append(
			        $('<a>').attr({
			        	href:'#barSpecials',
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
	$('#barSpecials h1').text(name);
	$('#barInfo h1').text(name);
	$.getJSON("bars.json", function(json){
		var index;
		for (var i = 0; i < json.bars.length; i++) {
			if(name === json.bars[i].barName){
				index = i;
				break;
			}
		}
		var bar = json.bars[index];

		//Get Info (address, hours, etc.)
		$('#address p').text(bar.address);
		$('#phone p').text(bar.phone);
		$('#mon p').text("Monday: " + bar.hours.m);
		$('#tues p').text("Tuesday: " + bar.hours.tu);
		$('#wed p').text("Wednesday: " + bar.hours.w);
		$('#thu p').text("Thursday: " + bar.hours.th);
		$('#fri p').text("Friday: " + bar.hours.f);
		$('#sat p').text("Saturday: " + bar.hours.sa);
		$('#sun p').text("Sunday: " + bar.hours.su);

		//Get Specials
		var specials = bar.specials;
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
			    $('<li>').append("$" + price + " - " + beverage)
			);
		}
		$('ul.specialsList').listview('refresh');
	});
}