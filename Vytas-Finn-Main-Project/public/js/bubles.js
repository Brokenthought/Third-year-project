var array;



$.ajax({
    url: "industry.json",
    dataType: 'json',
    jsonpCallback: 'MyJSONPCallback',
    success: function (data) 
    {
        array = data;
    }
});


$(document).ajaxStop(function () 
{
      for (var i = 0; i < 50 ; i++) 
      {
      // console.log(i+"  "+array.dataset.dimension["Industry Sector"].category.label[i]);
      }
    


var size = 1;
var root = {};


var bubble = d3.layout.pack().sort(null).size([480,460]).padding(1.5);

//bubble.nodes(root)
//d3.json("industry.json",function (data) {}
var svg = d3.select("#ireland")
            .append("svg")
            .attr("width",600)
            .attr("height", 460)
            .attr("class","bubble");


var year =0;


$(document).foundation({
        slider: {
            on_change: function () {

                 year = parseInt( $('#slider').attr(('data-slider')));

                year = year*3;

               // bubble();

}}});

//bubble();



function bubble()
{}
root.name = "Bublles";
root.children = new Array();
for (i=0;i<34;i++){
  var item = {};
  //item.name = i;
  item.value = +array.dataset.value[(i*90)+9+year];
 // item.group = 1;
  //size = size + 1;
  root.children[i]=item;
}

var node = svg.selectAll(".node")
              .data(bubble.nodes(root)
              .filter(function(d){ return !d.children;}))
              .enter()
              .append("g")
              .attr("class","node")
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });



var colour = d3.scale.category10();
    node.append("circle")
    .attr("r", function(d) { return d.r; })
    .style("fill", function(d) { return colour(d.group); });
    node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) { return d.name; });

  


});


        

