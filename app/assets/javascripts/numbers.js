//on submit send ajax for day, year, min, hour, month

//$("#body-cells").html()

(function (root){
	var NumberTracker = root.NumberTracker = (root.NumberTracker || {} );

	var ending = NumberTracker.ending = new Date();
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


	//var twelveHourFormat = NumberTracker.twelveHourFormat = function(hour, min, sec){
	var twelveHourFormat = NumberTracker.twelveHourFormat = function(timestamp){
		if (hour < "12"){
			hour = 12 if hour == "0";
			return [hour,min,sec].join(":") + " AM";
		}
		else {
			hour = hour % 12;
			return [hour,min,sec].join(":") + " PM";
		}

	};

	var getPeriodEnd = NumberTracker.getPeriodEnd = function(number){
		if (number.created_at.min == 59){
			if (number.created_at.hour == 23){
				return twelveHourFormat("00:00:00")
			}
			else {
				return twelveHourFormat( (number.created_at.hour +1) +":00:00")
			}
		}
		else {
			return twelveHourFormat( (number.created_at.hour) +":"+ (number.created_at.min+1) +":00")
		}
	}


	var populateTable = NumberTracker.populateTable = function(numbers){
		$("body-cells").empty();

		@numbers.forEach(number){
		$("body-cells").append("<tr>");
			$("body-cells").append("<td>"+twelveHourFormat(number.created_at.hour, number.created_at.min, 0) +"</td>");
			$("body-cells").append("<td>"+getPeriodEnd(number) %> </td>
			<td><%#= number.number %></td>
		</tr>
		}
	}


})(window);