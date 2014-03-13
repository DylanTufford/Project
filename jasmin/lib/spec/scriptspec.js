
describe("script", function() {

	it("Finds Split Crow in list of bars", function() {
		var $button = $("#barList li a:contains('The Split Crow')").first();

		var spyEvent = spyOnEvent($button, 'click');
		$button.click();
		expect('click').toHaveBeenTriggeredOn($button);
		expect(spyEvent).toHaveBeenTriggered();

  	});

});