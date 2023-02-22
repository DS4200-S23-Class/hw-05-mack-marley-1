const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 0, right: 10, top: 00, bottom: 10};
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
    FRAME1.selectAll("points")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", (d) => {return (X_SCALE(d.x) + MARGINS.left); })
            .attr("cy", (d) => {return (Y_SCALE(d.y) + MARGINS.bottom)})
            .attr("r", 10)
            .attr("class", "point");


const FRAME2 = d3
  .select("#vis2")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame2");

d3.csv("data/bar-data.csv").then((data) => {
    const MAX_X = d3.max
})
})



function build_interactive_plot(){

    console.log("hah");


    

        const TOOLTIP = d3.select("#tooltip")
                        .append("div")
                            .attr("class", "tooltip")
                            .style("opacity", 0);

        function handleMouseover(event, d) {
            TOOLTIP.style("opacity", 1);
        }

        function handleMousemove(event, d) {
            // position the tooltip and fill in information 
            TOOLTIP.html("Name: " + d.name + "<br>Value: " + d.x)
                .style("left", (event.pageX + 10) + "px") //add offset
                                                          // from mouse
                .style("top", (event.pageY - 50) + "px"); 
        function handleMouseleave(event, d) {
            // on mouseleave, make transparant again 
            TOOLTIP.style("opacity", 0); 
    } 
    }
}

build_interactive_plot();



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






