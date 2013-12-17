test('getPeriodStartEnd - The current and next month', function() {
  NT.interval = "month"
  
    period = NT.getPeriodStartEnd(1386777583)

  equal(period[0], "December", 'beginning of period in months ');
  equal(period[1], "January", 'end of period in months ');
});

test('getPeriodStartEnd - The current and next hour - AM', function() {
  NT.interval = "hour"
  
    period = NT.getPeriodStartEnd(1386777583)

  equal(period[0], "10:00 AM", 'beginning of period in hours ');
  equal(period[1], "11:00 AM", 'end of period in hours ');
});

test('getPeriodStartEnd - The current and next minute - AM', function() {
  NT.interval = "minute"
  
    period = NT.getPeriodStartEnd(1386777583)

  equal(period[0], "10:59 AM", 'beginning of period in minutes ');
  equal(period[1], "11:00 AM", 'end of period in minutes ');
});

test('getPeriodStartEnd - The current and next hour - PM', function() {
  NT.interval = "hour"
  
    period = NT.getPeriodStartEnd(1386813239)

  equal(period[0], "8:00 PM", 'beginning of period in hours ');
  equal(period[1], "9:00 PM", 'end of period in hours ');
});

test('getPeriodStartEnd - The current and next minute - PM', function() {
  NT.interval = "minute"
  
    period = NT.getPeriodStartEnd(1386813239)

  equal(period[0], "8:53 PM", 'beginning of period in minutes ');
  equal(period[1], "8:54 PM", 'end of period in minutes ');
});

test('getPeriodStartEnd - The current and next year', function() {
  NT.interval = "year"
  
    period = NT.getPeriodStartEnd(1386813239)

  equal(period[0], "2013", 'beginning of period in years ');
  equal(period[1], "2014", 'end of period in years ');
});

test('getPeriodStartEnd - The current and next day', function() {
  NT.interval = "day"
  
    period = NT.getPeriodStartEnd(1386777583)

  equal(period[0], "December 11", 'beginning of period in days ');
  equal(period[1], "December 12", 'end of period in days ');
});

//Get the periods//////////

test('getAllPeriods - two neighborly periods without ajax - day', function() {
  NT.interval = "day"

  var numbers = {1386903537: 2447, 1386953890: 138};

  var periods = NT.getAllPeriods(numbers);
  var expectation = {
      "everything": [["December 12", "December 13", 2447],
    ["December 13", "December 14", 138]],
      "labels": ["December 12", "December 13"],
      "values": [2447, 138]

    };

  deepEqual(periods, expectation, 'periods found for days ');

});

test('getAllPeriods - two neighborly periods without ajax - min', function() {
  NT.interval = "minute";

  var numbers = {1386953890: 2447, 1386953950: 138};

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [["11:58 AM", "11:59 AM", 2447],
      ["11:59 AM", "12:00 PM", 138]],
      "labels": ["11:58 AM", "11:59 AM"],
      "values": [2447, 138]

    };

    deepEqual(periods, expectation, 'periods found for minutes ');

});

test('getAllPeriods - two neighborly periods without ajax - hour', function() {
  NT.interval = "hour";

  var numbers = {1387043439: 2447, 1387047039: 138};

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [["12:00 PM", "1:00 PM", 2447],
      ["1:00 PM", "2:00 PM", 138]],
      "labels": ["12:00 PM", "1:00 PM"],
      "values": [2447, 138]

    };

    deepEqual(periods, expectation, 'periods found for hours ');

});

test('getAllPeriods - two neighborly periods without ajax - month', function() {
  NT.interval = "month";

  var numbers = {1387047039: 2447, 1389725439: 138};

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [["December", "January", 2447],
      ["January", "February", 138]],
      "labels": ["December", "January"],
      "values": [2447, 138]

    };

    deepEqual(periods, expectation, 'periods found for months ');

});

