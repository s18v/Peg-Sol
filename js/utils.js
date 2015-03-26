var squareColor = "blue";
var pegColor = "orange";
var offset = 2;
var boxWidth = 30;

var board = document.getElementById("board");
var context = board.getContext("2d");

function generateSquare(x, y, color) {
   context.fillStyle = "rgb(0, 0, 0)"; //Black - #000000 & White - #FFFFFF
    context.fillRect(x * boxWidth, y * boxWidth, boxWidth, boxWidth); //(x-coordinate from upper-left, y-coordinate, width, height)
    context.fillStyle = squareColor;
    context.fillRect((x * boxWidth) + offset, (y * boxWidth) + offset, boxWidth - 2 * offset, boxWidth - 2 * offset);
}

function generateCircle(x, y, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x * boxWidth + (boxWidth / 2), y * boxWidth + (boxWidth / 2), boxWidth * 0.375, 0 * Math.PI, 2 * Math.PI, true);
    context.closePath();
    context.fill();
}

function start() {
    //    generateSquare(2, 0, squareColor);
    
        board.width = 7 * boxWidth;
        board.height = 7 * boxWidth
        for (var i=0; i < 3; i++) {
			for (var j=0; j < 2; j++) {
				generateSquare(2+i, j, squareColor);
//				generateCircle(2+i, j, circleColor);
            }
        }
		for (var i=0; i < 7; i++) {
			for (var j=0; j < 3; j++) {
				generateSquare(i, 2+j, squareColor);
				if (j != 1 || i != 3) {
//					drawDot(i, 2+j, PEG_COLOUR);
                }
            }
        }
        for (var i=0; i < 3; i++) {
			for (var j=0; j < 2; j++) {
				generateSquare(2+i, 5+j, squareColor);
//				drawDot(2+i, 5+j, PEG_COLOUR);
			}
        }
}
