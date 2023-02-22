const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 30, right: 30, top: 30, bottom: 30};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME1 = d3
  .select("#vis1")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame1");


d3.csv("data/scatter-data.csv").then((data) => {
    const MAX_X = d3.max(data, (d) => { return parseInt(d.x); });
    const MAX_Y = d3.max(data, (d) => { return parseInt(d.y); });


    const X_SCALE = d3.scaleLinear() 
                      .domain([0, (MAX_X + 1)]) // add some padding  
                      .range([0, VIS_WIDTH]);
    const Y_SCALE = d3.scaleLinear()
                        .domain([0, MAX_Y + 1])
                        .range([0, VIS_HEIGHT]);

    let sourceNames = [];


    // if(data.hasOwnProperty(data.category)){
    //     sourceNames.push(data.category);
    //     sourceCount.push(parseInt(data[data.category]));
    // }

    // X_SCALE.domain(sourceNames)

    FRAME1.selectAll("points")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", (d) => {return (X_SCALE(d.x) + MARGINS.left); })
            .attr("cy", (d) => {return (Y_SCALE(d.y) + MARGINS.bottom)})
            .attr("r", 10)
            .attr("class", "point");

    FRAME1.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top)
                + ")")
            .call(d3.axisBottom(X_SCALE).ticks(4))
                .attr("font-size", "20px");
})


const FRAME2 = d3
  .select("#vis2")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame2");






function build_interactive_plot(){

    d3.csv("data/bar-data.csv").then((data) => {
        const MAX_HEIGHT = d3.max(data, (d) => {return parseInt(d.amount); });
        console.log(MAX_HEIGHT);

        const X_SCALE2 = d3.scaleBand()
                            .domain(data.map(d => d.category))
                            .range([0, VIS_WIDTH]);
        const Y_SCALE2 = d3.scaleLinear()
                            .domain([0, MAX_HEIGHT + 1])
                            .range([0, VIS_HEIGHT]);

        FRAME2.selectAll("bars")
            .data(data)
            .enter()
            .append("rect")
                .attr("width", 10 + MARGINS.left)
                .attr("height", d => VIS_HEIGHT - Y_SCALE2(d.amount))
                .attr("x", (d) => {return 5 + MARGINS.left + X_SCALE2(d.category); })
                .attr("y", (d) => {return MARGINS.bottom + Y_SCALE2(d.amount); })
                .attr("class", "bar");

        const TOOLTIP = d3.select("#tooltip")
                        .append("div")
                            .attr("class", "tooltip")
                            .style("opacity", 0);

        // function handleMouseover(event, d) {
        //     TOOLTIP.style("opacity", 1);
        // }

        // function handleMousemove(event, d) {
        //     // position the tooltip and fill in information 
        //     TOOLTIP.html("Name: " + d.name + "<br>Value: " + d.x)
        //         .style("left", (event.pageX + 10) + "px") //add offset
        //                                                   // from mouse
        //         .style("top", (event.pageY - 50) + "px"); 
        // }
        // function handleMouseleave(event, d) {
        //     // on mouseleave, make transparant again 
        //     TOOLTIP.style("opacity", 0); 
        // }

        // FRAME2.selectAll(".point")
        //           .on("mouseover", handleMouseover) //add event listeners
        //           .on("mousemove", handleMousemove)
        //           .on("mouseleave", handleMouseleave);  

        FRAME2.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE2).ticks(4)) 
                .attr("font-size", '20px');

        FRAME2.append("g") 
            .attr("transform", "translate(" + MARGINS.bottom + 
                "," + (VIS_WIDTH + MARGINS.top) + ")") 
            .call(d3.axisLeft(Y_SCALE2).ticks(4)) 
                .attr("font-size", '20px');

    })
}

build_interactive_plot();



// function pointClicked(pointID) {
//     console.log("point was clicked.");

    
//     let rightCol = document.getElementById("last-point-clicked");
//     rightCol.innerHTML = "Last point clicked: " + pointID;


//     let clickedDiv = document.getElementById(pointID);
//     clickedDiv.classList.toggle("clicked"); 

// }



// function pointHovered(point) {
//     let currPoint = document.getElementById(point);
//     currPoint.classList.toggle("hovered");
// }

// function newPointSubmission() {
//     console.log('something');
//     let xVal = document.getElementById("select-x-coord").value;
//     let yVal = document.getElementById("select-y-coord").value;
//     let pointID = "'(" + xVal + ", " + yVal + ")'"
//     console.log(pointID);
//     xVal = Number(xVal) * 40;
//     yVal = 400 - Number(yVal) * 40;
//     let scatterplot = document.getElementById("scatterplot");
//     scatterplot.innerHTML += "<circle id=" + pointID +
//         " class='point' cx=" + xVal + " cy=" + yVal + 
//         ` r='10' onclick="pointClicked(` + pointID + 
//         `)" onmouseover="pointHovered(` + pointID + 
//         `)" onmouseout="pointHovered(` + pointID + ')" />';   
// }






