(function (root){
	var NT = root.NT = (root.NT || {} );

	NT.interval = "day";
	NT.nextSet = "same";
	NT.useAjax = false;
	var periods, labels, values;

	//get the period this date/time is in and the next one
	NT.getPeriodStartEnd = function(timestamp){
		var periodStart = timestamp * 1000, periodEnd;
		var date = new Date(timestamp * 1000);

		date = {hour: date.getHours(), min: date.getMinutes(), sec: date.getSeconds(),
			yr: date.getFullYear(), day: date.getDate(), month: date.getMonth()};

		if (date.hour > 11){
			date.meridiem = {current: " PM", other: " AM"};
		}
		else {
			date.meridiem = {current: " AM", other: " PM"};
		}

		date.hour = date.hour % 12;
		if (date.hour == 0){
			date.hour = 12;
		}

		var months = {0: "January", 1: "February", 2:"March", 3: "April", 4: "May",
				5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"}

		switch(NT.interval){
			case "minute":
				periodStart = date.hour + ":" + date.min + date.meridiem.current;

				if (date.min == 59){
					if (date.hour == 12){
						periodEnd = "1:00" + date.meridiem.current;
					}
					else if (date.hour == 11){
						periodEnd = date.hour+1 + ":00" + date.meridiem.other;	
					}
					else {
						periodEnd = date.hour+1 + ":00" + date.meridiem.current;
					}
				}
				else if(date.min < 10){
					periodEnd = date.hour + ":0" + (date.min+1) + date.meridiem.current;
					periodStart = date.hour + ":0" + date.min + date.meridiem.current;
				}
				else {
					periodEnd = date.hour + ":" + (date.min+1) + date.meridiem.current;
				}
				
				break;


			case "hour":
			
				periodStart = date.hour + ":00" + date.meridiem.current;

				if (date.hour == 11){
					periodEnd = "12:00" + date.meridiem.other;
				}
				else if (date.hour == 12){
					periodEnd = "1:00" + date.meridiem.current;
				}
				else {
					periodEnd = date.hour+1 + ":00" + date.meridiem.current;
				}

				break;
				

			case "day":
				periodEnd = moment(periodStart).add('days', 1)._d;
				periodStart = months[ date.month ] + " " + date.day;

				periodEnd = months[ periodEnd.getMonth() ] + " " + periodEnd.getDate();

				break;

			case "month":
				periodStart = months[date.month]

				if (date.month == 11){
					periodEnd = months[0]
				}
				else {
					periodEnd = months[date.month+1]
				}
				break;


			case "year":

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

	//pushes into periods, labels, and values reset in getAllPeriods from numbers object
	NT.storePeriod = function(time, numbers){
		var period = NT.getPeriodStartEnd( time );

		if (numbers[ time ]){
			var tableValue = numbers[ time ];
			var chartValue = numbers[ time ];
		}
		else {
			var tableValue = "N/A";
			var chartValue = 0;
		}
		periods.push( [ period[0], period[1], tableValue ] );
		labels.push( period[0] );
		values.push( chartValue );

	}


	NT.getAllPeriods = function(numbers){

		periods = [], labels = [], values = [];

		if ( $.isEmptyObject(numbers) ){
			var periodGoal = NT.ending;
			var nextPeriod = NT.beginning, periodComparison;

			while (nextPeriod == NT.beginning || periodComparison < periodGoal){
				NT.storePeriod(nextPeriod, {});
				nextPeriod = moment(nextPeriod *1000).add(NT.interval, 1)._d.getTime() /1000;
				periodComparison = NT.getPeriodComparison(nextPeriod);

			}

			NT.storePeriod(periodGoal, {});
			return {everything: periods, labels: labels, values: values};
		}

		//IE doesn't recognize Object.keys()
		var keys = [];
		for (var prop in numbers){
			keys.push(prop);
		}

		keys.sort()

		for (var i=0; i< keys.length; i++){

			var periodGoal = keys[0];
			var nextPeriod = NT.beginning, periodComparison;

			while (i == 0 && NT.beginning < keys[0] && nextPeriod == NT.beginning || i == 0 && periodComparison < periodGoal){
				
				NT.storePeriod(nextPeriod, numbers);
				nextPeriod = moment(nextPeriod *1000).add(NT.interval, 1)._d.getTime() /1000;
				periodComparison = NT.getPeriodComparison(nextPeriod);
			}

			periodGoal = keys[i+1];			
			nextPeriod = keys[i];

			while (nextPeriod == keys[i] || keys[i+1] && periodComparison < periodGoal){
				NT.storePeriod(nextPeriod, numbers);
				nextPeriod = moment( nextPeriod *1000).add(NT.interval, 1)._d.getTime() /1000;
				periodComparison = NT.getPeriodComparison(nextPeriod);

			}

			periodGoal = NT.ending;
			nextPeriod = moment(keys[ keys.length-1 ] *1000).add(NT.interval, 1)._d.getTime() /1000;
		
			var firstTime = true;
			while (i == keys.length-1 && periodComparison < periodGoal || i == keys.length-1 && firstTime && nextPeriod < periodGoal){
				firstTime = false;
				
				NT.storePeriod(nextPeriod, numbers);
				nextPeriod = moment(nextPeriod *1000).add(NT.interval, 1)._d.getTime() /1000;
				periodComparison = NT.getPeriodComparison(nextPeriod);
			
			}
	
		}

		return {everything: periods, labels: labels, values: values};
	};

	//gets the last possible moment of a particular period
	NT.getPeriodComparison = function(period){
		return moment(period *1000).endOf(NT.interval)._d.getTime() / 1000;
	};

	NT.changeDates = function(next, newBeginning){
		NT.sendRequest(next, NT.updateInfo, newBeginning)
	};

	NT.changeInterval = function(newInterval){
		NT.interval = newInterval

		NT.sendRequest("same", NT.updateInfo)
		
	};

	NT.sendRequest = function(nextSet, callback, newBeginning){
		var ending = newBeginning ? newBeginning : NT.ending;
		$.ajax({
			url: "/numbers",
			dataType: "json",
			data: {
				request: {
					nextSet: nextSet,
					startDate: NT.beginning,
					endDate: ending,
					interval: NT.interval
				}
			},
			error: function(){
				console.log("There was an error")
			},
			success: function(data){
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

	//formats the date from the heading
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

		$("#period-title").html(from + " to " + to)

		$("#previous").html("View previous " + NT.interval + "s");
		$("#next").html("View later " + NT.interval + "s");

	}

	NT.setEndPoints = function(range){
		NT.beginning = range['from'], NT.ending = range['to'];
	};

	NT.updateInfo = function(data){
		if (!NT.useAjax){

			var data = NT.getEmbeddedData();
			NT.useAjax = true;
		}
		else {
			$("#child-cell").nextAll().remove();
		}

		NT.setEndPoints(data['range']);

		NT.renderInfo(data['totals']);
		NT.displayPeriod();
	}

	NT.setupEventHandlers = function(){
		$("#selector-container select").change(function(data){

			var selected = $( "#selector-container select option:selected" ).text()
			NT.changeInterval(selected);

		});

		$("#previous").click(function(){
			NT.changeDates("previous");
		});

		$("#next").click(function(){
			NT.changeDates("next");
		});

		$("form").submit(function(e){
			e.preventDefault();
			var date = $("form input").val().split("/")
			date[2] = parseInt(date[2])
			
			if(date[0] > 0 && date[0] < 13 && date[1] > 0 && date[1] < 32 && date[2] > 1969 && !isNaN(date[2])){
				date = moment(date[2] + "-" + date[0] + "-" + date[1])._d.getTime() /1000;
				NT.changeDates("next", date);
			}
			else {
				$("form span").addClass("show-message");
			}
		});


		$("form input").focus(function(){
			$("form span").removeClass("show-message");
			$(this).val("");
		});

		$("form input").blur(function(){
			if ( $(this).val() == "" ){
				$(this).val("MM/DD/YYYY");
			}
		});
		
	}


})(window);

$(document).ready(function(){
	if (location.href.indexOf("localhost:3000/qunit") != -1){
		return
	}
	NT.updateInfo()
	NT.setupEventHandlers();
});