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
  NT.interval = "minute"
  
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
  NT.interval = "minute"
  
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
//   NT.interval = "minute"
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

test('getAllPeriods - two periods with a gap without ajax - day', function() {
  NT.interval = "day"
  NT.useAjax = false;

  var numbers = {1386978639: 2447, 1387133439: 138};
  //12/13/2013 6:50:39 PM GMT-5
  //12/15/2013 1:50:39 PM GMT-5

    var periods = NT.getAllPeriods(numbers);

    var expectation = {
      "everything": [["December 13", "December 14", 2447],
      ["December 14", "December 15", 0],
      ["December 15", "December 16", 138]],
      "labels": ["December 13", "December 14", "December 15"],
      "values": [2447, 0, 138]

    };

    deepEqual(periods, expectation, 'the gap in days was filled ');

});

test('getAllPeriods - two periods with a gap without ajax - min (far apart)', function() {
  NT.interval = "minute"
  NT.useAjax = false;

  var numbers = {1386953880: 2447, 1386954059: 138};

  var periods = NT.getAllPeriods(numbers);

  var expectation = {
      "everything": [["11:58 AM", "11:59 AM", 2447],
    ["11:59 AM", "12:00 PM", 0],
    ["12:00 PM", "12:01 PM", 138]],
      "labels": ["11:58 AM", "11:59 AM", "12:00 PM"],
      "values": [2447, 0, 138]

    };

  deepEqual(periods, expectation, 'the gap in minutes was filled ');

});

test('getAllPeriods - two periods with a gap without ajax - min (close together)', function() {
  NT.interval = "minute"
  NT.useAjax = false;

  var numbers = {1386953939: 2447, 1386954000: 138};

  var periods = NT.getAllPeriods(numbers);

  var expectation = {
      "everything": [["11:58 AM", "11:59 AM", 2447],
    ["11:59 AM", "12:00 PM", 0],
    ["12:00 PM", "12:01 PM", 138]],
      "labels": ["11:58 AM", "11:59 AM", "12:00 PM"],
      "values": [2447, 0, 138]

    };

  deepEqual(periods, expectation, 'the gap in minutes was filled ');

});

test('getAllPeriods - two periods with a gap without ajax - hour (far apart)', function() {
  NT.interval = "hour"
  NT.useAjax = false;

  var numbers = {1386950400: 2447, 1386961199: 138};

  var periods = NT.getAllPeriods(numbers);

  var expectation = {
      "everything": [["11:00 AM", "12:00 PM", 2447],
    ["12:00 PM", "1:00 PM", 0],
    ["1:00 PM", "2:00 PM", 138]],
      "labels": ["11:00 AM", "12:00 PM", "1:00 PM"],
      "values": [2447, 0, 138]

    };

  deepEqual(periods, expectation, 'the gap in minutes was filled ');

});

test('getAllPeriods - two periods with a gap without ajax - hour (close together)', function() {
  NT.interval = "hour"
  NT.useAjax = false;

  var numbers = {1386953999: 2447, 1386957600: 138};

  var periods = NT.getAllPeriods(numbers);

  var expectation = {
      "everything": [["11:00 AM", "12:00 PM", 2447],
    ["12:00 PM", "1:00 PM", 0],
    ["1:00 PM", "2:00 PM", 138]],
      "labels": ["11:00 AM", "12:00 PM", "1:00 PM"],
      "values": [2447, 0, 138]

    };

  deepEqual(periods, expectation, 'the gap in minutes was filled ');

});


test('getAllPeriods - two periods with a gap without ajax - month (far apart)', function() {
  NT.interval = "month"
  NT.useAjax = false;

  var numbers = {1380600000: 2447, 1388512799: 138}

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [["October", "November", 2447],
      ["November", "December", 0],
      ["December", "January", 138]],
      "labels": ["October", "November", "December"],
      "values": [2447, 0, 138]

    };

    deepEqual(periods, expectation, 'end of period by day ');

});

test('getAllPeriods - two periods with a gap without ajax - month (far apart) in different years', function() {
  NT.interval = "month"
  NT.useAjax = false;

  var numbers = {1383278400: 2447, 1391191199: 138}

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [["November", "December", 2447],
      ["December", "January", 0],
      ["January", "February", 138]],
      "labels": ["November", "December", "January"],
      "values": [2447, 0, 138]

    };

    deepEqual(periods, expectation, 'end of period by day ');

});

test('getAllPeriods - two periods with a gap without ajax - month (close together) in different years', function() {
  NT.interval = "month"
  NT.useAjax = false;

  var numbers = {1385834399: 2447, 1388552400: 138}

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [["November", "December", 2447],
      ["December", "January", 0],
      ["January", "February", 138]],
      "labels": ["November", "December", "January"],
      "values": [2447, 0, 138]

    };

    deepEqual(periods, expectation, 'end of period by day ');

});


test('getAllPeriods - two periods with a gap without ajax - year (close together)', function() {
  NT.interval = "year"
  NT.useAjax = false;

  var numbers = {1388512799: 2447, 1420088400: 138}

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [[2013, 2014, 2447],
      [2014, 2015, 0],
      [2015, 2016, 138]],
      "labels": [2013, 2014, 2015],
      "values": [2447, 0, 138]

    };

    deepEqual(periods, expectation, 'end of period by day ');

});

test('getAllPeriods - two periods with a gap without ajax - year (far apart)', function() {
  NT.interval = "year"
  NT.useAjax = false;

  var numbers = {1357016400: 2447, 1451584799: 138}

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [[2013, 2014, 2447],
      [2014, 2015, 0],
      [2015, 2016, 138]],
      "labels": [2013, 2014, 2015],
      "values": [2447, 0, 138]

    };

    deepEqual(periods, expectation, 'end of period by day ');

});

//////////
//tests for getPeriodComparison

