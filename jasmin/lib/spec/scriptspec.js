var script;

describe("script", function() {

	/*beforeEach(function() {
    	loadFixtures("fixtures/MYFixture.html");
    	$("#jasmine-fixtures").attr("data-role","page").trigger("create");
  	})*/

	it("should call function to display information", function(){

		expect($('ul.barList')).toHaveLength(4)

	})

});