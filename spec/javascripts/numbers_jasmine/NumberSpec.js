describe("populateTable", function() {
  loadFixtures('testFixture.html')

  beforeEach(function () {
    $('#fixture').remove();
   // $('body').append('<div id="fixture"></div>');
   $("#my-fixture").append('<div id="fixture"></div>');
   $("#fixture").append("<table id='body-cells'><tr id='child-cell'></tr></table>")
  });

  NT.interval = "min"
  NT.useAjax = false;

  console.log(sinon)

  var stub = sinon.stub(NT, "getEmbeddedData", function(){
    console.log("I used this one")
    return {1386903537: 2447, 1386903657: 138}

  });

console.log($("#fixture"),"$('#fixture table')", $("#fixture table"))
console.log("table",$("table"))

console.log("child-cell",$("#child-cell"))
   console.log("before populateTable")
    period = NT.populateTable()

    var $tr = $("#fixture table")
    console.log($tr, $("#fixture table"),$("#fixture"),$("#jasmine_content"))

  it("should fill in missing minutes (without Ajax)", function() {
    // player.play(song);
    // expect(player.currentlyPlayingSong).toEqual(song);

    // //demonstrates use of custom matcher
    // expect(player).toBePlaying(song);

    expect(Page).toHave("9:59 PM")
  });

  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

  // // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');

  //   player.play(song);
  //   player.makeFavorite();

  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  // //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);

  //     expect(function() {
  //       player.resume();
  //     }).toThrow("song is already playing");
  //   });
  // });
});