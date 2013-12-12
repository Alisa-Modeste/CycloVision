//on submit send ajax for day, year, min, hour, month

//$("#body-cells").html()

(function (root){
	var NumberTracker = root.NumberTracker = (root.NumberTracker || {} );

	var interval = NumberTracker.interval = "day";
	var rangeLength = NumberTracker.rangeLength = 12;
	var offset = NumberTracker.offset = 0;
	var nextSet = NumberTracker.nextSet = 2; //neither true nor false
	var useAjax = false;

	var getPeriodStartEnd = NumberTracker.getPeriodStartEnd = function(timestamp){
		var date = new Date(timestamp * 1000);

		date = {hour: date.getHours(), min: date.getMinutes(), sec: date.getSeconds(),
			yr: date.getFullYear(), day: date.getDate(), month: date.getMonth()};

		if (date.hour > 11){
			//date.merdian = " PM";
			date.merdian = {current: " PM", other: " AM"};
		}
		else {
			date.merdian = {current: " AM", other: " PM"};
		}

		date.hour = date.hour % 12;
		if (date.hour == 0){
			date.hour = 12;
		}
		
		interval = NumberTracker.interval

		var periodEnd, periodStart;

		var months = {0: "January", 1: "February", 2:"March", 3: "April", 4: "May",
				5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"}

		switch(interval){
			case "min":
			//hour:min A/P - hour:min+1 A/P
				periodStart = date.hour + ":" + date.min + date.merdian.current;

				if (date.min == 59){
					if (date.hour == 12){
						periodEnd = "1:00" + date.merdian.current;
					}
					else if (date.hour == 11){
						periodEnd = date.hour+1 + ":00" + date.merdian.other;	
					}
					else {
						periodEnd = date.hour+1 + ":00" + date.merdian.current;
					}
				}
				else {
					periodEnd = date.hour + ":" + (date.min+1) + date.merdian.current;
				}
				
				break;


			case "hour":
			//HH:00 - HH+1:00
			
				periodStart = date.hour + ":00" + date.merdian.current;

				if (date.hour == 11){
					periodEnd = "12:00" + date.merdian.other;
				}
				else {
					periodEnd = date.hour+1 + ":00" + date.merdian.current;
				}

				break;
				

			case "day":
			//Month Day - Month Day+1
				periodEnd = moment(date.year +"-"+ (date.month+1) +"-"+
		 			date.day).add('days', 1)._d;
				periodStart = months[ date.month ] + " " + date.day;

				periodEnd = months[ periodEnd.getMonth() ] + " " + periodEnd.getDate();

				break;

			case "month":
			//Month - Month+1
				periodStart = months[date.month]

				if (date.month == 11){
					periodEnd = months[0]
				}
				else {
					periodEnd = months[date.month+1]
				}
				break;


			case "year":
			//Year - Year +1

				periodStart = date.yr;
				periodEnd = date.yr +1;
				break;

			default:
				periodStart = null;
				periodEnd = null;

		}

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



	var ending = NumberTracker.ending = new Date();
	var beginning = NumberTracker.beginning = getRangeStart();


	var getEmbeddedData = NumberTracker.getEmbeddedData = function(){
		return JSON.parse($("#first-set").html());

	};

	var populateTable = NumberTracker.populateTable = function(numbers){
		if (!useAjax){
			var numbers = getEmbeddedData();
			useAjax = true;
		}
		else {
			$("#child-cell").nextAll().remove()
		}

		console.log("num", numbers)

		var keys = Object.keys(numbers).sort();
		keys.forEach(function(key){
			console.log("in each")

			var period = getPeriodStartEnd(key);

			// $("#body-cells").append("<tr><td>"+ period[0] +"</td>");
			// $("#body-cells").append("<td>"+ period[1] +"</td>");

			// $("#body-cells").append("<td>"+ number.number +"</td></tr>");


			$("#body-cells").append("<tr><td>"+ period[0] +"</td><td>"+ period[1] +"</td><td>"+ numbers[key] +"</td></tr>");

		});
	};

	var changeDates = NumberTracker.changeDates = function(next){
		sendRequest(next, populateTable)
	};

	var changeInterval = NumberTracker.changeInterval = function(newInterval){
		interval = NumberTracker.interval = newInterval

		sendRequest("same", populateTable)
		
	};

	//next - trilean logic - 2 for neutral
	var sendRequest = NumberTracker.sendRequest = function(nextSet, callback){
		$.ajax({
			url: "/numbers",
			dataType: "json",
			data: {
				request: {
					nextSet: nextSet,
					startDate: Date.parse(beginning)/1000,
					endDate: Date.parse(ending)/1000,
					timezoneOffset: ending.getTimezoneOffset(),
					interval: interval,
					offset: offset
				}
			},
			error: function(){
				console.log("There was an error")
			},
			success: function(data){
				console.log("Success",data)
				callback(data)
			}
		});
	};


})(window);