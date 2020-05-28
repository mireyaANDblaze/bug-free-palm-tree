var drawing = [] ;
var db_drawing = [];
var database;
var button;

function setup() {
  createCanvas(800,800);
  database = firebase.database();
  button = createButton("Clear");
  button.position(200,10);

}

function draw() {
  background("cyan");  
  beginShape();
  noFill();
    for(var i in db_drawing){
      vertex(db_drawing[i].x,db_drawing[i].y);
      
    }
    button.mousePressed(()=>{
      db_drawing = [];
      drawing = [];
      database.ref("drawing").remove();
    });
    endShape();
  readData();
}

function mouseDragged(){
  var point = {
    x : mouseX,
    y : mouseY
  }
  drawing.push(point);
  database.ref("drawing").set({
    'd' : drawing
  })
}

function  readData(){
  database.ref('drawing/d').on("value",function (data){
    db_drawing = data.val();
    
  });
  //console.log(db_drawing);

        
}

// function keyPressed(){
//   if(keyCode===32){
//    db_drawing = [];
//    database.ref('drawing').remove();
//   }
// }