test('getAllPeriods - two neighborly periods without ajax - year', function() {
  NT.interval = "year";

  var numbers = {1387047039: 2447, 1389725439: 138};

    var periods = NT.getAllPeriods(numbers);
    

    var expectation = {
      "everything": [[2013, 2014, 2447],
      [2014, 2015, 138]],
      "labels": [2013, 2014],
      "values": [2447, 138]

    };

    deepEqual(periods, expectation, 'periods found for years ');

});


// //Fill in the missing periods//////////

test('getAllPeriods - two periods with a gap without ajax - day (far apart)', function() {
  NT.interval = "day";

  var numbers = {1386910800: 2447, 1387169999: 138};
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

test('getAllPeriods - two periods with a gap without ajax - day (close together)', function() {
  NT.interval = "day";

  var numbers = {1386997199: 2447, 1387083600: 138};
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
  NT.interval = "minute";

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
  NT.interval = "minute";

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
  NT.interval = "hour";

  var numbers = {1386950400: 2447, 1386961199: 138};

  var periods = NT.getAllPeriods(numbers);

  var expectation = {
      "everything": [["11:00 AM", "12:00 PM", 2447],
    ["12:00 PM", "1:00 PM", 0],
    ["1:00 PM", "2:00 PM", 138]],
      "labels": ["11:00 AM", "12:00 PM", "1:00 PM"],
      "values": [2447, 0, 138]

    };

  deepEqual(periods, expectation, 'the gap in hours was filled ');

});

test('getAllPeriods - two periods with a gap without ajax - hour (close together)', function() {
  NT.interval = "hour";

  var numbers = {1386953999: 2447, 1386957600: 138};

  var periods = NT.getAllPeriods(numbers);

  var expectation = {
      "everything": [["11:00 AM", "12:00 PM", 2447],
    ["12:00 PM", "1:00 PM", 0],
    ["1:00 PM", "2:00 PM", 138]],
      "labels": ["11:00 AM", "12:00 PM", "1:00 PM"],
      "values": [2447, 0, 138]

    };

  deepEqual(periods, expectation, 'the gap in hours was filled ');

});


test('getAllPeriods - two periods with a gap without ajax - month (far apart)', function() {
  NT.interval = "month";

  var numbers = {1380600000: 2447, 1388512799: 138}

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [["October", "November", 2447],
      ["November", "December", 0],
      ["December", "January", 138]],
      "labels": ["October", "November", "December"],
      "values": [2447, 0, 138]

    };

    deepEqual(periods, expectation, 'the gap in months was filled ');

});

test('getAllPeriods - two periods with a gap without ajax - month (far apart) in different years', function() {
  NT.interval = "month";

  var numbers = {1383278400: 2447, 1391191199: 138}

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [["November", "December", 2447],
      ["December", "January", 0],
      ["January", "February", 138]],
      "labels": ["November", "December", "January"],
      "values": [2447, 0, 138]

    };

    deepEqual(periods, expectation, 'the gap in months was filled ');

});

test('getAllPeriods - two periods with a gap without ajax - month (close together) in different years', function() {
  NT.interval = "month";

  var numbers = {1385834399: 2447, 1388552400: 138}

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [["November", "December", 2447],
      ["December", "January", 0],
      ["January", "February", 138]],
      "labels": ["November", "December", "January"],
      "values": [2447, 0, 138]

    };

    deepEqual(periods, expectation, 'the gap in months was filled ');

});


test('getAllPeriods - two periods with a gap without ajax - year (close together)', function() {
  NT.interval = "year";

  var numbers = {1388512799: 2447, 1420088400: 138}

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [[2013, 2014, 2447],
      [2014, 2015, 0],
      [2015, 2016, 138]],
      "labels": [2013, 2014, 2015],
      "values": [2447, 0, 138]

    };

    deepEqual(periods, expectation, 'the gap in years was filled ');

});

