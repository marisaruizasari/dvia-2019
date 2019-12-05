/*global d3 */

// scrollama ------------------------------------------------------>

// using d3 for convenience
		var main = d3.select('main')
		var scrolly = main.select('#scrolly');
		var figure = scrolly.select('figure');
		var article = scrolly.select('article');
		var step = article.selectAll('.step');
		// initialize the scrollama
		var scroller = scrollama();
		// generic window resize listener event
		function handleResize() {
			// 1. update height of step elements
			var stepH = Math.floor(window.innerHeight * 0.75);
			step.style('height', stepH + 'px');
			var figureHeight = window.innerHeight / 1.2
			var figureMarginTop = (window.innerHeight - figureHeight) / 2
			figure
				.style('height', figureHeight + 'px')
				.style('top', figureMarginTop + 'px');
			// 3. tell scrollama to update new element dimensions
			scroller.resize();
		}
		// scrollama event handlers
		function handleStepEnter(response) {
			// console.log(response)
			// response = { element, direction, index }
			// add color to current step only
			step.classed('is-active', function (d, i) {
				return i === response.index;
			})
			// update graphic based on step
			figure.select('p').text(response.index + 1);

      // var geoLocations = [{place: "Global", latlong: "[37.825415, -122.251552]", zoom: 2},
      // {place: "California", latlong: "[37.825415, -122.251552]", zoom: 7},
      // {place: "Alaska", latlong: "[61.498648, -150.317009]", zoom: 7},
      // {place: "Chile", latlong: "[37.825415, -122.251552]", zoom: 7},
      // {place: "Puerto Rico", latlong: "[18.426237, -66.540340]", zoom: 7},
      // ]
      //
      // for (var i = 0; i < geoLocations.length; i++) {
      //   if (response.index == i) {
      //     prMap.panTo(geoLocations[i].latLong).setZoom(geoLocations[i].zoom)
      //   }
      // }

      if (response.index == 0) {
        prMap.setZoom(2)
      } else if (response.index == 1) {
        prMap.panTo([33.950856, -117.395920]).setZoom(10)
      } else if (response.index == 2) {
        prMap.panTo([32.804620, -117.124126])
      } else if (response.index == 3) {
        prMap.panTo([37.320562, -121.855905])
      } else if (response.index == 4) {
        prMap.panTo([37.763108, -122.434513])
      } else if (response.index == 5) {
        prMap.panTo([32.503631, -116.968417])
      } else if (response.index == 6) {
        prMap.panTo([36.182578, -115.164023])
      }
		}
		function setupStickyfill() {
			d3.selectAll('.sticky').each(function () {
				Stickyfill.add(this);
			});
		}
		function init() {
			setupStickyfill();
			// 1. force a resize on load to ensure proper dimensions are sent to scrollama
			handleResize();
			// 2. setup the scroller passing options
			// 		this will also initialize trigger observations
			// 3. bind scrollama event handlers (this can be chained like below)
			scroller.setup({
				step: '#scrolly article .step',
				offset: 0.28,
				debug: false,
			})
				.onStepEnter(handleStepEnter)
			// setup resize event
			window.addEventListener('resize', handleResize);
		}
		// kick things off
		init();


