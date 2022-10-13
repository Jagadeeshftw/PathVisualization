let GLOBAL_VISITS = 0;
let mz_wid = 22;
let mz_height = 10;
let GLOBAL_VISITS_LIMIT = mz_wid*mz_height;
function maze_ini2(){
    // mz_wid = ((maze_slider.value()/5)*size)/2;
    // console.log((maze_slider.value()/5)*size);
    reset();
    changeData("Choose starting and ending point");
    mz_wid = ceil(size/2);
    mz_height = mz_wid*0.50;
    GLOBAL_VISITS_LIMIT = mz_wid*mz_height;
    console.log(size/2);
    GLOBAL_VISITS = 0;
    MAZE = true;
    DONE = false;
    brr = [];
    Spoint = [];
    Epoint = [];
    objs = []
    for(let i=0;i<size;i++){
        let temp = []
        for(let j=0;j<size;j++){
            let n = new Shape(i,j);
            n.blocked = true;
            temp.push(n);
        }
        objs.push(temp);
    }
    loop();
    let send = {x: 0, y: 0, valid : true, name: "bottom"};
    DFS_maze(send);
    for(let i=0;i<2*mz_wid;i++){
        for(let j=0;j<2*mz_height;j++){
            if(objs[i][j].blocked){
                let xpos = objs[i][j].x*(GLOBAL_SHAPE);
                let ypos = objs[i][j].y*(GLOBAL_SHAPE);
                let n = new anoShape(xpos, ypos);
                n.xid = objs[i][j].x;
                n.yid = objs[i][j].y;
                brr.push(n);
            }
        }
    }
}

function isValid2(obj){
    if(obj.x >= 0 && obj.x < 2*floor(mz_wid)){
        if(obj.y >= 0 && obj.y < 2*floor(mz_height)){
            if(objs[obj.x][obj.y].blocked && !objs[obj.x][obj.y].visited2)
                return obj.valid = true;
        }
    }
    obj.valid = false;
}

function DFS_maze(sent){
    if(GLOBAL_VISITS >= GLOBAL_VISITS_LIMIT){
        // console.log("Hit");
        return;
    }
    // console.log("I'm on ", sent.x, sent.y);
    let px = sent.x;
    let py = sent.y;
    GLOBAL_VISITS++;
    objs[px][py].visited2 = true;
    objs[px][py].blocked = false;
    try{
        let ob = sent;
        if(ob.name == "top"){
            objs[ob["x"]][ob["y"]+1].blocked = false;
        }else if(ob.name == "bottom"){
            objs[ob.x][ob.y-1].blocked = false;
        }else if(ob.name == "left"){
            objs[ob["x"]+1][ob["y"]].blocked = false;
        }else if(ob.name == "right"){
            objs[ob["x"]-1][ob["y"]].blocked = false;
        }
    }catch (err){
        // console.log(err.message);
    }


    let hold = objs[px][py]
    let top    = {x: hold.x, y: hold.y-2, valid : false, name: "top"};
    let bottom = {x: hold.x, y: hold.y+2, valid : false, name: "bottom"};
    let left   = {x: hold.x-2, y: hold.y, valid : false, name: "left"};
    let right  = {x: hold.x+2, y: hold.y, valid : false, name: "right"};
    isValid2(top); isValid2(bottom); isValid2(left); isValid2(right);
    let neighbours = [];
    if(top["valid"]){
        neighbours.push(top);
    }
    if(bottom["valid"]){
        neighbours.push(bottom);
    }
    if(left["valid"]) {
        neighbours.push(left);
    }
    if(right["valid"]) {
        neighbours.push(right);
    }


    while(neighbours.length != 0){
        let rval = floor(random(neighbours.length));
        let ob = neighbours[rval];
        // console.log(neighbours);
        neighbours.splice(rval,1);
        
        if(!objs[ob.x][ob.y].visited2)
            DFS_maze(ob);
        
    }
    
}