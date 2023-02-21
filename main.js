const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;

const FRAME1 = d3
  .select("#vis1")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame1");


const FRAME2 = d3
  .select("#vis2")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame2");


/**

function pointClicked(pointID) {
    console.log("point was clicked.");

    
    let rightCol = document.getElementById("last-point-clicked");
    rightCol.innerHTML = "Last point clicked: " + pointID;


    let clickedDiv = document.getElementById(pointID);
    clickedDiv.classList.toggle("clicked"); 

}



function pointHovered(point) {
    let currPoint = document.getElementById(point);
    currPoint.classList.toggle("hovered");
}

function newPointSubmission() {
    console.log('something');
    let xVal = document.getElementById("select-x-coord").value;
    let yVal = document.getElementById("select-y-coord").value;
    let pointID = "'(" + xVal + ", " + yVal + ")'"
    console.log(pointID);
    xVal = Number(xVal) * 40;
    yVal = 400 - Number(yVal) * 40;
    let scatterplot = document.getElementById("scatterplot");
    scatterplot.innerHTML += "<circle id=" + pointID +
        " class='point' cx=" + xVal + " cy=" + yVal + 
        ` r='10' onclick="pointClicked(` + pointID + 
        `)" onmouseover="pointHovered(` + pointID + 
        `)" onmouseout="pointHovered(` + pointID + ')" />';   
}

const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

function build_interactive_plot(){

    console.log("hah");

    const left_svg = d3.select("#scatterplot");

    d3.csv("scatter-data.csv").then((data) => {
        const MAX_X3 = d3.max(data, (d) => { return parseInt(d.x); });

        const X_SCALE3 = d3.scaleLinear() 
                          .domain([0, (MAX_X3 + 10000)]) // add some padding  
                          .range([0, VIS_WIDTH]);
        left_svg.selectAll("points")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", (d) => {return (X_SCALE3(d.x) + MARGINS.left); })
                .attr("cy", MARGINS.top)
                .attr("r", 20)
                .attr("class", "point");

    const TOOLTIP = d3.select("#tooltip")
                        .append("div")
                            .attr("class", "tooltip")
                            .style("opacity", 0);
    }
}

build_interactive_plot();

*/



