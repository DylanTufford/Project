/**
 * Javascript code that adds dynamic functionality to the app
 *
 * @class script
 */

/**
 * Fired when page is ready
 *
 * @event ready
 */
$(document).ready(function () {
	getBarList();
	getDrinksList();

	/**
	 * Fired when favourite button on info page is clicked
	 *
	 * @event faveButtonInfo
	 */
	$('#faveButtonInfo').click(function() {
		name = $('#barInfo h1').text();
		if($('#faveButtonInfo').text() == "Favourite"){
			$.cookie(name, true);
			$('#faveButtonInfo').text("Unfavourite");
			$('#faveButtonSpecials').text("Unfavourite");
		}else{
			$.cookie(name, false);
			$('#faveButtonInfo').text("Favourite");
			$('#faveButtonSpecials').text("Favourite");
		}
	});

	/**
	 * Fired when favourite button on specials page is clicked
	 *
	 * @event faveButtonSpecials
	 */
	$('#faveButtonSpecials').click(function() {
		name = $('#barInfo h1').text();
		if($('#faveButtonSpecials').text() == "Favourite"){
			$.cookie(name, true);
			$('#faveButtonInfo').text("Unfavourite");
			$('#faveButtonSpecials').text("Unfavourite");
			//$('#faveButtonInfo').attr("data-theme", "e");
			//$('#faveButtonInfo').attr("data-theme", "e");
		}else{
			$.cookie(name, false);
			$('#faveButtonInfo').text("Favourite");
			$('#faveButtonSpecials').text("Favourite");
		}
	});

	/**
	 * Fired when a-z bar sorting option is selected
	 *
	 * @event sortAZ
	 */
	$('#azBars').click(function(){
		$('ul.barList').empty();
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
	});

	/**
	 * Fired when favourite bars sorting option is selected
	 *
	 * @event sortFavourites
	 */
	$('#favouriteBars').click(function(){
		$('ul.barList').empty();
		$.getJSON("bars.json", function(json){//Get jSON document
			//Go through all of the bars in the document, get the name of the bar, 
			//& append the name to the list of bars
			for (var i = 0; i < json.bars.length; i++) {
				var barName = json.bars[i].barName;
				if($.cookie(barName) == "true"){
					$('ul.barList').append(
					    $('<li>').append(
					        $('<a>').attr({
					        	href:'#barSpecials',
					        	onClick: 'getBarInfo("' + barName + '")'
					        }).append(barName)
						)
					);
				} 
			} 
			$('ul.barList').listview('refresh');//Update bar list
		});
	});

	/**
	 * Fired when check-in button is selected on info page
	 *
	 * @event checkInInfo
	 */
	$('#checkInInfo').click(function(){
		alert("You have been checked in to " + $('#barInfo h1').text() + "!");
	});

	/**
	 * Fired when check-in button is selected on specials page
	 *
	 * @event checkInSpecials
	 */
	$('#checkInSpecials').click(function(){
		alert("You have been checked in to " + $('#barSpecials h1').text() + "!");
	});
});

/**
* Gets list of bars from jSON file and displays them in a list
* 
* @method getBarList
*/
function getBarList(){
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
}

/**
* Gets list of drinks from jSON file and displays them in a list
* 
* @method getDrinksList
*/
function getDrinksList(){
	//alert("drinks list");
	$.getJSON("drinks.json", function(json){//Get jSON document
		alert("parsing drinks");
		//Go through all of the drinks in the document
		for (var i = 0; i < json.drinks.length; i++) {
			var drinkType = json.drinks[i].drinkType;
			$('ul.drinkList').append(
			    $('<li>').att("data-role","list-divider").append(drinkType)
			); 
			for (var j = 0; j < json.drinks.drinkType; i++) {
				var types = json.drinks[i].types[j]._type;
				$('ul.drinkList').append(
				    $('<li>')/*.append(
				        $('<a>').attr({
				        	href:'#drinkSpecials',
				        	onClick: 'getDrinkInfo("' + types + '")'
				        })*/.append(types)
					/*)*/
				); 
			};
		} 
		$('ul.drinkList').listview('refresh');//Update bar list
	});
}

/**
* Gets info about bars and displays them in the bar's page
* 
* @method getBarInfo
* @param {String} name Name of bar that page needs to be loaded for
*/

function getBarInfo(name){
	//Clear lists & titles
	$('#barSpecials h1').text("");
	$('#barInfo h1').text("");
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

	//Update page titles
	//Code from http://stackoverflow.com/questions/6887442/preventing-jquery-mobile-from-setting-document-title
	$('div[id="barSpecials"]').bind('pageshow',function(){document.title = name + " - Specials"});
	$('div[id="barInfo"]').bind('pageshow',function(){document.title = name + " - Information"});
	
	//Add bar name to the top of the bar specials & bar info pages
	$('#barSpecials h1').text(name);
	$('#barInfo h1').text(name);

	//Checks if bar is a favourite or not & titles the favourite buttons accordingly
	checkCookie = $.cookie(name);
	if(checkCookie == "true"){
		$('#faveButtonSpecials').text("Unfavourite");
		$('#faveButtonInfo').text("Unfavourite");
	}else{
		$('#faveButtonSpecials').text("Favourite");
		$('#faveButtonInfo').text("Favourite");
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