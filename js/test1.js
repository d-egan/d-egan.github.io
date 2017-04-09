
var numBoxes = 10;
var boxes = Array(numBoxes);

for (var i = 0; i < numBoxes; i++){
    var colour;
    if (Math.floor(Math.random()*2)){
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

        if((this.bounds.top <= 0 && this.topInc < 0) || (this.bounds.top >= view.center.y-1 && this.topInc > 0)){
            this.topInc *= -1;
        }

        if((this.bounds.left <= 0 && this.leftInc < 0) || (this.bounds.left >= view.center.x-1 && this.leftInc > 0)){
            this.leftInc *= -1;
        }
    }
}

function onFrame(event){
     for (var i = 0; i < boxes.length; i++) {
        boxes[i].update();
    }
}

function onResize(){
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].center = view.center;
    }
}

function onKeyDown(event){
    if(event.key == 'up'){
        
        if(boxes[0] < 1.0) {
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].opacity += 0.01;
            }
        }
    }

    if(event.key == 'down'){
        if(boxes[0] > 0.0) {
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].opacity -= 0.01;
            }
        }
    }

}
