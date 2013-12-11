//on submit send ajax for day, year, min, hour, month

//$("#body-cells").html()

(function (root){
	var NumberTracker = root.NumberTracker = (root.NumberTracker || {} );

	var beginning = NumberTracker.beginning =
	var ending = NumberTracker.ending = Time.now();


	$.ajax({
		data: {
			previous: true,
			startDate: "12/12/12",
			endDate: "12/18/12"
		},
		error: function(){

		},
		success: function(){

		}
	})

})(window);