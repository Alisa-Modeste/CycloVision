test('The current and next month', function() {
  NT.interval = "month"
  
    period = NT.getPeriodStartEnd(1386777583)

  equal(period[0], "December", 'beginning of period by month ');
  equal(period[1], "January", 'end of period by month ');
});

test('The current and next hour - AM', function() {
  NT.interval = "hour"
  
    period = NT.getPeriodStartEnd(1386777583)

  equal(period[0], "10:00 AM", 'beginning of period by hour ');
  equal(period[1], "11:00 AM", 'end of period by hour ');
});

test('The current and next minute - AM', function() {
  NT.interval = "min"
  
    period = NT.getPeriodStartEnd(1386777583)

  equal(period[0], "10:59 AM", 'beginning of period by hour ');
  equal(period[1], "11:00 AM", 'end of period by hour ');
});

test('The current and next hour - PM', function() {
  NT.interval = "hour"
  
    period = NT.getPeriodStartEnd(1386813239)

  equal(period[0], "8:00 PM", 'beginning of period by hour ');
  equal(period[1], "9:00 PM", 'end of period by hour ');
});

test('The current and next minute - PM', function() {
  NT.interval = "min"
  
    period = NT.getPeriodStartEnd(1386813239)

  equal(period[0], "8:53 PM", 'beginning of period by hour ');
  equal(period[1], "8:54 PM", 'end of period by hour ');
});

test('The current and next year', function() {
  NT.interval = "year"
  
    period = NT.getPeriodStartEnd(1386813239)

  equal(period[0], "2013", 'beginning of period by year ');
  equal(period[1], "2014", 'end of period by year ');
});

test('The current and next day', function() {
  NT.interval = "day"
  
    period = NT.getPeriodStartEnd(1386777583)

  equal(period[0], "December 11", 'beginning of period by day ');
  equal(period[1], "December 12", 'end of period by day ');
});

// Wrap getEmbeddedData

//Get the periods//////////

// test('getAllPeriods - two neighborly periods without ajax - day', function() {
//   NT.interval = "day"
//   NT.useAjax = false;

//   var numbers = {1386903537: 2447, 1386953890: 138};

//   var periods = NT.getAllPeriods(numbers);
//   var expectation = [["December 12", "December 13", 2447],
//     ["December 13", "December 14", 138]];

//   deepEqual(periods, expectation, 'end of period by day ');

// });

// test('getAllPeriods - two neighborly periods without ajax - min', function() {
//   NT.interval = "min"
//   NT.useAjax = false;

//   var numbers = {1386953890: 2447, 1386953950: 138};

//     var periods = NT.getAllPeriods(numbers);
//     var expectation = [["11:58 AM", "11:59 AM", 2447],
//       ["11:59 AM", "12:00 PM", 138]];

//     deepEqual(periods, expectation, 'end of period by day ');

// });

// test('getAllPeriods - two neighborly periods without ajax - hour', function() {
//   NT.interval = "hour"
//   NT.useAjax = false;

//   var numbers = {1387043439: 2447, 1387047039: 138};

//     var periods = NT.getAllPeriods(numbers);
//     var expectation = [["12:00 PM", "1:00 PM", 2447],
//       ["1:00 PM", "2:00 PM", 138]];

//     deepEqual(periods, expectation, 'end of period by day ');

// });

// test('getAllPeriods - two neighborly periods without ajax - month', function() {
//   NT.interval = "month"
//   NT.useAjax = false;

//   var numbers = {1387047039: 2447, 1389725439: 138};

//     var periods = NT.getAllPeriods(numbers);
//     var expectation = [["December", "January", 2447],
//       ["January", "February", 138]];

//     deepEqual(periods, expectation, 'end of period by day ');

// });

// test('getAllPeriods - two neighborly periods without ajax - year', function() {
//   NT.interval = "year"
//   NT.useAjax = false;

//   var numbers = {1387047039: 2447, 1389725439: 138};
//   console.log('')
// console.log('start year')
//     var periods = NT.getAllPeriods(numbers);
    
// console.log('end year')
//     var expectation = [[2013, 2014, 2447],
//       [2014, 2015, 138]];

//     deepEqual(periods, expectation, 'end of period by day ');

// });


// //Fill in the missing periods//////////

// test('getAllPeriods - two periods with a gap without ajax - day', function() {
//   NT.interval = "day"
//   NT.useAjax = false;

//   var numbers = {1386978639: 2447, 1387133439: 138};
//   console.log('')
// console.log('start day')
//     var periods = NT.getAllPeriods(numbers);

//   console.log('end day')
//     var expectation = [["December 13", "December 14", 2447],
//       ["December 14", "December 15", 0],
//       ["December 15", "December 16", 138]];

//     deepEqual(periods, expectation, 'the gap in days was filled ');

// });

test('getAllPeriods - two periods with a gap without ajax - min', function() {
  NT.interval = "min"
  NT.useAjax = false;

  var numbers = {1386953890: 2447, 1386954039: 138};

  var periods = NT.getAllPeriods(numbers);

  var expectation = [["11:58 AM", "11:59 AM", 2447],
    ["11:59 AM", "12:00 PM", 0],
    ["12:00 PM", "12:01 PM", 138]];

  deepEqual(periods, expectation, 'the gap in minutes was filled ');

});




















// test('getAllPeriods - two periods with a gap without ajax - hour', function() {
//   NT.interval = "hour"
//   NT.useAjax = false;

//   var numbers = {1387040400: 2447, 1387051199: 138};
// console.log('start hour')
//     var periods = NT.getAllPeriods(numbers);
//     console.log("end hour")

//     var expectation = [["12:00 PM", "1:00 PM", 2447],
//       ["1:00 PM", "2:00 PM", 0],
//       ["2:00 PM", "3:00 PM", 138]];

//     deepEqual(periods, expectation, 'end of period by day ');

// });

// test('getAllPeriods - two periods with a gap without ajax - month', function() {
//   NT.interval = "month"
//   NT.useAjax = false;

//   var numbers = {1387047039: 2447, 1389725439: 138}

//     var periods = NT.getAllPeriods(numbers);
//     var expectation = [["December", "January", 2447],
//       ["January", "February", 138]];

//     deepEqual(periods, expectation, 'end of period by day ');

// });

// test('getAllPeriods - two periods with a gap without ajax - year', function() {
//   NT.interval = "year"
//   NT.useAjax = false;

//   var numbers = {1387047039: 2447, 1389725439: 138}

//     var periods = NT.getAllPeriods(numbers);
//     var expectation = [[2013, 2014, 2447],
//       [2014, 2015, 138]];

//     deepEqual(periods, expectation, 'end of period by day ');

// });