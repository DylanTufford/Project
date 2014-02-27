$(document).ready(function () {
	$.getJSON("bars.json", function(json){//Get jSON document
		//Go through all of the bars in the document, get the name of the bar, 
		//& append the name to the list of bars
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
		$('ul.barList').listview('refresh');//Update bar list
	});

	$('#faveButton').click(function() {
		name = $('#barInfo h1').text();
		if($('#faveButton').text() == "Favourite"){
			$.cookie(name, true);
			$('#faveButton').text("Unfavourite");
		}else{
			$.cookie(name, false);
			$('#faveButton').text("Favourite");
		}
	});
});

function getBarInfo(name){
	//Clear lists
	$('ul.specialsList').empty();
	$('#address').text("");
	$('#phone').text("");
	$('#mon').text("");
	$('#tues').text("");
	$('#wed').text("");
	$('#thu').text("");
	$('#fri').text("");
	$('#sat').text("");
	$('#sun').text("");

	//Add bar name to the top of the bar specials & bar info pages
	$('#barSpecials h1').text(name);
	$('#barInfo h1').text(name);

	//Checks if bar is a favourite or not & titles the favourite button accordingly
	checkCookie = $.cookie(name);
	alert(checkCookie);
	if(checkCookie == true){
		$('#faveButton').text("Unfavourite");
	}else{
		$('#faveButton').text("Favourite");
	}

	$.getJSON("bars.json", function(json){//Get jSON document
		var index;
		//Go through jSON document until it finds the bar that matches
		//the bar name that was passed into the function
		for (var i = 0; i < json.bars.length; i++) {
			//If it finds a match, record the index & break out of the for loop
			if(name === json.bars[i].barName){
				index = i;
				break;
			}
		}

		//Store the indexed jSON object as a variable for easier access
		var bar = json.bars[index];

		//Get Info (address, hours, etc.) & add it to the bar information page
		$('#address').text(bar.address);
		$('#phone').text(bar.phone);
		if(bar.hours.m != null){
			$('#mon').text("Monday: " + bar.hours.m);
		}
		if(bar.hours.tu != null){
			$('#tues').text("Tuesday: " + bar.hours.tu);
		}
		if(bar.hours.w != null){
			$('#wed').text("Wednesday: " + bar.hours.w);
		}
		if(bar.hours.th != null){
			$('#thu').text("Thursday: " + bar.hours.th);
		}
		if(bar.hours.f != null){
			$('#fri').text("Friday: " + bar.hours.f);
		}
		if(bar.hours.f != null){
			$('#sat').text("Saturday: " + bar.hours.sa);
		}
		if(bar.hours.f != null){
			$('#sun').text("Sunday: " + bar.hours.su);
		}

		//Store the indexed jSON object's specials as a variable for easier access
		var specials = bar.specials;
		//Keep track of the day each special falls on
		var day = null;
		//Go through the list of specials
		for(var i = 0; i < json.bars[index].specials.length; i++){
			//If the special is on a new day that the previous special, add
			//a new list divider for the new day
			if(day !== specials[i].weekday){
				day = json.bars[index].specials[i].weekday;
				$('ul.specialsList').append(
				    $('<li data-role="list-divider">').append(day)
				);
			}
			//Get the type of drink, price, and volume of the special
			var beverage = specials[i].beverage;
			var price = specials[i].price;
			var volume = specials[i].volume
			//Append th special's information to the special's list
			$('ul.specialsList').append(
			    $('<li>').append("$" + price + " - " + beverage + " (" + volume + "oz)")
			);
		}
		$('ul.specialsList').listview('refresh');//Update specials list
	});
}