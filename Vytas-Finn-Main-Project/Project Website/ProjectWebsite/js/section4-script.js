var width = 500;
var height = 600;

var array;
var counties = [1, 25, 13, 14, 26, 2, 20, 15, 3, 4, 5, 21, 16, 6, 7, 22, 8, 27, 9, 23, 24, 17, 19, 10, 11, 12];
var county = 24;
var year = 1;
var oldYear = 0;


$.ajax({
    url: "http://localhost/Vytas-Finn-Main-Project/Project Website/population.json",
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
        var county = countyId * 24;
        return "<strong>" + (countyId - 1) + ":</strong> <span style='color:red'> Population " + array.dataset.value[county + year] + "</span>";
    })

    var force;
    var nodes = [{ x: width / 2, y: height / 2, fixed: true }];
    var links = [];


    var num = 0;
    var countyId = 0;
    var areas;
    var i = 0;
    var path;




    var canvas = d3.select("#ireland")
               .append("svg")
               .attr("width", width)
               .attr("height", height);
    d3.json("ireland.json", function (data) {

        var group = canvas.selectAll("g")
       .data(data.features)
       .enter()
       .append("g")
       .attr("stroke", "black")
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
       })
        .on('mouseout', function () {
            tip.hide();
            d3.select(this)
              .transition()
              .duration(500)
              .attr('stroke-width', 1)
        })
        .each(function (d) {
            var x, y;
            var centroid = path.centroid(d),
                x = centroid[0],
                y = centroid[1];
            nodes.push({ x: x, y: y, charge: 0 });
        });

        var closeNodes;




        //for (var i = 0; i < nodes.length ; i++) {

        //    var dx = nodes[i].x - nodes[0].x;
        //    var dy = nodes[i].y - nodes[0].y;
        //    var dist = Math.sqrt(dx * dx + dy * dy);
        //    console.log(dist);
        //    links.push({ source: i, target: 0, length: dist });
        //}




        for (var i = 1; i < nodes.length ; i++) {

            closeNodes = [{ index: 0, dist: 9999 }, { index: 0, dist: 9999 }, { index: 0, dist: 9999 }, { index: 0, dist: 9999 }];

            for (var j = 0; j < 4 ; j++) {

                for (var k = i + 1; k < nodes.length ; k++) {

                    var dx = nodes[i].x - nodes[k].x;
                    var dy = nodes[i].y - nodes[k].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < closeNodes[j].dist
                        && dist != closeNodes[0].dist && dist != closeNodes[1].dist
                        && dist != closeNodes[2].dist && dist != closeNodes[3].dist) {

                        closeNodes[j].index = k;
                        closeNodes[j].dist = dist;
                    }
                }

                links.push({ source: i, target: closeNodes[j].index, length: closeNodes[j].dist });
            }
        }

        force = d3.layout.force()
        .size([500, 600])
        .nodes(nodes)
        .links(links);

        force.linkDistance(function (d) {
            return d.length;
        })

        force.gravity(0);


        force.charge(0);

        //force.charge(function (d) {
        //    return d.charge;
        //})


        var link = canvas.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link');

        var node = canvas.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node');

        force.on('tick', function () {
            var county;
            areas.transition().duration(2000)
            .attr("transform", function (d, i) {

                var centroid = path.centroid(d),
                px = centroid[0],
                py = centroid[1],
                x = nodes[i + 1].x - centroid[0],
                y = nodes[i + 1].y - centroid[1];

                county = counties[i] * 24;
                var size = array.dataset.value[county + year] / array.dataset.value[county];

                return "translate(" + px + "," + py + ")"
                       + "scale(" + size + ")"
                       + "translate(" + -px + "," + -py + ")"
                       + "translate(" + x + "," + y + ")";

            })
            node.attr('r', 5)
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; });

            link.attr('x1', function (d) { return d.source.x; })
                .attr('y1', function (d) { return d.source.y; })
                .attr('x2', function (d) { return d.target.x; })
                .attr('y2', function (d) { return d.target.y; });
        });


        force.start();

    });



    function scale(year) {

        var county;

        if (oldYear != year && areas != null) {
            areas.each(function (d, i) {

                var centroid = path.centroid(d),
                x = centroid[0],
                y = centroid[1];

                county = counties[i] * 24;

                var size = array.dataset.value[county + year] / array.dataset.value[county + year - 1];

                if (size < 1) {
                    size = 0;
                }
                else {
                    size = size * -400;
                }

                // nodes[i].charge = size;

                //for (var e = 0; e < links.length; e++) {

                //    if (links[e].source == nodes[i]) {


                //        links[e].length = links[e].length*size;
                //     }
                //}

                //return "translate(" + x + "," + y + ")"
                //    + "scale(" + array.dataset.value[county + year] / array.dataset.value[county] + ")"
                //    + "translate(" + -x + "," + -y + ")";

                //  return "scale(" + array.dataset.value[county + year] / array.dataset.value[county] + ")";

            })
            force.start();


            oldYear = year;
        }
        $('#year').text((year * 10) + 1800);
    }


    var IntervalId
    $("#startButton").click(function () {
        IntervalId = setInterval(function () { start() }, 4000);
    });

    function start() {
        $('#slider').foundation('slider', 'set_value', i);

        scale(i)
        i++;
        if (i > 23) { clearInterval(IntervalId); i = 0; }

    }

    $(document).foundation({
        slider: {
            on_change: function () {
                year = parseInt($('#slider').attr('data-slider'));
                scale(year);
                i = year;
                clearInterval(IntervalId);
            }
        }
    });



});








//Made
//console.log(areas);
