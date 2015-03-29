var board = document.getElementById("board");
var context = board.getContext("2d");

// Util method to convert RGB value of a Color to Hexadecimal value
function rgbToHex(r, g, b) {
	if (r > 255 || g > 255 || b > 255)
		throw "Invalid Color!";
	return ((r << 16) | (g << 8) | b).toString(16);
}

function generateSquare(x, y, color) {
    // Filling the background
    context.fillStyle = "rgb(0, 0, 0)"; //Black - #000000 & White - #FFFFFF
    context.fillRect(x * boxWidth, y * boxWidth, boxWidth, boxWidth); //(x-coordinate from upper-left, y-coordinate, width, height)
    // Filling the square
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

function hasPeg(x, y, context) {
    var pegColorData = context.getImageData((x * boxWidth) + (boxWidth / 2), (y * boxWidth) + (boxWidth / 2), 1, 1).data;
    var hexPeg = "#" + ("000000" + rgbToHex(pegColorData[0], pegColorData[1], pegColorData[2])).slice(-6);
    var isPegPresent = (hexPeg == pegColor) ? true : false;
    return isPegPresent;
}

function isSelected(x, y, context) {
    var pegBorderColorData = ctx.getImageData((x * boxWidth) + offset, (y * boxWidth) + offset, 1, 1).data;
    var hexPegBorder = "#" + ("000000" + rgbToHex(pegBorderColorData[0], pegBorderColorData[1], pegBorderColorData[2])).slice(-6);
    var isPegSelected = (hexPegBorder == selectedSquareColor) ? true : false;
    return isPegSelected;
}

function start() {
    // 33-hole Peg Solitaire Board
    board.width = 7 * boxWidth;
    board.height = 7 * boxWidth;
    for (var i=0; i < 3; i++) {
        for (var j=0; j < 2; j++) {
            generateSquare(2+i, j, squareColor);
            generateCircle(2+i, j, pegColor);
        }
    }
    for (var i=0; i < 7; i++) {
        for (var j=0; j < 3; j++) {
            generateSquare(i, 2+j, squareColor);
            if (j != 1 || i != 3) {
                generateCircle(i, 2+j, pegColor);
            }
        }
    }
    for (var i=0; i < 3; i++) {
        for (var j=0; j < 2; j++) {
            generateSquare(2+i, 5+j, squareColor);
            generateCircle(2+i, 5+j, pegColor);
        }
    }
}
