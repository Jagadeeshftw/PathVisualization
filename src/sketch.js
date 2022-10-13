// ingredients
let brr = []
let DONE = false;
let GLOBAL_SHAPE = 30;
let MAZE = false;
let pick_start = false;
let pick_end = false;
let objs = []
let Spoint = [], Epoint = [];
let butt_DONE = false;
let d, bfs, mz, button, start, end, rwall;
let Rpoint=0;
let parents={}
let inBFS = false;
let interval;
let allThree = [0,0,0];
function initialize(){
    add();
    parents = {};
    DONE = false;
    butt_DONE = false;
    allThree = [0,0,0];
    document.getElementById("butt_done").innerHTML = "Done?";
    brr = [];
    Spoint = [];
    Epoint = [];
    loop(); 
    d.attribute('disabled', '');
}

function changeData(data){
    document.getElementById("data").innerHTML = data;
}

// Canvas Size 
let wide = 1200;
let tall = 1200;
let size = 60;
let size_b = size;
function setup() {
    let cv_div = document.getElementById("canv_holder");
    // Variable width
    let wid = cv_div.clientWidth;
    let hei = cv_div.clientHeight;
    wide = floor((wid/GLOBAL_SHAPE))*GLOBAL_SHAPE;
    size = floor(wid/GLOBAL_SHAPE);
    size_b = floor(size/2);
    tall = floor(size_b*GLOBAL_SHAPE);
    
    // console.log()
       
    let cnv = createCanvas(wide,tall);
    cnv.parent('canv_holder');
    cnv.mouseClicked(assignPoint);
    // cnv.position(windowWidth/2 - wide/2, windowHeight/3);
    background(240);
    button = createButton("Reset");
    button.mousePressed(reset);
    button.parent("upper");
    button.id("butt_reset")
    button.addClass('button button1');
    // button.position(windowWidth/16, windowHeight/16);
    // button.position(windowWidth/2-60, 60);
    // button.size(100, 40);
    
    start = createButton("Start Point");
    start.mousePressed(st);
    start.parent("left");
    start.id("butt_start")
    start.addClass('button button2');

    end = createButton("End Point");
    end.mousePressed(ed);
    end.parent("left");
    end.id("butt_end")
    end.addClass('button button2');

    rwall = createButton("Remove Wall");
    rwall.mousePressed(rem_wall);
    rwall.parent("left");
    rwall.id("butt_rwall")
    rwall.addClass('button button2');

    d = createButton("Done?");
    d.mousePressed(done);
    d.parent("upper");
    d.id("butt_done")
    d.addClass('button button1');
    

    // bfs = createButton("Dijkstra/BFS");
    // bfs.mousePressed(BFS2);
    // bfs.parent("lower");
    // bfs.id("butt_bfs")
    // bfs.addClass('button button1');
    
    
    let div_in = createDiv();
    div_in.parent(lower);
    div_in.addClass("dropdown")
    div_in.id("div_in")
    let x = createButton("Choose an algorithm");
    x.parent("div_in");
    // x.addClass("dropbtn")
    x.addClass("button button1")
    x.id("parent_butt");
    let y = createDiv();
    y.parent("parent_butt");
    y.addClass("dropdown-content")
    y.id("lord")
    let dropme = function(){
        document.getElementById("lord").classList.toggle("show");
    }
    x.mousePressed(dropme);
    
    let bop = function () {
        document.getElementById("butt_done").innerHTML = "Visualize Dijkstra's/BFS";
        // document.getElementById("lord").classList.toggle("show");
        allThree[2] = 1;
        trifecta();
        d.mousePressed(BFS2);
    }
    let astr = function () {
        document.getElementById("butt_done").innerHTML = "Visualize A*";
        // document.getElementById("lord").classList.toggle("show");
        allThree[2] = 1;
        trifecta();
        d.mousePressed(A_star);
    }
    let l1 = createElement('a', "Dijkstra's/BFS");
    l1.parent("lord"); l1.mousePressed(bop);
    let l2 = createElement('a', "A Star (A*)");
    l2.parent("lord"); l2.mousePressed(astr);
    let l3 = createElement('a', "More (Under Development)");
    l3.parent("lord")
    
    // let x = createButton("temp");
    // x.parent(lower);
    // x.id("parent_button")
    // x.addClass("button button1")
    
    mz = createButton("Maze Gen");
    mz.mousePressed(maze_ini2);
    mz.parent("right");
    mz.id("butt_maze")
    mz.addClass('button button2');
    initialize();
}


