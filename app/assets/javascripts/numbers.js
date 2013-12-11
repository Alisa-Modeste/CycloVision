//on submit send ajax for day, year, min, hour, month

//$("#body-cells").html()

(function (root){
	var NumberTracker = root.NumberTracker = (root.NumberTracker || {} );

	var ending = NumberTracker.ending = new Date();
	var beginning = NumberTracker.beginning = getRangeStart();
	var interval = NumberTracker.interval = "day";
	var rangeLength = NumberTracker.rangeLength = 12;


	var changeRange = NumberTracker.changeRange = function(next){

		$.ajax({
			data: {
				next: next,
				startDate: beginning,
				endDate: ending,
				timezoneOffset: ending.getTimezoneOffset(),
				interval: interval
			},
			error: function(){

			},
			success: function(){

			}
		});
	};


	//var twelveHourFormat = NumberTracker.twelveHourFormat = function(hour, min, sec){
	var twelveHourFormat = NumberTracker.twelveHourFormat = function(timestamp){
		var date = new Date(timestamp);
		var hour = date.getHours(), min = date.getMinutes(), sec = date.getSeconds();

		if (hour < "12"){
			if (hour == "0") hour = 12 ;
			return [hour,min,sec].join(":") + " AM";
		}
		else {
			hour = hour % 12;
			return [hour,min,sec].join(":") + " PM";
		}

	};

	var getPeriodEnd = NumberTracker.getPeriodEnd = function(timestamp){
		var date = new Date(timestamp);
		var hour = date.getHours(), min = date.getMinutes(), sec = date.getSeconds();

		if (min == 59){
			if (hour == 23){
				return "12:00:00 AM";
			}
			else {
				return (hour + 1) +":00:00";
			}
		}
		else {
			return twelveHourFormat( (number.created_at.hour) +":"+ (number.created_at.min+1) +":00");
		}
	};

	var getPeriodStart = NumberTracker.getPeriodStart = function(timestamp){
		var date = new Date(timestamp);
		var hour = date.getHours(), min = date.getMinutes(), sec = date.getSeconds();
		var yr = date.getFullYear(), day = date.getDate(), month = date.getMonth+1

		switch(interval){
			case min:
			//hour:min A/P - hour:min+1 A/P


			case hour:
			//HH:00 - HH+1:00

			case day:
			//Month Day - Month Day+1
			var periodEnd = moment().add('days', 1)._d;

			case month:
			//Month - Month+1


			case year:
			//Year - Year +1
		}

		if (min == 59){
			if (hour == 23){
				return "12:00:00 AM";
			}
			else {
				return (hour + 1) +":00:00";
			}
		}
		else {
			return twelveHourFormat( (number.created_at.hour) +":"+ (number.created_at.min+1) +":00");
		}
	};

	var getRangeStart = NumberTracker.getRangeStart = function(){
		return moment(""+ending.getFullYear() + (ending.getMonth()+1) + ending.getDate(), "YYYYMMDD").subtract(interval, rangeLength)._d

	};

	var getRangeEnd = NumberTracker.getRangeEnd = function(){
		return moment(""+beginning.getFullYear() + (beginning.getMonth()+1) + beginning.getDate(), "YYYYMMDD").add(interval, rangeLength)._d

	};


	var populateTable = NumberTracker.populateTable = function(numbers){
		$("body-cells").empty();

		numbers.forEach(function(number){
			$("body-cells").append("<tr>");
			$("body-cells").append("<td>"+twelveHourFormat(number.timestamp) +"</td>");
		// 	$("body-cells").append("<td>"+getPeriodEnd(number.timestamp) %> </td>
		// 	<td><%#= number.number %></td>
		// </tr>
		});
	};


})(window);