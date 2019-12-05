/*global d3 */


// p5 & leaflet ----------------------------------------->


    var table;

    var results = {};

    function preload() {
        // load the CSV data into our `table` variable and clip out the header row
        table = loadTable("../data/all_month.csv", "csv", "header");


    }

    function setup() {
      addCircles()
    }




    function addCircles(){

        // step through the rows of the table and add a dot for each event
        for (var i=0; i<table.getRowCount(); i++){
						console.log(i)

						var row = table.getRow(i)

            var closest = Cities.largerThan(1000000).closestTo(row.getNum('latitude'), row.getNum('longitude'), 100)
            results[row.get("id")] = closest

            // if (i<500) {
            //   var closest = Cities.closestTo(row.getNum('latitude'), row.getNum('longitude'), 100)
            //   results[row.get("id")] = closest
            // // console.log(closest)
            // }

        }

        var rank = [];
        var cities = [];

        rank = rankResults(results)[0];
        cities = rankResults(results)[1];


        console.log(rank);
        // console.log(cities);

    }


    function rankResults(results){

    var ranking = {};
    var cityList = {}

    for (earthquake in results){
        for (city in results[earthquake]){
            if (ranking.hasOwnProperty(results[earthquake][city].name)){
                ranking[results[earthquake][city].name] += results[earthquake].length - city
            } else {
                ranking[results[earthquake][city].name] = results[earthquake].length - city
            }

            if (cityList.hasOwnProperty(results[earthquake][city].name)){
                if (city == 0){ //if city is the first in the array (the closest city to the earthquake)
                    cityList[results[earthquake][city].name].push(earthquake)
                }
            } else {
                if (city == 0){
                    cityList[results[earthquake][city].name] = []
                    cityList[results[earthquake][city].name].push(earthquake)
                }
            }

        }
    }
    // sort the object
    var rank = Object.entries(ranking)
    rank.sort((a, b) => b[1] - a[1])

		var cities = cityList

    // console.log(rank)

    return [rank, cities]
}
