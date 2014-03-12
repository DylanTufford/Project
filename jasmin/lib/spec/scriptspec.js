
describe("script", function() {

	it("will register a click", function() {
		var $button = $("#barList li a:contains('The Split Crow')").first();

		var spyEvent = spyOnEvent($button, 'click');
		$button.click();
		expect('click').toHaveBeenTriggeredOn($button);
		expect(spyEvent).toHaveBeenTriggered();

  	});

});