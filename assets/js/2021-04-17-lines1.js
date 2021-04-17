let button;
var x = 0;
var xstart = [];
var ystart = [];
var xpos = [];
var ypos = [];
var thresh = [];
var speed = [];
var spacing = 4;
var j=0;
var numsets = 8;
var numlines = [];
var HEIGHT;
var WIDHT;
var sign = 1;
var opposites = [1,-1];
var dir =[];

var clicked = true;
function setup() {
    WIDTH=windowWidth/1.5;
    HEIGHT=windowHeight/1.5;
    frameRate(50);
    const canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("2021-04-17-sketch")
    for (j=0;j<numsets;j++){
        ystart.push(random(HEIGHT));
        xstart.push(random(WIDTH/2));
        xpos.push(0);
        ypos.push(0);
        thresh.push(random(0.25,0.75));
        speed.push(random(2,8));
        numlines.push(random(2,50));
        dir.push(random(opposites));
    }
    // button = createButton('save');
    // button.mousePressed(saveImage);
}
function saveView(){
    save("2021-04-17.png");
}
function draw() {
    strokeWeight(2);
    stroke(255, 255, 255);

    rect(0,0,WIDTH,HEIGHT);
    fill(0);
    var linewidth = WIDTH/2;
    var ret;
    incrementCounter();
    var i;
    for(i=0;i<numsets;i++){
        drawlines(i);
    }
}

function drawlines(i){
    if (x < thresh[i]*WIDTH)
    {
        xpos[i] = xpos[i] + sign*speed[i];
    }
    else
    {
        ypos[i] = ypos[i] + sign*speed[i];                
        drawVertical(i);
    }
    drawHorizontal(i);
}

// function drawlines(i){
//     if (dir[i] == 1){
//         if (x < thresh[i]*WIDTH)
//         {
//             xpos[i] = xpos[i] + sign*speed[i];
//         }
//         else
//         {
//             ypos[i] = ypos[i] + sign*speed[i];                
//             drawVertical(i);
//         }
//         drawHorizontal(i);
//     }
//     else{
//         if (x < thresh[i]*WIDTH)
//         {
//             ypos[i] = ypos[i] + sign*speed[i];                


//         }
//         else
//         {
//             xpos[i] = xpos[i] + sign*speed[i];
//             drawHorizontal(i);
//             drawVertical(i);
//         }
//         drawVertical(i);
//     }
// }

function drawHorizontal(ind){
    var i;
    for(i=0;i<numlines[ind];i++)
    {
        line(xstart[ind], ystart[ind] + i*spacing, xpos[ind] + i*spacing , ystart[ind]+i*spacing);
    }
}

function drawVertical(ind){
    var i;
    for(i=0;i<numlines[ind];i++)
    {        
        line(xpos[ind] + i*spacing, 
             ystart[ind]  + i*spacing, 
             xpos[ind] + i*spacing , 
             ystart[ind] + ypos[ind] + i*spacing);
    }    
}

function mouseClicked(){
    // updatepos = !(updatepos);
    // clear();
    if (clicked == true){
        noLoop();
        // save("2021-04-17.png")
    }
    else{
        loop();
    }
    clicked = !(clicked);
}

function incrementCounter(){
    x = x + sign*5;
    if (x > WIDTH){
        sign = -1;
    }
    else if (x < 0){
        sign = 1;
    }
}
