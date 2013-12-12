//on submit send ajax for day, year, min, hour, month

//$("#body-cells").html()

(function (root){
	var NumberTracker = root.NumberTracker = (root.NumberTracker || {} );

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
	// var twelveHourFormat = NumberTracker.twelveHourFormat = function(timestamp){
	// 	var date = new Date(timestamp);
	// 	var hour = date.getHours(), min = date.getMinutes(), sec = date.getSeconds();

	// 	if (hour < "12"){
	// 		if (hour == "0") hour = 12 ;
	// 		return [hour,min,sec].join(":") + " AM";
	// 	}
	// 	else {
	// 		hour = hour % 12;
	// 		return [hour,min,sec].join(":") + " PM";
	// 	}

	// };


	var getPeriodStartEnd = NumberTracker.getPeriodStartEnd = function(timestamp){
		var date = new Date(timestamp * 1000);
		var hour = date.getHours(), min = date.getMinutes(), sec = date.getSeconds();
		//var yr = date.getFullYear(), day = date.getDate(), month = date.getMonth()+1;
		var yr = date.getFullYear();
		var day = date.getDate(), month = date.getMonth();

		interval = NumberTracker.interval

		var periodEnd, periodStart;

		var months = {0: "January", 1: "February", 2:"March", 3: "April", 4: "May",
				5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"}

		console.log('month', month, 'day',day)

		switch(interval){
			case "min":
			//hour:min A/P - hour:min+1 A/P

				if (hour < 12){
					if (hour == 0){
						periodStart = "12:" + min +" AM";
					}
					else {
						periodStart = hour + ":" + min +" AM";
					}

					if (min == 59){
						periodEnd = hour+1 + ":00 AM";
					}
					else {
						periodEnd = hour + ":" + (min+1) +" AM";
					}
				}
				else {
					if (hour == 12) hour = 1;

					periodStart = hour %12 + ":" + min +" PM";

					if (min == 59){
						if (hour == 23){
							periodEnd = "12:00:00 AM";
						}
						else {
							periodEnd = hour%12+1 + ":00 PM";
						}
					}
					else {
						periodEnd = hour %12 + ":" + (min+1) +" PM";
					}
				}
				break;


			case "hour":
			//HH:00 - HH+1:00
				if (hour > 11){
					periodStart = hour + ":00 AM";
					periodEnd = hour+1 + ":00 AM";
				}
				else {
					periodStart = hour % 12 + ":00 PM";

					if (hour == 23){
						periodEnd = "12:00 AM"
					}
					else {
						periodEnd = hour % 12 +1 + ":00 PM";
					}
				}
				break;
				

			case "day":
			//Month Day - Month Day+1
				periodEnd = moment().add('days', 1)._d;
				periodStart = months[ month ] + date.getDate()

				if (periodEnd.getMonth == 11){
					periodEnd = months[0] + date.getDate()
				}
				else {
					periodEnd = months[month+1] + date.getDate()
				}
				break;

			case "month":
			//Month - Month+1
				periodStart = months[month]

				if (month == 11){
					periodEnd = months[0]
				}
				else {
					periodEnd = months[month+1]
				}
				break;


			case "year":
			//Year - Year +1

				periodStart = yr;
				periodEnd = yr +1;
				break;

			default:
				console.log("I'm in the default")
				periodStart = null;
				periodEnd = null;

		}

		console.log( [periodStart, periodEnd]);
		return [periodStart, periodEnd];
	};



	var getRangeStart = NumberTracker.getRangeStart = function(){
		return moment(ending.getFullYear() +"-"+ (ending.getMonth()+1) +"-"+
		 ending.getDate()).subtract(interval, rangeLength)._d

	};

	var getRangeEnd = NumberTracker.getRangeEnd = function(){
		return moment(beginning.getFullYear() +"-"+ (beginning.getMonth()+1) +"-"+
		 beginning.getDate()).add(interval, rangeLength)._d

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


	var ending = NumberTracker.ending = new Date();
	var beginning = NumberTracker.beginning = getRangeStart();


})(window);