function done(pass=0){
    DONE = !DONE;
    if(DONE){
        document.getElementById("butt_done").innerHTML = "Done ✔️";
        noLoop();
    }else{
        document.getElementById("butt_done").innerHTML = "Done?";
    }  
}

function trifecta(){
    if(allThree[0] == 1 && allThree[1] == 1 && allThree[2] == 1){
        d.removeAttribute('disabled');
    }
}



function rem_wall(){

    Rpoint = ! Rpoint;
    if(Rpoint){
        rwall.addClass("active");
    }else{
        rwall.removeClass("active");
    }
}

function ed(){
    pick_end = !pick_end;
    if(pick_end) {
        changeData("Place Ending point");    
        end.addClass("active");
    }else{
        end.removeClass("active")
    }
}
function st(){
    pick_start = !pick_start;
    if(pick_start){
        changeData("Place Starting point");
        start.addClass("active");
    }else{
        start.removeClass("active");
    }
}

function add(){
    objs = []
    for(let i=0;i<size;i++){
        let temp = []
        for(let j=0;j<size;j++){
            let n = new Shape(i,j);
            temp.push(n);
        }
        objs.push(temp);
    }
}

function assignPoint(){
    let x = floor(mouseX/(GLOBAL_SHAPE));
    let y = floor(mouseY/(GLOBAL_SHAPE));

    let xpos = x*(GLOBAL_SHAPE);
    let ypos = y*(GLOBAL_SHAPE);
    
    if(pick_start){
        // loop();
        if(!objs[x][y].blocked){
            let n = new anoShape(xpos, ypos, x,y);
            n.col = "#de93f5";
            objs[x][y].start = true;
            pick_start =false;
            start.removeClass("active");
            Spoint = [n];
            fill(n.col);
            square(xpos,ypos,GLOBAL_SHAPE);
            changeData("Choose a target point or draw some walls")
            allThree[0] = 1;
        }
    }
    if(pick_end){
        if(!objs[x][y].blocked){
            let n = new anoShape(xpos, ypos, x,y);
            n.col = " #38f558";
            objs[x][y].end = true;
            pick_end = false;
            end.removeClass("active");
            Epoint = [n];
            fill(n.col);
            square(xpos,ypos,GLOBAL_SHAPE);
            changeData("Choose an Algorithm and Click Visualize!");
            allThree[1] = 1;
        }
    }
    if(Spoint.length && Epoint.length){
        butt_DONE = true;
        trifecta();
    }

}
// Reset function
function reset(){
    changeData("Choose starting and ending point");
    initialize();
    if(MAZE){
        MAZE = false;
        loop();
    }
    clearInterval(interval);
    
}

function draw() {
    background(255);
    
    push();
    rectMode(CENTER);
    if(pick_start){
        fill("#de93f5");
        square(mouseX, mouseY, GLOBAL_SHAPE);
    }
    if(pick_end){
        fill("#38f558");
        square(mouseX, mouseY, GLOBAL_SHAPE);  
    }
    if(Rpoint){
        fill("#d1d1d1");
        square(mouseX, mouseY, GLOBAL_SHAPE);  
    }
    
    pop();

    let hold = (GLOBAL_SHAPE);
    for(let i=0;i<=size;i++){
        // stroke("#8086ff");
        stroke('#344891');
        strokeWeight(0.5);
        line(i*hold, 0, i*hold, height);
        line(0, i*hold, width,i*hold);
        
    }

    let brr_len = brr.length
    for(let i=0;i<brr_len;i++){
        brr[i].draw();
    }
    for(let i=0;i<Spoint.length;i++){
        Spoint[i].draw();
    }
    for(let i=0;i<Epoint.length;i++){
        Epoint[i].draw();
    }

    
    if(DONE){ 
        noLoop();
    }   
}


function mouseDragged(){
    

    if(pick_start || pick_end){
        return;
    }
    
    let x = floor(mouseX/(GLOBAL_SHAPE));
    let y = floor(mouseY/(GLOBAL_SHAPE));
    // console.log(x, y);
    let xpos = x*(GLOBAL_SHAPE);
    let ypos = y*(GLOBAL_SHAPE);
    let n = new anoShape(xpos, ypos);
    n.xid = x;
    n.yid = y;
    let ob = String(xpos)+ "," + String(ypos)

    let found = brr.findIndex(function (element) { 
        return element.xid === n.xid && element.yid === n.yid; 
    });
    if(Rpoint){
        if(found != -1){
            brr.splice(found, 1);
            objs[x][y].blocked = false;
        }
    }else{
        if(found === -1){
            brr.push(n);
            try{
                objs[x][y].blocked = true;
                
                
            }catch(err){
                // console.log(err.message);
            }
        }
    }
}

