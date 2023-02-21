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