test('The current and next month', function() {
	NumberTracker.interval = "month"
  	period = NumberTracker.getPeriodStartEnd(1386777583)

  equal(period[0], "December", 'beginning in ');
});