

var cityQuakeList = [];


var cityList = [{lat: 20, long: 40, pop: 1000, name: city},
              {lat: 20, long: 40, pop: 1000, name: city},
              {lat: 20, long: 40, pop: 1000, name: city},
            ]

var quakeList = [{}]

for (const city in cityList) {
  var cityObj = {};
  var quakeCount = 0;
  for ( var i=0; i<table.getRowCount(); i++) {
    var dist = measureDistance(city.lat, city.long, table.getRow(i).getNum('latitude'),table.getRow(i).getNum('longitude'))

    if (dist < 50) {
      quakeCount++
      cityObj.name = city.name;
      cityObj.quakeCount = quakeCount;
      cityObj.quakes =


    }
  }
}
