
describe("List of bars", function() {

	it("Creates Split Crow button", function() {
		var $button = $("#barList li a:contains('The Split Crow')").first();

		var spyEvent = spyOnEvent($button, 'click');
		$button.click();
		expect('click').toHaveBeenTriggeredOn($button);
		expect(spyEvent).toHaveBeenTriggered();

  	});

	it("Creates Halifax Alehouse button", function() {
		var $button = $("#barList li a:contains('Halifax Alehouse')").first();

		var spyEvent = spyOnEvent($button, 'click');
		$button.click();
		expect('click').toHaveBeenTriggeredOn($button);
		expect(spyEvent).toHaveBeenTriggered();

  	});

	it("Creates Maxwell's Plum button", function() {
		var $button = $("#barList li a:contains('Maxwell's Plum')").first();

		var spyEvent = spyOnEvent($button, 'click');
		$button.click();
		expect('click').toHaveBeenTriggeredOn($button);
		expect(spyEvent).toHaveBeenTriggered();

  	});

	it("Creates Toothy Moose button", function() {
		var $button = $("#barList li a:contains('Toothy Moose')").first();

		var spyEvent = spyOnEvent($button, 'click');
		$button.click();
		expect('click').toHaveBeenTriggeredOn($button);
		expect(spyEvent).toHaveBeenTriggered();

  	});

});

describe("List of drinks", function() {

	it("Creates drink 'Shippey's Draught' in list", function() {
		var $button = $("#drinkList li a:contains('$4.5 - Shippey's Draught (14oz)')").first();

		var spyEvent = spyOnEvent($button);
		$button.click();
  	});

});


describe("Favourites button push", function() {

	it("Enables the button push in the favourites section and remains pushed", function() {
  
	});

});

