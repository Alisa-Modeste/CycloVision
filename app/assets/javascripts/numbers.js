//on submit send ajax for day, year, min, hour, month

//$("#body-cells").html()

(function (root){
	var NT = root.NT = (root.NT || {} );

	NT.interval = "day";
	NT.nextSet = "same"; //or "next" or "previous"
	NT.useAjax = false;
	NT.ending, NT.beginning;

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
			case "minute":
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


	NT.getEmbeddedData = function(){
		return JSON.parse($("#first-set").html());

	};

	NT.createChart = function(labels, values){
		var data = {
			labels : labels,
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,1)",
					data : values
				}
			]
		};

		var ctx = $("#myChart").get(0).getContext("2d");
		var myNewChart = new Chart(ctx)

		myNewChart.Bar(data);


	};

	NT.populateTable = function(periods){
		for (var i = 0; i < periods.length; i++) {
			
			$("#body-cells").append("<tr><td>"+ periods[i][0] +"</td><td>"+ periods[i][1] +"</td><td>"+periods[i][2] +"</td></tr>");
		};
		
	};

	var periods, labels, values;


	NT.storePeriod = function(time, goalTime, numbers){
		var period = NT.getPeriodStartEnd( time );
		var value = numbers[ time ] ? numbers[ time ] : 0;
		periods.push( [ period[0], period[1], value ] );
		labels.push( period[0] );
		values.push( value );
		//return
	}


	NT.getAllPeriods = function(numbers){
		var keys = Object.keys(numbers).sort();

		periods = [], labels = [], values = [];

		for (var i=0; i< keys.length; i++){

			var periodGoal = keys[0];
			var nextPeriod = NT.beginning, periodComparison;

			while (i == 0 && NT.beginning < keys[0] && nextPeriod == NT.beginning || i == 0 && periodComparison < periodGoal){
				
				NT.storePeriod(nextPeriod, periodGoal, numbers);
				nextPeriod = moment(nextPeriod *1000).add(NT.interval, 1)._d.getTime() /1000;
				periodComparison = NT.getPeriodComparison(nextPeriod);
			}

			periodGoal = keys[i+1];			
			nextPeriod = keys[i];

			while (nextPeriod == keys[i] || keys[i+1] && periodComparison < periodGoal){
				NT.storePeriod(nextPeriod, periodGoal, numbers);
				nextPeriod = moment( nextPeriod *1000).add(NT.interval, 1)._d.getTime() /1000;
				periodComparison = NT.getPeriodComparison(nextPeriod);

			}

			periodGoal = NT.ending;
			nextPeriod = moment(keys[ keys.length-1 ] *1000).add(NT.interval, 1)._d.getTime() /1000;
		
			var j=0;
			while (i == keys.length-1 && periodComparison < periodGoal || i == keys.length-1 && j==0 && nextPeriod < periodGoal){
				j++
				
				NT.storePeriod(nextPeriod, periodGoal, numbers);
				nextPeriod = moment(nextPeriod *1000).add(NT.interval, 1)._d.getTime() /1000;
				periodComparison = NT.getPeriodComparison(nextPeriod);
			
			}
	
		}

		return {everything: periods, labels: labels, values: values};
	};

	NT.getPeriodComparison = function(nextPeriod){
		return moment(nextPeriod *1000).endOf(NT.interval)._d.getTime() / 1000;
	};

	NT.changeDates = function(next){
		NT.sendRequest(next, NT.updateInfo)
	};

	NT.changeInterval = function(newInterval){
		NT.interval = newInterval

		NT.sendRequest("same", NT.updateInfo)
		
	};

	NT.sendRequest = function(nextSet, callback){
		console.log("aren't we set",NT.ending, NT.beginning)
		$.ajax({
			url: "/numbers",
			dataType: "json",
			data: {
				request: {
					nextSet: nextSet,
					startDate: NT.beginning,
					endDate: NT.ending,
					//timezoneOffset: NT.ending.getTimezoneOffset(),
					interval: NT.interval//,
					//offset: NT.offset
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

	NT.renderInfo = function(numbers){
		var periods = NT.getAllPeriods(numbers);
		var labels = periods['labels'], values = periods['values'];
		periods = periods['everything'];

		NT.displayPeriod();
		NT.createChart(labels, values);
		NT.populateTable(periods);

	};

	NT.formatPeriodHeading = function(timestamp){
		var date = timestamp.toString().split(' ').slice(0,4);
		date[0] = date[0] + ",";
		date[2] = date[2] + ",";
		date.push(timestamp.toLocaleTimeString())
		date = date.join(" ")

		return date;
		
	};

	NT.displayPeriod = function(){
		var from = new Date(NT.beginning *1000);
		var to = new Date(NT.ending *1000);

		from = NT.formatPeriodHeading(from);
		to = NT.formatPeriodHeading(to);

		$("#period-title").html("<h2>" + from + " to " + to + "</h2>")

	}

	NT.setEndPoints = function(range){
		console.log("This is what we got", range)

		NT.beginning = range['from'], NT.ending = range['to'];
	};

	NT.updateInfo = function(data){
		if (!NT.useAjax){

			var data = NT.getEmbeddedData();
			console.log(data)
			NT.useAjax = true;
			console.log("Negative agax")
		}
		else {
			$("#child-cell").nextAll().remove()
			console.log("ajax")
		}

		console.log("The data", data)
		NT.setEndPoints(data['range']);

		NT.renderInfo(data['totals']);
		NT.displayPeriod();
	}


})(window);

$(document).ready(function(){
	if (location.href.indexOf("localhost:3000/qunit") != -1){
		return
	}
	NT.updateInfo()
});