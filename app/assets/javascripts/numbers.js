//on submit send ajax for day, year, min, hour, month

//$("#body-cells").html()

(function (root){
	var NumberTracker = root.NumberTracker = (root.NumberTracker || {} );

	var ending = NumberTracker.ending = Time.now();
	var beginning = NumberTracker.beginning = ending - 
	var increment = NumberTracker.increment = "day"


	var changeRange = NumberTracker.changeRange = function(next){

		$.ajax({
			data: {
				next: next,
				startDate: beginning,
				endDate: ending,
				timezoneOffset: ending.getTimezoneOffset(),
				increment: increment
			},
			error: function(){

			},
			success: function(){

			}
		});
	};


	var twelveHourFormat = NumberTracker.twelveHourFormat = function(time){
		time = time.split(":")

		if (time.first < "12"){
			time[0] = 12 if time.first == "0";
			time.join(":") + " AM";
		}
		else {
			time[0] = time.first.to_i % 12;
			time.join(":") + " PM";
		}

		return time;
	};

	var getPeriodEnd = NumberTracker.getPeriodEnd = function(number){
		if (number.created_at.min == 59){
			if (number.created_at.hour == 23){
				twelve_hour_format("00:00:00")
			}
			else {
				twelve_hour_format( (number.created_at.hour +1) +":00:00")
			}
		}
		else {
			twelve_hour_format( (number.created_at.hour) +":"+ (number.created_at.min+1) +":00")
		}
	}



})(window);