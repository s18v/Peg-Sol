/**
* This method is to find the relative position of the element from its parent.
* Using JQuery's offset() instead of this.
*/
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
}

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
    var xStart = Math.floor((event.pageX - $("#board").offset().left) / boxWidth); 
    var yStart = Math.floor((event.pageY - $("#board").offset().top) / boxWidth);
    
    console.log(xStart + " " + yStart);
    
});