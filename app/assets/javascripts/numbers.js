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
				else if (date.hour == 12){
					periodEnd = "1:00" + date.merdian.current;
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


		var periods = NT.getAllPeriods(numbers);

		for (var i = 0; i < periods.length; i++) {
			
			$("#body-cells").append("<tr><td>"+ periods[i][0] +"</td><td>"+ periods[i][1] +"</td><td>"+periods[i][2] +"</td></tr>");
		};
		
	};

	NT.getAllPeriods = function(numbers){
		console.log("inside periods")
		var keys = Object.keys(numbers).sort();
		var periods = [];

		for (var i=0; i< keys.length; i++){

			var period = NT.getPeriodStartEnd(keys[i]);
			periods.push( [ period[0], period[1], numbers[keys[i]] ] );


    //min = 59, hour = 3599, day = 3600*24-1
    //month (moment(1386813239*1000).month() +1) % 12 < moment(keys[i+1])
    //year moment(1386813239*1000).year() + 1 < moment(keys[i+1])

			if (NT.interval == "min"){
				var nextPeriod = parseInt(keys[i]) + 60;
			}
			else {
				var nextPeriod = moment(keys[i] *1000).add(NT.interval, 1)._d.getTime() /1000;
			}

			
			

			if (NT.interval == "month"){
				periodGoal = moment(keys[i+1] *1000).month();
			}
			else if (NT.interval == "year"){
				periodGoal = moment(keys[i+1] *1000).year();
			}
			else {
				var periodGoal = keys[i+1];
			}


			// //NOTE: check
			// console.log("is there another one", i+1<keys.length, keys[i+1])
			
			// console.log("is it less than", periodComparison < periodGoal)
			// console.log("periodComparison",periodComparison, "periodGoal", periodGoal)

			var periodComparison = NT.getPeriodComparison(nextPeriod);
			console.log("periodComparison",periodComparison, "periodGoal", periodGoal)
			while ( keys[i+1] && ( periodComparison < periodGoal )){
			// 	console.log("","in while")

			// 	console.log("is it less than", periodComparison < periodGoal)
			// console.log("periodComparison",periodComparison, "periodGoal", periodGoal)
			// 	b++
			//if ( keys[i+1] && ( periodComparison < periodGoal ) ){
				console.log("nextPeriod",nextPeriod,"keys[i+1]",keys[i+1])
				period = NT.getPeriodStartEnd( nextPeriod );

				periods.push( [ period[0], period[1], 0 ] );

				if (NT.interval == "min"){
					nextPeriod = nextPeriod +60;
				}
				else {
					nextPeriod = moment( nextPeriod *1000).add(NT.interval, 1)._d.getTime() /1000;
				}
			
				periodComparison = NT.getPeriodComparison(nextPeriod);
			console.log("AGAIN is it less than", periodComparison < periodGoal)
			}			

	
		}

		return periods;
	};

	NT.getPeriodComparison = function(nextPeriod){
		var periodComparison;

		switch (NT.interval){
		case "min":
			periodComparison = nextPeriod+59;
			break;
		case "hour":
			periodComparison = nextPeriod + 3599;
			break;

		case "day":
			periodComparison = nextPeriod + (3600*24-1)
			break;

		case "month":
			periodComparison = (moment(nextPeriod*1000).month() +1) % 12;
			break;

		case "year":
			periodComparison = (moment(nextPeriod*1000).year() +1);
			break;
		}

		return periodComparison;
	};

	NT.changeDates = function(next){
		NT.sendRequest(next, NT.populateTable)
	};

	NT.changeInterval = function(newInterval){
		NT.interval = newInterval

		NT.sendRequest("same", NT.populateTable)
		
	};

	//next - trilean logic - 2 for neutral
	NT.sendRequest = function(nextSet, callback){
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
	if (location.port == 8888 || location.href.indexOf("localhost:3000/qunit") != -1){
		return
	}
	NT.populateTable()
});