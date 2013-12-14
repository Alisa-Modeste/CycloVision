//on submit send ajax for day, year, min, hour, month

//$("#body-cells").html()

(function (root){
	var NT = root.NT = (root.NT || {} );

	NT.interval = "day";
	NT.rangeLength = 12;
	NT.offset = 0;
	NT.nextSet = 2; //neither true nor false
	NT.useAjax = false;

	NT.getPeriodStartEnd = function(timestamp){
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

		var periodEnd, periodStart;

		var months = {0: "January", 1: "February", 2:"March", 3: "April", 4: "May",
				5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"}

		switch(NT.interval){
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
				else if(date.min < 10){
					periodEnd = date.hour + ":0" + (date.min+1) + date.merdian.current;
					periodStart = date.hour + ":0" + date.min + date.merdian.current;
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



	NT.getRangeStart = function(){
		return moment(NT.ending.getFullYear() +"-"+ (NT.ending.getMonth()+1) +"-"+
		 NT.ending.getDate()).subtract(NT.interval, NT.rangeLength)._d

	};

	NT.getRangeEnd = function(){
		return moment(NT.beginning.getFullYear() +"-"+ (NT.beginning.getMonth()+1) +"-"+
		 NT.beginning.getDate()).add(NT.interval, NT.rangeLength)._d

	};



	NT.ending = new Date();
	NT.beginning = NT.getRangeStart();


	NT.getEmbeddedData = function(){
		return JSON.parse($("#first-set").html());

	};

	NT.populateTable = function(numbers){

		if (!NT.useAjax){

			var numbers = NT.getEmbeddedData();
			NT.useAjax = true;
			console.log("Negative agax")
		}
		else {
			$("#child-cell").nextAll().remove()
			console.log("ajax")
		}

		console.log("num", numbers, typeof(numbers))

		var keys = Object.keys(numbers).sort();
		// keys.forEach(function(key){

		// 	var period = NT.getPeriodStartEnd(key);

		// 	// $("#body-cells").append("<tr><td>"+ period[0] +"</td>");
		// 	// $("#body-cells").append("<td>"+ period[1] +"</td>");

		// 	// $("#body-cells").append("<td>"+ number.number +"</td></tr>");


		// 	$("#body-cells").append("<tr><td>"+ period[0] +"</td><td>"+ period[1] +"</td><td>"+ numbers[key] +"</td></tr>");

		// });

		// var difference = {"min": 60, "hour": 3600, day: }

		for (var i=0; i< keys.length; i++){

			var period = NT.getPeriodStartEnd(keys[i]);
			$("#body-cells").append("<tr><td>"+ period[0] +"</td><td>"+ period[1] +"</td><td>"+ numbers[keys[i]] +"</td></tr>");
			
			if (NT.interval == "min"){
				var nextPeriod = parseInt(keys[i]) + 60;
				if ( keys[i+1] && ( nextPeriod != keys[i+1] ) ){
					while ( nextPeriod != keys[i+1] ){
						period = NT.getPeriodStartEnd( nextPeriod );

						$("#body-cells").append("<tr><td>"+ period[0] +"</td><td>"+ period[1] +"</td><td>0</td></tr>");

						nextPeriod = nextPeriod +60;
					}
				}
			}
			else {

	 			var nextPeriod = moment(keys[i] *1000).add(NT.interval, 1)._d.getTime() /1000;
	// 			//fill in the missing periods of time
	 			 console.log("keys[i]", keys[i], "outer is", nextPeriod, "int", NT.interval)
	 			if ( keys[i+1] && ( nextPeriod != keys[i+1] ) ){
					var k =0;
					while (nextPeriod != keys[i+1]){
						k++;
	 console.log("inner is", nextPeriod, "keys[i+1] ", keys[i+1])
	 				period = NT.getPeriodStartEnd( nextPeriod );
	 				$("#body-cells").append("<tr><td>"+ period[0] +"</td><td>"+ period[1] +"</td><td>0</td></tr>");

	// 				//j++;
	 				nextPeriod = moment( nextPeriod *1000).add(NT.interval, 1)._d.getTime() /1000;
	 			 console.log("the second inner is", nextPeriod, "keys[i+1] ", keys[i+1])	
				
	 				}
	 			}
 // 				console.log("space please")
			}
			

		}

		console.log("Finished for loop")
	};

	var changeDates = NT.changeDates = function(next){
		sendRequest(next, NT.populateTable)
	};

	var changeInterval = NT.changeInterval = function(newInterval){
		NT.interval = newInterval

		sendRequest("same", NT.populateTable)
		
	};

	//next - trilean logic - 2 for neutral
	var sendRequest = NT.sendRequest = function(nextSet, callback){
		$.ajax({
			url: "/numbers",
			dataType: "json",
			data: {
				request: {
					nextSet: nextSet,
					startDate: Date.parse(NT.beginning)/1000,
					endDate: Date.parse(NT.ending)/1000,
					timezoneOffset: NT.ending.getTimezoneOffset(),
					interval: NT.interval,
					offset: NT.offset
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

$(document).ready(function(){
	if (location.port == 8888){
		return
	}
	NT.populateTable()
});