var squareColor = "blue";
var pegColor = "orange";
var offset = 2;
var boxWidth = 30;

var board = document.getElementById("board");
var context = board.getContext("2d");

function generateSquare(x, y, color) {
    context.fillStyle = "rgb(0,0,0)"; //Black - #000000
    context.fillRect(x * boxWidth,y*boxWidth,boxWidth,boxWidth); //(x-coordinate from upper-left, y-coordinate, width, height)
   
    // remove these
    context.fillRect(60,0,30,15);
    context.fillRect(120,0,30,15);  
}
function start() {
     generateSquare(2, 0, squareColor);
     generateSquare(2, 1, squareColor);
}