// p5 & leaflet ----------------------------------------->

    // the data loaded from a USGS-provided CSV file
    var table;



    // my leaflet.js map
    var prMap;

    var results = {};

    var cityList;
    var rank;

    var population;

    // prMap = L.map('pr-map').setView([18.426237, -66.540340], 3);

    // var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    //    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //    subdomains: 'abcd',
    //    maxZoom: 19
    // });
    //
    // CartoDB_Positron.addTo(prMap);

    function preload() {
        // load the CSV data into our `table` variable and clip out the header row
        table = loadTable("../data/all_month.csv", "csv", "header");

        rank = loadJSON('rank_big.json')
        cityList = loadJSON('cityList_big.json')

        population = loadTable("../data/Population_data.csv", "csv", "header");



    }

    function setup() {
      setupMap()
      addCircles()

      // console.log("test:" + rank);
      //
      // var ranked_city_list = [];

      // for (var a=0; a<rank.length; a++) {
      //   console.log(rank[a])
      //   ranked_city_list.push(rank[a])
      // }
      //
      // console.log("ranked cities: " + ranked_city_list)





      for (var i=0; i<population.getRowCount(); i++){
          var popRow = population.getRow(i)
          console.log(popRow);
}


    }

    function setupMap(){

        prMap = L.map('pr-map', { zoomControl: false }).setView([33.950856, -117.395920], 2);

        prMap.dragging.disable();

        // load a set of map tiles – choose from the different providers demoed here:
        // https://leaflet-extras.github.io/leaflet-providers/preview/
        var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	         subdomains: 'abcd',
	         maxZoom: 19
        });

        CartoDB_Positron.addTo(prMap);

    }


    function addCircles(){
        // calculate minimum and maximum values for magnitude and depth
        var magnitudeMin = 0.0;
        var magnitudeMax = columnMax(table, "mag");
        // console.log('magnitude range:', [magnitudeMin, magnitudeMax])

        var depthMin = 0.0;
        var depthMax = columnMax(table, "depth");
        // console.log('depth range:', [depthMin, depthMax])

        // console.log("row count: " + table.getRowCount())


        // step through the rows of the table and add a dot for each event
        for (var i=0; i<table.getRowCount(); i++){
            var row = table.getRow(i)

            // skip over any rows where the magnitude data is missing
            if (row.get('mag')==''){
                continue
            }


            // var closest = Cities.closestTo(row.getNum('latitude'), row.getNum('longitude'), 100)
            // results[row.get("id")] = closest

            // if (i<500) {
            //   var closest = Cities.closestTo(row.getNum('latitude'), row.getNum('longitude'), 100)
            //   results[row.get("id")] = closest
            // // console.log(closest)
            // }


            // create a new dot
            var circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
                color: 'black',      // the dot stroke color
                weight: 0.1,
                fillColor: '#F77C27', // the dot fill color
                fillOpacity: 0.25,  // use some transparency so we can see overlaps
                radius: row.getNum('mag') * 4000
            })

            // place the new dot on the map
              circle.addTo(prMap);

        }

        // var rank = [];
        // var cityList = {};
        //
        // rank = rankResults(results)[0];
        // cityList = rankResults(results)[1];
        //
        //
        // console.log(rank);
        // // console.log(cityList);

    }

    // get the maximum value within a column
    function columnMax(tableObject, columnName){
        // get the array of strings in the specified column
        var colStrings = tableObject.getColumn(columnName);

        // convert to a list of numbers by running each element through the `float` function
        var colValues = _.map(colStrings, float);

        // find the largest value in the column
        return _.max(colValues);
    }

    // get the minimum value within a column
    function columnMin(tableObject, columnName){
        // get the array of strings in the specified column
        var colStrings = tableObject.getColumn(columnName);

        // convert to a list of numbers by running each element through the `float` function
        var colValues = _.map(colStrings, float);

        // find the largest value in the column
        return _.min(colValues);
    }



//     function rankResults(results){
//
//     var ranking = {};
//     var cityList = {}
//
//     for (earthquake in results){
//         for (city in results[earthquake]){
//             if (ranking.hasOwnProperty(results[earthquake][city].name)){
//                 ranking[results[earthquake][city].name] += results[earthquake].length - city
//             } else {
//                 ranking[results[earthquake][city].name] = results[earthquake].length - city
//             }
//
//             if (cityList.hasOwnProperty(results[earthquake][city].name)){
//                 if (city == 0){ //if city is the first in the array (the closest city to the earthquake)
//                     cityList[results[earthquake][city].name].push(earthquake)
//                 }
//             } else {
//                 if (city == 0){
//                     cityList[results[earthquake][city].name] = []
//                     cityList[results[earthquake][city].name].push(earthquake)
//                 }
//             }
//
//         }
//     }
//     //sort the object
//     var rank = Object.entries(ranking)
//     rank.sort((a, b) => b[1] - a[1])
//
//     // console.log(rank)
//
//     return [rank, cityList]
// }






// D3 --------------->


// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 60},
width = 600 - margin.left - margin.right,
height = 200 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
var y = d3.scaleLinear()
    .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".chart").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

data = [{City: "Riverside", Google_Pop: 327728},{City: "San Diego", Google_Pop: 1420000},{City: "San Jose", Google_Pop: 1035000},{City: "San Francisco", Google_Pop: 884363},{City: "Tijuana", Google_Pop: 1301000},{City: "Sacramento", Google_Pop: 501901},]

// get the data
// d3.csv("../data/Population_data.csv", function(error, data) {
// if (error) throw error;

// format the data
data.forEach(function(d) {
d["Google_Pop"] = +d["Google_Pop"];
});

// Scale the range of the data in the domains
x.domain(data.map(function(d) { return d.City; }));
y.domain([0, d3.max(data, function(d) { return d["Google_Pop"]; })]);

// append the rectangles for the bar chart
svg.selectAll(".bar")
.data(data)
.enter().append("rect")
.attr("class", "bar")
.attr("x", function(d) { return x(d.City); })
.attr("width", x.bandwidth())
.attr("y", function(d) { return y(d["Google_Pop"]); })
.attr("height", function(d) { return height - y(d["Google_Pop"]); })
.attr("fill", function(d,i) {
  var color;
  if (i==0) {
    color = "#DE986F"
  } else {
    color = "#B6CCD1"
  }
  return color;
});

// add the x Axis
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
.call(d3.axisLeft(y));

// });




d3.json("cityList_big.json").then(data => {


d3.csv("../data/all_month.csv").then(earthquake_data => {

// city list ----------->
  var city_Names = [];
  var earthquake_list = [];
  var fullEarthquakeCityList = [];


  city_Names = Object.keys(data)
  earthquake_list = Object.values(data)

  for (var x=0; x<city_Names.length; x++) {
    var object = {};

    object.city = city_Names[x];
    object.earthquakes = earthquake_list[x];
    object.quakeCount = earthquake_list[x].length;

    fullEarthquakeCityList.push(object)
  }


  console.log(fullEarthquakeCityList);


// all earthquake data ----------->
e_data = [];
e_data.push(earthquake_data);

console.log("earthquake data:" + e_data[0].length)


// var cityNames = [];
// var cityEarthquakes = [];
//
// var city_quake_list = [];

// var city = {};
//
// city.name = cityNames[0][i];
// city.earthquakes = cityEarthquakes[0][i];
// city.quakeCount = cityEarthquakes[0][i].length;
//
// city_quake_list.push(city)

var cityEarthquakeArray = [];

// generate json of cities with earthquake list and info for viz
// fullEarthquakeCityList.forEach(city => {
//   console.log("*****")
//
//   var cityEarthquakes = {}
//   cityEarthquakes.city = city.city;
//   cityEarthquakes.earthquakes_list = [];
//
//
//   city.earthquakes.forEach(earthquake => {
//     // console.log(earthquake)
//     for (var i=0; i<e_data[0].length; i++) {
//
//         if (e_data[0][i].id.match(earthquake)) {
//           // console.log("___________________")
//           // console.log(e_data[0][i])
//           cityEarthquakes.earthquakes_list.push(e_data[0][i])
//
//         }
//     }
//   })
//   cityEarthquakes.quakeCount = cityEarthquakes.earthquakes_list.length;
//   cityEarthquakeArray.push(cityEarthquakes);
//   // console.log(cityEarthquakes);
// })
//
// console.log(cityEarthquakeArray)



})

});



// bubble chart --------------------------->

// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".bubble")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.json("quakeList.json").then(data => {



