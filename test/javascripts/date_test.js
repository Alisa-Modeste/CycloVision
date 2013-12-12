test('The current and next month', function() {
	NumberTracker.interval = "month"
	
  	period = NumberTracker.getPeriodStartEnd(1386777583)

  equal(period[0], "December", 'beginning of period by month ');
  equal(period[1], "January", 'end of period by month ');
});

test('The current and next hour', function() {
	NumberTracker.interval = "hour"
	
  	period = NumberTracker.getPeriodStartEnd(1386777583)

  equal(period[0], "10:00 PM", 'beginning of period by hour ');
  equal(period[1], "11:00 PM", 'end of period by hour ');
});