
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