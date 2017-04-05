var path = new Path();

path.strokeColor = "black";
var start = new Point(100, 100);

path.moveTo(start);

path.lineTo(start + [ 100, -50]);

var rect = new Path.Rectangle({
//point: [20, 20],
	size: [Math.random()*200, Math.random()*200],
	center: view.center,
	strokeColor: "black",
	fillColor: "black"
});

  
var topInc = -1;
var bottomInc = 2;

function onFrame(event){
  console.log(rect.bounds.top);
  console.log(rect.bounds.bottom);
  rect.bounds.top += topInc;
  rect.bounds.bottom += bottomInc;

  if(rect.bounds.top <= 0 || rect.bounds.top >= view.center.y){
     topInc *= -1;
  }
  if(rect.bounds.bottom <= view.center.y || rect.bounds.bottom >= view.size.height){
     bottomInc *= -1;
  }
}

function onResize(){
  rect.center = view.center;
  } 