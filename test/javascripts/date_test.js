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

test('getAllPeriods - two neighborly periods without ajax - day', function() {
  NT.interval = "day"
  NT.useAjax = false;

  var stub = sinon.stub(NT, "getEmbeddedData", function(){
    console.log("I used this one")
    return {1386903537: 2447, 1386953890: 138}

  });

    var periods = NT.getAllPeriods()
    var expectation = [["December 12", "December 13", 2447],
      ["December 13", "December 14", 138]];

    stub.restore();

    deepEqual(periods, expectation, 'end of period by day ');

});

test('getAllPeriods - two neighborly periods without ajax - min', function() {
  NT.interval = "min"
  NT.useAjax = false;

  var stub = sinon.stub(NT, "getEmbeddedData", function(){
    console.log("I used this one")
    return {1386953890: 2447, 1386953950: 138}

  });

    var periods = NT.getAllPeriods()
    var expectation = [["11:58 AM", "11:59 AM", 2447],
      ["11:59 AM", "12:00 PM", 138]];

    stub.restore();

    deepEqual(periods, expectation, 'end of period by day ');

});

// test('getAllPeriods - two neighborly periods - hour', function() {
//   NT.interval = "day"

//     var stub = sinon.stub(NT, "getEmbeddedData", function(){
//     console.log("I used this one")
//     return {1386903537: 2447, 1386953890: 138}

//   });

//     var periods = NT.getAllPeriods()
//     var expectation = [["December 12", "December 13", 2447],
//       ["December 13", "December 14", 138]];

//     deepEqual(periods, expectation, 'end of period by day ');

// });

// test('getAllPeriods - two neighborly periods - month', function() {
//   NT.interval = "day"

//     var stub = sinon.stub(NT, "getEmbeddedData", function(){
//     console.log("I used this one")
//     return {1386903537: 2447, 1386953890: 138}

//   });

//     var periods = NT.getAllPeriods()
//     var expectation = [["December 12", "December 13", 2447],
//       ["December 13", "December 14", 138]];

//     deepEqual(periods, expectation, 'end of period by day ');

// });

// test('getAllPeriods - two neighborly periods - year', function() {
//   NT.interval = "day"

//     var stub = sinon.stub(NT, "getEmbeddedData", function(){
//     console.log("I used this one")
//     return {1386903537: 2447, 1386953890: 138}

//   });

//     var periods = NT.getAllPeriods()
//     var expectation = [["December 12", "December 13", 2447],
//       ["December 13", "December 14", 138]];

//     deepEqual(periods, expectation, 'end of period by day ');

// });



// //Fill in the missing periods//////////
