//constants for vis1 and vis2
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 30, right: 30, top: 30, bottom: 30};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;
const circleScale = (coord) => coord * 34;

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


// mouse handlers for circles
function handleMouseover(event, d) { 
    event.target.style.fill = "orange";
}; 

function handleMouseleave(event, d) { 
    event.target.style.fill = "darkred";   
}; 

function handleClick(event, d) { 
    if (event.target.style.stroke === "lightblue") { 
        event.target.style.stroke = "";}   
    else { 
        event.target.style.stroke = "lightblue"; 
        event.target.style.strokeWidth = "3px"; 
        } 
    }; 


//builds the plots
function build_interactive_plot(){

    //SCATTER W D3
    d3.csv("data/scatter-data.csv").then((data) => {
   
    const MAX_X = d3.max(data, (d) => { return parseInt(d.x); });
    const MAX_Y = d3.max(data, (d) => { return parseInt(d.y); });


    const X_SCALE = d3.scaleLinear() 
                      .domain([0, (MAX_X + 1)]) // add some padding  
                      .range([0, VIS_WIDTH]);
    const Y_SCALE = d3.scaleLinear()
                        .domain([MAX_Y + 1, 0])
                        .range([0, VIS_HEIGHT]);

    let sourceNames = [];

    const TOOLTIP = d3.select("#vis1") 
            .append("div") 
            .attr("class", "tooltip") 
            .style("opacity", 0);  


   
    FRAME1.selectAll("points")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", (d) => circleScale(d.x) + MARGINS.left)
            .attr("cy", (d) => 400 - circleScale(d.y) - MARGINS.top)
            .attr("r", 10)
            .attr("class", "point")
            .on("mouseover", handleMouseover) 
            .on("mouseleave", handleMouseleave) 
            .on("click", handleClick); 

     
    FRAME1.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top)
                + ")")
            .call(d3.axisBottom(X_SCALE))
                .attr("font-size", "10px");
    FRAME1.append("g") 
          .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")") 
          .call(d3.axisLeft(Y_SCALE))
          .attr("font-size", "10px");
    })

   


    //BAR CHART
    d3.csv("data/bar-data.csv").then((data) => {
        const MAX_HEIGHT = d3.max(data, (d) => {return parseInt(d.amount); });
        console.log(MAX_HEIGHT);

        const X_SCALE2 = d3.scaleBand()
                            .domain(data.map(d => d.category))
                            .range([0, VIS_WIDTH]);
        const Y_SCALE2 = d3.scaleLinear()
                .range([VIS_HEIGHT, MARGINS.top]);

        Y_SCALE2.domain([0, d3.max(data, function(d) { return +d.amount; })+1]);


        const TOOLTIP = d3.select("#vis2")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);



        function handleHover(event, d){
            event.target.style.fill = "yellow";
            TOOLTIP.style("opacity", 1);
            };

        function handleLeave(event, d){
            event.target.style.fill = "blueviolet";
            TOOLTIP.style("opacity", 0);
            };

        function handleBarData (event, d) {
            TOOLTIP.html("category: " + d.category + "<br/>amount: " + d.amount)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 50 + "px");
            };

        FRAME2.selectAll("bars")
            .data(data)
            .enter()
            .append("rect")
                .attr("width", 10 + MARGINS.left)
                .attr("height", (d) => {return VIS_HEIGHT - Y_SCALE2(d.amount); })
                .attr("x", (d) => {return 5 + MARGINS.left + X_SCALE2(d.category); })
                .attr("y", (d) => {return Y_SCALE2(d.amount) + 30; })
                .attr("class", "bar")
                .on("mouseover", handleHover)
                .on("mouseleave", handleLeave)
                .on("mousemove", handleBarData);


        FRAME2.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE2)) 
            .attr("font-size", '10px');

        FRAME2.append("g") 
          .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")") 
          .call(d3.axisLeft(Y_SCALE2))
          .attr("font-size", "10px");

    })
}

build_interactive_plot();


function newPointSubmission() {
    const x = document.getElementById("select-x-coord").value;
    const y = document.getElementById("select-y-coord").value;
    
    let newText = "point added: (" + x + ", " + y + ")";
    let buttonDiv = document.getElementById("last-point-clicked");
    buttonDiv.innerHTML = newText;

    
    console.log(x, y);
    // add
    FRAME1.append("circle")
        .attr("cx", (d) => circleScale(x) + MARGINS.left)
        .attr("cy", (d) => 400 - circleScale(y) - MARGINS.top)
        .attr("r", 10)
        .attr("fill", "black")
        .on("mouseover", handleMouseover)
        .on("mouseleave", handleMouseleave)
        .on("click", handleClick);
}







