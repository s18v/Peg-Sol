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
    
    console.log(hexPeg);
    console.log(hexPegBorder);
    console.log(pegColor);
    
    var isPegPresent = (hexPeg == pegColor) ? true : false;
    console.log(peg);
});