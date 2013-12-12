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