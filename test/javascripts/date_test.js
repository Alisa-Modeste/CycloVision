test('The current and next month', function() {
	NumberTracker.interval = "month"
	
  	period = NumberTracker.getPeriodStartEnd(1386777583)

  equal(period[0], "December", 'beginning of period by month ');
  equal(period[1], "January", 'end of period by month ');
});

test('The current and next hour - AM', function() {
	NumberTracker.interval = "hour"
	
  	period = NumberTracker.getPeriodStartEnd(1386777583)

  equal(period[0], "10:00 AM", 'beginning of period by hour ');
  equal(period[1], "11:00 AM", 'end of period by hour ');
});

test('The current and next minute - AM', function() {
	NumberTracker.interval = "min"
	
  	period = NumberTracker.getPeriodStartEnd(1386777583)

  equal(period[0], "10:59 AM", 'beginning of period by hour ');
  equal(period[1], "11:00 AM", 'end of period by hour ');
});

test('The current and next hour - PM', function() {
	NumberTracker.interval = "hour"
	
  	period = NumberTracker.getPeriodStartEnd(1386813239)

  equal(period[0], "8:00 PM", 'beginning of period by hour ');
  equal(period[1], "9:00 PM", 'end of period by hour ');
});

test('The current and next minute - PM', function() {
	NumberTracker.interval = "min"
	
  	period = NumberTracker.getPeriodStartEnd(1386813239)

  equal(period[0], "8:53 PM", 'beginning of period by hour ');
  equal(period[1], "8:54 PM", 'end of period by hour ');
});

test('The current and next year', function() {
	NumberTracker.interval = "year"
	
  	period = NumberTracker.getPeriodStartEnd(1386813239)

  equal(period[0], "2013", 'beginning of period by year ');
  equal(period[1], "2014", 'end of period by year ');
});

test('The current and next day', function() {
	NumberTracker.interval = "day"
	
  	period = NumberTracker.getPeriodStartEnd(1386777583)

  equal(period[0], "December 11", 'beginning of period by day ');
  equal(period[1], "December 12", 'end of period by day ');
});


//Fix in the missing periods//////////

test('Fill in missing minutes (disabled Ajax)', function() {
  NumberTracker.interval = "min"
  NumberTracker.useAjax = false;

  NumberTracker.getEmbeddedData = function(){
    console.log("I used this one")
    return {1386903537: 2447, 1386903657: 138}

  }

  $("#qunit-fixture").after("<table id='body-cells'><tr id='child-cell'><tr></table>")

 // period = NumberTracker.populateTable({1386903537: 2447, 1386903657: 138})
   period = NumberTracker.populateTable()

  equal(period[0], "December 11", 'beginning of period by day ');
  equal(period[1], "December 12", 'end of period by day ');
});