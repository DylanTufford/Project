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
	 * Fired when distance option is selected
	 * 
	 * @event distance
	 */
	$('#distance').click(function(){
		$('ul.barList').empty();
		$.getJSON("bars.json", function(json){//Get jSON document
			for (var i = 0; i < json.bars.length; i++) {
				var latitude = 0;
				var longitude = 0;
				//navigator.geolocation.getCurrentPosition(success, error);
				function success(position){
				    latitude  = position.coords.latitude;    
				    longitude = position.coords.longitude;    
				}
				var distance = getDistanceFromLatLonInKm(latitude, longitude, json.bars[i].latitude, json.bars[i].longitude);
				var bName = json.bars[i].barName;
				var barName = bName + "       " + distance + " km";
				$('ul.barList').append(
				    $('<li>').append(
				        $('<a>').attr({
				        	href:'#barSpecials',
				        	onClick: 'getBarInfo("' + bName + '")'
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

$(document).on('pageshow', '#drinkList', function () {
	getDrinkList();
});

/**
* Gets list of bars from jSON file and displays them in a list
* 
* @method getBarList
*/
function getBarList(){
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
}

/**
* Gets list of drinks from jSON file and displays them in a list
* 
* @method getDrinkList
*/
function getDrinkList(){
	$('ul.drinkList').empty();
	$.getJSON("drinks.json", function(json){//Get jSON document
		//Go through all of the drinks in the document
		for (var i = 0; i < json.drinks.length; i++) {
			var drinkType = json.drinks[i].drinkType;
			$('ul.drinkList').append(
			    $('<li>').attr("data-role","list-divider").append(drinkType)
			); 
			for (var j = 0; j < json.drinks[i].types.length ; j++) {
				var types = json.drinks[i].types[j]._type;
				$('ul.drinkList').append(
				    $('<li>').append(
				        $('<a>').attr({
				        	href:'#drinkSpecials',
				        	onClick: 'getDrinkInfo("' + types + '",' + j + ')'
				        }).append(types)
				    )
				); 
			}
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
			//Append the special's information to the special's list
			$('ul.specialsList').append(
			    $('<li>').append("$" + price + " - " + beverage + " (" + volume + "oz)")
			);
		}
		$('ul.specialsList').listview('refresh');//Update specials list
	});
}

/**
* Gets info about drinks and displays them in the drinks's page
* 
* @method getDrinkInfo
* @param {String} name Name of drink that page needs to be loaded for
*/

function getDrinkInfo(name,typeNumber){
	//Clear lists & titles
	$('#drinkSpecials h1').text("");
	$('ul.specialsList').empty();
	$('#price').text("");
	$('#volume').text("");
	$('#day').text("");
	$('#specialTime').text("");
	$('#barName').text("");
	
	//Add drink name to the top of the drink info pages
	$('#drinkSpecials h1').text(name);

	$.getJSON("drinks.json", function(json){//Get jSON document
		var index = 0;
		//Go through jSON document until it finds the drink that matches
		//the drink name that was passed into the function
		for (var i = 0; i < json.drinks.length; i++) {
			//If it finds a match, record the index & break out of the for loop
			if(name === json.drinks[i].types._type){
				index = i;
				break;
			}
		}

		//Store the indexed jSON object as a variable for easier access
		var drink = json.drinks[index].types[typeNumber].specials;

		for(var i = 0; i < drink.length; i++)
		{
			//Get Info (price, volume, etc.) & add it to the drink information page
			$('ul.specialsList').empty();
			$('#price').text(drink[i].price);
			$('#volume').text(drink[i].volume);
			$('#day').text(drink[i].day);
			$('#specialTime').text(drink[i].specialTime);
			$('#bar').text(drink[i].bar);
		}
		 
		$('ul.drinkList').listview('refresh');//Update drink` list
	});

}

/**
* Create's map & plots user's current position
* 
* @method map
*/
$(document).on('pageshow', '#map', function() {
    $('#map_canvas').gmap({
    	'streetViewControl': false,
    	'panControl': false,
    	'zoomControl': false,
        'zoom': 10
    }).bind('init', function(event, map) {
        $('#map_canvas').gmap('getCurrentPosition', function(position, status) {
			if ( status === 'OK' ) {
				var currPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				$('#map_canvas').gmap('addMarker', {
					'position': currPosition,
					'bounds': true,
					'animation': google.maps.Animation.DROP,
					'icon':new google.maps.MarkerImage('images/arrow.png')
				}).click(function() {
				$('#map_canvas').gmap('openInfoWindow', { 
					'content': 'You are here!'
				}, this);
			});
			}
		});
		addBarsToMap();
    });
});

function addBarsToMap(){
	$.getJSON("bars.json", {}, function(json){//Get jSON document
		$.each(json.bars, function(i, bar) {
			$('#map_canvas').gmap('addMarker', { 
				'position': new google.maps.LatLng(bar.latitude, bar.longitude),
				'bounds': true 
			}).click(function() {
				$('#map_canvas').gmap('openInfoWindow', {  
					'content':'<h3><a href="index.html">'+ bar.barName + '</a></h3><p>' + bar.address + '</p><p>' + "Monday: " + bar.hours.m +
																				  '<br>' + "Tuesday: " + bar.hours.tu +
																				  '<br>' + "Wednesday: " + bar.hours.w +
																				  '<br>' + "Thursday: " + bar.hours.th +
																				  '<br>' + "Friday: " + bar.hours.f +
																				  '<br>' + "Saturday: " + bar.hours.sa + 
																				  '<br>' + "Sunday: " + bar.hours.su + '</p>'
				}, this);
			});
		});
	});
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}