var width = 640,
    height = 480;

var animationStep = 400;

var force = null,
    nodes = null,
    links = null;

var svg = d3.select('#ireland').append('svg')
    .attr('width', width)
    .attr('height', height);



var initForce = function () {
    svg.selectAll('*').remove();

    var dataNodes = [
        { x: width / 3, y: height / 3, graph: 0 },
        { x: width / 3, y: 2 * height / 3, graph: 0 },
        { x: 2 * width / 3, y: height / 3, graph: 1 },
        { x: 2 * width / 3, y: 2 * height / 3, graph: 1 }
    ];

    var dataLinks = [
       { source: 0, target: 1 },
       { source: 2, target: 3 }
    ];

    force = d3.layout.force()
        .size([width, height])
        .nodes(dataNodes)
        .links(dataLinks);

    force.gravity(0);

    force.linkDistance(height / 6);
    force.linkStrength(0.1);


    force.charge(function (node) {
        return node.graph === 0 ? -30 : -300;
    });


    links = svg.selectAll('.link')
        .data(dataLinks)
        .enter().append('line')
        .attr('class', 'link')
        .attr('x1', function (d) { return dataNodes[d.source].x; })
        .attr('y1', function (d) { return dataNodes[d.source].y; })
        .attr('x2', function (d) { return dataNodes[d.target].x; })
        .attr('y2', function (d) { return dataNodes[d.target].y; });

    nodes = svg.selectAll('.node')
        .data(dataNodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', width / 25)
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });

    force.on('tick', stepForce);

};

var stepForce = function () {

    if (force.fullSpeed) {

        nodes.attr('cx', function (d) { return d.x; })
             .attr('cy', function (d) { return d.y; });

    } else {

        nodes.transition().ease('linear').duration(animationStep)
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; });
    }


    if (force.fullSpeed) {

        links.attr('x1', function (d) { return d.source.x; })
            .attr('y1', function (d) { return d.source.y; })
            .attr('x2', function (d) { return d.target.x; })
            .attr('y2', function (d) { return d.target.y; });

    } else {

        links.transition().ease('linear').duration(animationStep)
            .attr('x1', function (d) { return d.source.x; })
            .attr('y1', function (d) { return d.source.y; })
            .attr('x2', function (d) { return d.target.x; })
            .attr('y2', function (d) { return d.target.y; });
    }
    // Unless the layout is operating at normal speed, we
    // only want to show one step at a time.

    if (!force.fullSpeed) {
        force.stop();
    }


    if (force.slowMotion) {
        setTimeout(
            function () { force.start(); },
            animationStep
        );
    }

}

d3.select('#advance').on('click', function () {

    force.start();

});


d3.select('#slow').on('click', function () {

    // Indicate that the animation is in progress.

    force.slowMotion = true;
    force.fullSpeed = false;

    // Get the animation rolling

    force.start();

});

d3.select('#play').on('click', function () {

    // Indicate that the full speed operation is in progress.

    force.slowMotion = false;
    force.fullSpeed = true;

    // Get the animation rolling

    force.start();

});


d3.select('#reset').on('click', function () {

    // If we've already started the layout, stop it.
    if (force) {
        force.stop();
    }

    // Re-initialize to start over again.

    initForce();

});

initForce();


