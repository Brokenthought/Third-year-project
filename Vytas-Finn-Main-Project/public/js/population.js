var width = 500;
var height = 600;

var array;

var counties = [1, 25, 13, 14, 26, 2, 20, 15, 3, 4, 5, 21, 16, 6, 7, 22, 8, 27, 9, 23, 24, 17, 19, 10, 11, 12];
var countyNames = ["Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offlay", "Roscommon", "Sligo", "Tipperary", "Waterford", "Westmeath", "Wexford", "Wicklow"];
var county = 24;
var year = 1;
var oldYear = 0;


$.ajax({
    url: "json_files/population.json",
    dataType: 'json',
    jsonpCallback: 'MyJSONPCallback',
    success: function (data) {
        array = data;
    }
});



$(document).ajaxStop(function () {

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        var county = counties[countyId] * 24;

        var change = array.dataset.value[county + year] / array.dataset.value[county];

        change = change - 1;

        change = Math.round((change) * 100);
        if (year == 0) {
            return "<strong>" + countyNames[countyId] + ":</strong> Population " + array.dataset.value[county + year] + "</span>";
        }
        else if (change >= 0) {
            return "<strong>" + countyNames[countyId] + ":</strong>  Population " + array.dataset.value[county + year] + "  <br> Change since 1841: +<span style='color:green'>" + change + "%</span>";
        }
        else {
            return "<strong>" + countyNames[countyId] + ":</strong>  Population " + array.dataset.value[county + year] + "  <br> Change since 1841: <span style='color:red'>" + change + "%</span>";
        }
    });

    var HistoryTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset(function (d) {
        if (year == 5)
        { [-10, 50] }

    })
    .html(function (d) {
        return "<strong>  Hello there :</strong>  Population ";

    });

    var countyId = 0;
    var areas;
    var group
    var path;
    var canvas = d3.select("#ireland")
               .append("svg")
               .attr("width", width)
               .attr("height", height);
    d3.json("json_files/ireland.json", function (data) {

        group = canvas.selectAll("g")
       .data(data.features)
       .enter()
       .append("g")

       .attr("stroke", "black");
        group.call(tip);

        var projection = d3.geo.mercator().scale(3050).translate([650, 3610]);
        path = d3.geo.path().projection(projection);

        areas = group.append("path")
       .attr("d", path)
       .attr("class", "area")
       .attr("fill", "green")
       .attr("stroke-width", "1")



       .attr("id", function (d, i) {
           return "id" + i;
       })
       .on('mouseover', function () {
           countyId = parseInt(d3.select(this).attr("id").substr(d3.select(this).attr("id").indexOf("d") + 1));
           tip.show();

           d3.select(this)
             .transition()
             .duration(300)
             .attr('stroke-width', 3);
           clearInterval(IntervalId);
       })
        .on('mouseout', function () {
            tip.hide();
            d3.select(this)
              .transition()
              .duration(500)
              .attr('stroke-width', 1)
        });

    });


    var date = 0;
    function scale(year) {
        var county;

        if (oldYear != year && areas != null) {
            oldYear = year;

            areas.transition().duration(2000)
            .attr("transform", function (d, i) {

                var centroid = path.centroid(d),
                x = centroid[0],
                y = centroid[1];
                county = counties[i] * 24;



                var dx = 0; // x - width / 2;
                var dy = 0; // y - height / 2;
                // var dist = Math.sqrt(dx * dx + dy * dy);

                var size = array.dataset.value[county + year] / array.dataset.value[county];

                if (i == 5) {
                    if (year > 7) {
                        dx = 30;
                        dy = 0;
                    }
                }
                if (i == 8 && year > 14) {
                    dx = 38;
                    dy = -20;
                }

                if (i == 25 && year > 10) {
                    dx = 25;
                    dy = 25;
                }

                if (i == 16 && year > 18) {
                    dx = 4;
                    dy = 29;
                }

                return "translate(" + x + "," + y + ")"
                    + "scale(" + size + ")"
                    + "translate(" + -x + "," + -y + ")"
                    + "translate(" + dx + "," + dy + ")";

            });
        }
        if (year < 8) {
            $('#year').text("Year: " + ((year * 10) + 1841));
        }
        else if (year < 11) {
            $('#year').text("Year: " + ((year * 10) + 1846));
        }
        else {
            $('#year').text("Year: " + (((year - 10) * 5) + 1946));
        }

        $('#population').text("Total population: " + array.dataset.value[year]);
    }

    $(document).foundation({
        slider: {
            on_change: function () {
                year = parseInt($('#slider').attr('data-slider'))

                scale(year);

                if (year == 5) {
                    HistoryTip.show();
                }
                i = year;
               // clearInterval(IntervalId);
            }
        }
    });
    var IntervalId
    var play = true;
    var i = 0;
    $("#startButton").click(function () {
        if (play) {

            //  $('#slider').foundation('slider', 'set_value', i);
            //    i++;
            IntervalId = setInterval(function () { start() }, 1500);
            play = false;
        }
        else {
            clearInterval(IntervalId);
            play = true;
        }
    });

    function start() {
        i++;
        $('#slider').foundation('slider', 'set_value', i);
        scale(i)

        if (i > 22) { clearInterval(IntervalId); }

    }





});








//Made
//console.log(areas);