data = data[0].earthquakes_list
console.log(data)

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 4])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 25])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([0, 5])
    .range([ 1, 50]);

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(parseFloat(d.mag)); } )
      .attr("cy", function (d) { return y(parseFloat(d.depth)); } )
      .attr("r", function (d) { return z(parseFloat(d.magError)); } )
      .style("fill", "#DE986F")
      .style("opacity", "0.7")
      .attr("stroke", "black")






})












    // function preload() {
    //     // load the CSV data into our `table` variable and clip out the header row
    //     table = loadTable("../data/all_month.csv", "csv", "header");
    // }
    //
    // function setup() {
    //     // first, call our map initialization function (look in the html's style tag to set its dimensions)
    //     setupMap()
    //
    //     // call our function (defined below) that populates the maps with markers based on the table contents
    //
    //     // addCircles();
    //
    //     // // generate a p5 diagram that complements the map, communicating the earthquake data non-spatially
    //     // createCanvas(800, 600)
    //     // background(222)
    //     //
    //     // fill(0)
    //     // noStroke()
    //     // textSize(16)
    //     // text(`Plotting ${table.getRowCount()} seismic events`, 20, 40)
    //     // text(`Largest Magnitude: ${columnMax(table, "mag")}`, 20, 60)
    //     // text(`Greatest Depth: ${columnMax(table, "depth")}`, 20, 80)
    // }
    //
    // function setupMap(){
    //     /*
    //     LEAFLET CODE
    //
    //     In this case "L" is leaflet. So whenever you want to interact with the leaflet library
    //     you have to refer to L first.
    //     so for example L.map('mapid') or L.circle([lat, long])
    //     */
    //
    //     // create your own map
    //     prMap = L.map('pr-map').setView([18.426237, -66.540340], 7);
    //
    //
    //
    //     // load a set of map tiles – choose from the different providers demoed here:
    //     // https://leaflet-extras.github.io/leaflet-providers/preview/
    //
    //     var Stamen_Terrain_pr = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
    //       attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //       subdomains: 'abcd',
    //       minZoom: 0,
    //       maxZoom: 18,
    //       ext: 'png'
    //     });
    //
    //     var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	  //        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	  //        subdomains: 'abcd',
	  //        maxZoom: 19
    //     });
    //
    //     CartoDB_Positron.addTo(prMap);
    //
    //     // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //     //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //     //     maxZoom: 18,
    //     //     id: 'mapbox.streets',
    //     //     accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    //     // }).addTo(mymap);
    // }
    //
    //
    //
    // function addCircles(){
    //     // calculate minimum and maximum values for magnitude and depth
    //     var magnitudeMin = 0.0;
    //     var magnitudeMax = columnMax(table, "mag");
    //     console.log('magnitude range:', [magnitudeMin, magnitudeMax])
    //
    //     var depthMin = 0.0;
    //     var depthMax = columnMax(table, "depth");
    //     console.log('depth range:', [depthMin, depthMax])
    //
    //     // step through the rows of the table and add a dot for each event
    //     for (var i=0; i<table.getRowCount(); i++){
    //         var row = table.getRow(i)
    //
    //         // skip over any rows where the magnitude data is missing
    //         if (row.get('mag')==''){
    //             continue
    //         }
    //
    //         // create a new dot
    //         var circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
    //             color: 'black',      // the dot stroke color
    //             weight: 0.1,
    //             fillColor: '#F77C27', // the dot fill color
    //             fillOpacity: 0.25,  // use some transparency so we can see overlaps
    //             radius: row.getNum('mag') * 4000
    //         })
    //
    //         // place the new dot on the map
    //           circle.addTo(prMap);
    //
    //     }
    // }
    //
    //
    // // removes any circles that have been added to the map
    // function removeAllCirclesPR(){
    //     prMap.eachLayer(function(layer){
    //         if (layer instanceof L.Circle){
    //             prMap.removeLayer(layer)
    //         }
    //     })
    // }
    //
    // // get the maximum value within a column
    // function columnMax(tableObject, columnName){
    //     // get the array of strings in the specified column
    //     var colStrings = tableObject.getColumn(columnName);
    //
    //     // convert to a list of numbers by running each element through the `float` function
    //     var colValues = _.map(colStrings, float);
    //
    //     // find the largest value in the column
    //     return _.max(colValues);
    // }
    //
    // // get the minimum value within a column
    // function columnMin(tableObject, columnName){
    //     // get the array of strings in the specified column
    //     var colStrings = tableObject.getColumn(columnName);
    //
    //     // convert to a list of numbers by running each element through the `float` function
    //     var colValues = _.map(colStrings, float);
    //
    //     // find the largest value in the column
    //     return _.min(colValues);
    // }
