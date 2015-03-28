/**
* This method is to find the relative position of the element from its parent.
* Using JQuery's offset() instead of this.
function findPosition(obj) {
    var curLeft = 0;
    var curTop = 0;
    if (obj.offsetParent) {
        do {
            curLeft += obj.offsetLeft;
            curTop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curLeft, y: curTop};
    }
    return undefined;
} */

$("#board").click(function(event) {
//    console.log("X: " + event.pageX + " and Y: " + event.pageY); 
//    console.log(this.offsetParent); //offsetParent returns a reference to the object which is the closest (nearest in the containment hierarchy) positioned containing element
   
    /* var pos = findPosition(this);
    var context = this.getContext('2d');
    var x = event.pageX - pos.x; //event.pageX gives the position relative to the document's left
    var y = event.pageY - pos.y; //event.pageY gives the position relative to the document's top
    console.log("relative X: " + x + " and relative Y: " + y); */
    
//    console.log("checking jQuery's results...");
    var ctx = this.getContext('2d');
    var x = event.pageX - $(this).offset().left;
    var y = event.pageY - $(this).offset().top;
    var coordinates = "x = " + x + ", y = " + y;
    console.log(coordinates);
//    console.log("JQuery X: " + x + " and JQuery Y: " + y);
//    console.log("......");
    // Getting the box number from start of the board
    var xStart = Math.floor(x / boxWidth); // x co-ordinate of box wrt board
    var yStart = Math.floor(y / boxWidth); // y co-ordinate of box wrt board
    console.log(xStart + " " + yStart);
    
    var pegColorData = ctx.getImageData((xStart * boxWidth) + (boxWidth / 2), (yStart * boxWidth) + (boxWidth / 2), 1, 1).data; // Getting the color at center point of the box 
    var pegBorderColorData = ctx.getImageData((xStart * boxWidth) + offset, (yStart * boxWidth) + offset, 1, 1).data; //Getting the color at the border of the box
    
    var hexPeg = "#" + ("000000" + rgbToHex(pegColorData[0], pegColorData[1], pegColorData[2])).slice(-6);
    var hexPegBorder = "#" + ("000000" + rgbToHex(pegBorderColorData[0], pegBorderColorData[1], pegBorderColorData[2])).slice(-6);
    
//    console.log("hexPeg " + hexPeg);
//    console.log("hexPegBorder " + hexPegBorder);
    
    var isPegPresent = (hexPeg == pegColor) ? true : false;
//    console.log(isPegPresent);
    
    // If square is selected, unselect it
    if (hexPegBorder == selectedSquareColor) {
        xSelected = -1;
        ySelected = -1;
        // Generate a square to do that 
        generateSquare(xStart, yStart, squareColor);
        console.log("inside if");
        if (isPegPresent) {
            console.log("ispegpresent? " + isPegPresent);
            generateCircle(xStart, yStart, pegColor);       
        }
    } else if (hexPegBorder == squareColor){
        // Make sure no other square is selected and select it
        if (xSelected == -1 && ySelected == -1) {
            var srcPeg = hasPeg(xStart, yStart, ctx);
            if (!srcPeg) {
                 return;   
            }
            console.log("here");
            xSelected = xStart;
            ySelected = yStart;
            // Since it is selected, add that color to the square
            generateSquare(xStart, yStart, selectedSquareColor);
            if (isPegPresent) {
                generateCircle(xStart, yStart, pegColor);
            }
        }
        
        // Other square is selected, now move it
        else {
            var xDiff = xStart - xSelected;
            var yDiff = yStart - ySelected;
            
            // Check if we can go to that position or not
            if (xDiff > 2 || xDiff < -2 || yDiff > 2 || yDiff < -2) {
                return;
            }
            
            if (xDiff != 0 && yDiff != 0) {
                return;
            }
            
            // Move
            var destPeg = hasPeg(xStart, yStart, ctx);
            if (!destPeg) {
                // Jumped Peg
                var xOff = 0;
                var yOff = 0;
                if (xStart - xSelected > 0) {
                    xOff = 1;
                }
                else if (xStart - xSelected < 0) {
                    xOff = -1;   
                }
                else {
                    xOff = 0;
                    if (yStart - ySelected > 0) {
                        yOff = 1;
                    }
                    else if (yStart - ySelected < 0){
                        yOff = -1;
                    }
                    else {
                        return;    
                    }
                }
                // Check if we have a peg to jump over
                var midPeg = hasPeg(xSelected + xOff, ySelected + yOff, ctx);
                if (!midPeg) {
                    return;    
                }
                // Jumped Peg
                generateSquare(xSelected + xOff, ySelected + yOff, squareColor);
                // Peg Destination
                generateCircle(xStart, yStart, pegColor);
                // Peg Source
                generateSquare(xSelected, ySelected, squareColor);
                xSelected = -1;
                ySelected = -1;
            }
        }
    }   
});