
var numBoxes = 10;
var boxes = Array(numBoxes);
var blendModes = ['normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard- light', 'color-dodge', 'color-burn', 'darken', 'lighten', 'difference', 'exclusion', 'hue', 'saturation', 'luminosity', 'color', 'add', 'subtract', 'average', 'pin-light', 'negation', 'source- over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'darker', 'copy', 'xor'];
var blendIndex = 0;

for (var i = 0; i < numBoxes; i++) {
    var colour;
    if (Math.floor(Math.random()*2)) {
        colour = "black";
    } else {
        colour = "white";
    }
    boxes[i] = new Path.Rectangle({
        //point: [20, 20],
        size: [Math.random()*400, Math.random()*400],
        //size: new Size(200,200) * Size.random,
        center: view.center,
        //strokeColor: colour,
        fillColor: colour
    });
    
    boxes[i].topInc = ((Math.floor(Math.random()*2)*4)-2.0);
    boxes[i].leftInc = ((Math.floor(Math.random()*2)*4)-2.0);
    
    boxes[i].what = function(){
        console.log("he");
    }
    boxes[i].update = function() {
        this.bounds.top += this.topInc;
        this.bounds.bottom -= this.topInc;
        this.bounds.left += this.leftInc;
        this.bounds.right -= this.leftInc;

        if((this.bounds.top <= 0 && this.topInc < 0) || (this.bounds.top >= view.center.y-1 && this.topInc > 0)) {
            this.topInc *= -1;
        }

        if((this.bounds.left <= 0 && this.leftInc < 0) || (this.bounds.left >= view.center.x-1 && this.leftInc > 0)) {
            this.leftInc *= -1;
        }
    }
}

var text = new PointText({
    position: [100, view.viewSize.height -40],
    fillColor: 'black',
    justification: 'center',
    fontSize: 20
});

function onFrame(event) {
     for (var i = 0; i < boxes.length; i++) {
        boxes[i].update();
    }
}

function onResize() {
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].center = view.center;
    }
}
/*
 *  TODO: Create function that handles cycling through boxes?
 *
 */
function onKeyDown(event) {
    if(event.key == 'up') {
        if(boxes[0].opacity < 1.0) {
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].opacity += 0.01;
            }
        }
    }

    if(event.key == 'down') {
        if(boxes[0].opacity > 0.1) { // Maybe try 0.01
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].opacity -= 0.01;
            }
        }
    }

   if(event.key == 'right') {
        if(blendIndex < blendModes.length) {
            blendIndex++;
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].blendMode = blendModes[blendIndex];
            }
        }
    }

    if(event.key == 'left') {
        if(blendIndex > 0) {
            blendIndex--;
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].blendMode = blendModes[blendIndex];
            }
        }
    }
    
    text.content = "OPACITY: " + boxes[0].opacity + " BLENDMODE: " + blendModes[blendIndex];

}
