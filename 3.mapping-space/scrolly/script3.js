
var cityList;
var rank;




function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    // table = loadTable("../data/all_month.csv", "csv", "header");
    rank = loadJSON('rank_big.json')
    cityList = loadJSON('cityList_big.json')

}

function setup() {
  // console.log(rank);
  // console.log(cityList);

  // for (city in cityList) {
  //   if (cityList.hasOwnProperty(city)) {
  //     console.log(city.value)
  //   }
  // }
  //

  var cityNames = [];
  var cityEarthquakes = [];

  var city_quake_list = [];


  cityNames.push(Object.keys(cityList))
  cityEarthquakes.push(Object.values(cityList))

  for (var i=0; i<cityNames[0].length; i++) {

    var city = {};

    city.name = cityNames[0][i];
    city.earthquakes = cityEarthquakes[0][i];
    city.quakeCount = cityEarthquakes[0][i].length;

    city_quake_list.push(city)
  }

  console.log(city_quake_list);
  console.log(rank);




}
