// Range beacons screen.
;(function(app)
{
  app.startp5Sketch = function()
  {

    function onRange(beaconInfo)
    {
      parseThaBacon(beaconInfo);
    }

    function onError(errorMessage)
    {
      console.log('Range error: ' + errorMessage);
    }

    function parseThaBacon(beaconInfo)
    {
      console.log('parse the bacon');
      // Sort beacons by distance.
      beaconInfo.beacons.sort(function(beacon1, beacon2) {
        return beacon1.distance > beacon2.distance; });

      // Generate HTML for beacons.
      $.each(beaconInfo.beacons, function(key, beacon)
      {
        beacon.formatted = app.formatDistance(beacon.distance);
        // console.log(beacon.distance);
        // var element = $(createBeaconHTML(beacon));
        // $('#id-screen-range-beacons .style-item-list').append(element);
      });

      drawBeacons(beaconInfo);

    };

    function drawBeacons(beaconInfo) {

      $.each(beaconInfo.beacons, function(key, beacon)
      {
        distances[String(beacon.color)] = beacon.distance;
        console.log( 'distance from beacon color ' + beacon.color + ': ' + beacon.distance );
      });

      // // lightBlue = color 2
      // // green = color 1
      // // blue = color 3
      // var orig  (distances are in index.html)

      // my location
      myLocation = getCoordinate(orig["1"], orig["2"], orig["3"], distances["1"], distances["2"], distances["3"]);

      // var element = $(createBeaconHTML(beacon));
      // $('#id-screen-range-beacons .style-item-list').append(element);

      updateSketch(myLocation, orig);
    }


    /**
     *  [getCoordinate description]
     *  @param  {Object} a  vertex with .x and .y value
     *  @param  {Object} b  vertex with .x and .y value
     *  @param  {Object} c  vertex with .x and .y value
     *  @param  {Number} dA distance
     *  @param  {Number} dB distance
     *  @param  {Number} dC distance
     *  @return {[type]}    [description]
     */
    function getCoordinate(a, b, c, dA, dB, dC) {
        var W, Z, x, y, y2;

        W = dA*dA - dB*dB - a.x*a.x - a.y*a.y + b.x*b.x + b.y*b.y;
        Z = dB*dB - dC*dC - b.x*b.x - b.y*b.y + c.x*c.x + c.y*c.y;


        x = (W*(c.y-b.y) - Z*(b.y-a.y)) / (2 * ((b.x-a.x)*(c.y-b.y) - (c.x-b.x)*(b.y-a.y)));
        y = (W - 2*x*(b.x-a.x)) / (2*(b.y-a.y));


        //y2 is a second measure of y to mitigate errors
        y2 = (Z - 2*x*(c.x-b.x)) / (2*(c.y-b.y));

        y = (y + y2) / 2;

        return {"x" : x, "y": y};
    }


    function updateSketch(myLocation, orig) {
      // console.log(myLocation.x);
      // console.log(myLocation.y);
      drawP5();
    }


    // function getCoodinates2(a, b, c, dA, dB, dC) {

    //   var theta = arccos( xe / B ) - arccos( ( (A^2) + (B^2) - (C^2) ) / ( 2*A*B ) ) 

    //   var x = r.cos(theta)

    //   var y = r.sin(theta)

    // }

  //   function createBeaconHTML(beacon)
  //   {
  //     var colorClasses = app.beaconColorStyle(beacon.color);
  //     var htm = '<div class="' + colorClasses + '">'
  //       + '<table><tr><td>Major</td><td>' + beacon.major
  //       + '</td></tr><tr><td>Minor</td><td>' + beacon.minor
  //       + '</td></tr><tr><td>RSSI</td><td>' + beacon.rssi
  //     if (beacon.proximity)
  //     {
  //       htm += '</td></tr><tr><td>Proximity</td><td>'
  //         + app.formatProximity(beacon.proximity)
  //     }
  //     if (beacon.distance)
  //     {
  //       htm += '</td></tr><tr><td>Distance</td><td>'
  //         + app.formatDistance(beacon.distance)
  //     }
  //     htm += '</td></tr></table></div>';
  //     return htm;
  //   };

  //   // Show screen.
  //   app.showScreen('id-screen-range-beacons');
  //   $('#id-screen-range-beacons .style-item-list').empty();

    // Request authorisation.
    estimote.beacons.requestAlwaysAuthorization();

    // Start ranging.
    estimote.beacons.startRangingBeaconsInRegion(
      {}, // Empty region matches all beacons.
      onRange,
      onError);
  };

  app.stopRangingBeacons = function()
  {
    estimote.beacons.stopRangingBeaconsInRegion({});
    app.showHomeScreen();
  };

})(app);