test('getAllPeriods - two periods with a gap without ajax - year (far apart)', function() {
  NT.interval = "year";

  var numbers = {1357016400: 2447, 1451584799: 138}

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [[2013, 2014, 2447],
      [2014, 2015, 0],
      [2015, 2016, 138]],
      "labels": [2013, 2014, 2015],
      "values": [2447, 0, 138]

    };

    deepEqual(periods, expectation, 'the gap in years was filled ');

});

//getAllPeriods - test for completely empty period
test('getAllPeriods - get period when there is no data for the range - year', function() {
  NT.interval = "year";

  var numbers = {}
  NT.beginning = 1387219350;
  NT.ending = 1513449750;

    var periods = NT.getAllPeriods(numbers);
    var expectation = {
      "everything": [[2013, 2014, 0],
      [2014, 2015, 0],
      [2015, 2016, 0],
      [2016, 2017, 0],
      [2017, 2018, 0]],
      "labels": [2013, 2014, 2015, 2016, 2017],
      "values": [0, 0, 0, 0, 0]

    };

    deepEqual(periods, expectation, 'zerofied range ');

});

// test('getAllPeriods - get period when there is no data for the range - year', function() {
//   NT.interval = "year"
// 

//   var numbers = {}
//   NT.beginning = 1387219350;
//   NT.ending = 1513449750;

//     var periods = NT.getAllPeriods(numbers);
//     var expectation = {
//       "everything": [[2013, 2014, 0],
//       [2014, 2015, 0],
//       [2015, 2016, 0],
//       [2016, 2017, 0],
//       [2017, 2018, 0]],
//       "labels": [2013, 2014, 2015, 2016, 2017],
//       "values": [0, 0, 0, 0, 0]

//     };

//     deepEqual(periods, expectation, 'zerofied range ');

// });

// test('getAllPeriods - get period when there is no data for the range - year', function() {
//   NT.interval = "year"
// 

//   var numbers = {}
//   NT.beginning = 1387219350;
//   NT.ending = 1513449750;

//     var periods = NT.getAllPeriods(numbers);
//     var expectation = {
//       "everything": [[2013, 2014, 0],
//       [2014, 2015, 0],
//       [2015, 2016, 0],
//       [2016, 2017, 0],
//       [2017, 2018, 0]],
//       "labels": [2013, 2014, 2015, 2016, 2017],
//       "values": [0, 0, 0, 0, 0]

//     };

//     deepEqual(periods, expectation, 'zerofied range ');

// });

// test('getAllPeriods - get period when there is no data for the range - year', function() {
//   NT.interval = "year"
// 

//   var numbers = {}
//   NT.beginning = 1387219350;
//   NT.ending = 1513449750;

//     var periods = NT.getAllPeriods(numbers);
//     var expectation = {
//       "everything": [[2013, 2014, 0],
//       [2014, 2015, 0],
//       [2015, 2016, 0],
//       [2016, 2017, 0],
//       [2017, 2018, 0]],
//       "labels": [2013, 2014, 2015, 2016, 2017],
//       "values": [0, 0, 0, 0, 0]

//     };

//     deepEqual(periods, expectation, 'zerofied range ');

// });

// test('getAllPeriods - get period when there is no data for the range - month', function() {
//   NT.interval = "year"
// 

//   var numbers = {}
//   NT.beginning = 1387219350;
//   NT.ending = 1513449750;

//     var periods = NT.getAllPeriods(numbers);
//     var expectation = {
//       "everything": [[2013, 2014, 0],
//       [2014, 2015, 0],
//       [2015, 2016, 0],
//       [2016, 2017, 0],
//       [2017, 2018, 0]],
//       "labels": [2013, 2014, 2015, 2016, 2017],
//       "values": [0, 0, 0, 0, 0]

//     };

//     deepEqual(periods, expectation, 'zerofied range ');

// });

//getAllPeriods test with NT.beginning
//getAllPeriods - where the end doesn't fill the period


//////////
//tests for getPeriodComparison
// NT.placeEndpoints()
// NT.changeDates
// NT.changeInterval
// NT.sendRequest
//formatPeriodHeading