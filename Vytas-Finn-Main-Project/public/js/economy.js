var array;

var counties = [31, 7, 28, 1, 8, 22, 2, 36, 24, 32, 14, 9, 3, 15, 10, 19, 25, 11, 16, 9, 12, 29, 4, 17, 34, 26];
var countyIndex = [];
var countyNames = ["Carlow","Cavan","Clare","Cork","Donegal","Dublin","Galway","Kerry","Kildare","Kilkenny","Laois","Leitrim","Limerick","Longford","Louth","Mayo","Meath","Monaghan","Offlay","Roscommon","Sligo","Tipperary","Waterford","Westmeath","Wexford","Wicklow"];

var county = 24;
var year = 1;

var category = 7;
var difference = 12700;
var division = 18000;
difference = parseInt(difference);
division = parseInt(division);
var dataSet = "Income";
var wait = true;






document.getElementById("DataSetInfo").innerHTML = "Primary Income (Euro Million)";


$.ajax({
    url: "json_files/income.json",
    dataType: 'json',
    jsonpCallback: 'MyJSONPCallback',
    success: function (data) {
        array = data;
        wait = false;
    }
});

$('input:radio[name="pokemon"]').change(function(){

    if($(this).val() == 'DisposableIncome'){
       //alert("SocialBenefits");
       dataSet = "DisposableIncome";
        category = 14;

         document.getElementById("DataSetInfo").innerHTML = "Index of Disposable Income per Person (Euro) State = 100";
    }
    //IncomeSelfEmployed
    else if($(this).val() == 'TaxOnIncome')
    {
       //alert("SocialBenefits");
       dataSet = "TaxOnIncome";
         category = 11;

         document.getElementById("DataSetInfo").innerHTML = "Total Income per Person (Euro)";

    }

    else if($(this).val() == 'Income'){
       //alert("Income");
       dataSet = "Income";
       category = 7;
       document.getElementById("DataSetInfo").innerHTML = "Primary Income (Euro Million)";

    }


});



$(document).ajaxStop(function () {

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
        .html(function (d) {

        console.log("othereee   "+category);
        var value = (counties[countyId] * 15) * year + category;

        return "<strong>" + countyNames[countyId] + ":</strong> <span style='color:white'>"  + array.dataset.value[value] +"</span>";
    })
    var num = 0;

    var countyId = 0;
    var areas;
    var i = 0;
    var path;
    var canvas = d3.select("#ireland")
               .append("svg")
               .attr("width", 400)
               .attr("height", 400);
    d3.json("json_files/ireland.json", function (data) {
        var group = canvas.selectAll("g")
       .data(data.features)
       .enter()
       .append("g")
       .attr("stroke", "black")
        group.call(tip);
        var projection = d3.geo.mercator().scale(3000).translate([600, 3500]);
        path = d3.geo.path().projection(projection);
        areas = group.append("path")
       .attr("d", path)
       .attr("class", "area")
       .attr("stroke-width", "1")
       .attr("id", function (d,i) {
           return  "id" + i;
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

    });

    var new_value = 0;
    $('slider').foundation('slider', 'set_value', new_value);

    $(document).foundation({
        slider: {
            on_change: function () {
                
                var value, a,p,k,n, rgb, highest = 0, lowest = 99999999;
                var sum = 0;
                var mean = 0;
                var stDev = 0;

                year = parseInt($('#slider').attr(('data-slider')) - 1999);



                for (i = 0; i < counties.length; i++) {

                    value = parseFloat(array.dataset.value[counties[i] * 15 * year + category]);

                    sum += value;

                    if (value > highest) {
                        highest = value;
                    }
                    if (value < lowest) {
                        lowest = value;
                    }


                }
                mean = sum / counties.length;

                for (i = 0; i < counties.length; i++) {
                    value = parseFloat(array.dataset.value[counties[i] * 15 * year + category]);
                    a = value - mean;
                    stDev += a * a;
                }

                stDev = Math.sqrt(stDev / counties.length);
                k = highest - lowest;
                n = k / stDev;

                p = 200 / n;
                

                var count =0;
                county = 0;

                category = parseInt(category);
                if (areas != null) {

                    areas.transition().duration(1000)
                    .attr("fill", function (d)
                    {
                        county = counties[count];
                        count++;

                        value = (array.dataset.value[(county * 15) * year + category]);
               
                        rgb = ((value - lowest) / stDev) * p;

                        blue = rgb + 90;
                        green = rgb + 40;

                        return ("rgb(" + rgb + "," + green + ", " + blue+")");

                    })
                }


            }
        }
    });

});
