let found = false;
let q = [];
let temp = Spoint[0];
let endP = Epoint[0];
function BFS2(){
    DONE = true;
    found = false;
    
    inBFS = true;
    if(Spoint.length == 0 || Epoint.length == 0){
        return;
    }
    temp = Spoint[0];
    endP = Epoint[0];
    q.push(objs[temp.xid][temp.yid])
    interval = setInterval(BFS_a, 2);
    let redundant = function(){
        let hold = objs[temp.xid][temp.yid]
        let top    = {x: hold.x-1, y: hold.y, valid : false};
        let bottom = {x: hold.x+1, y: hold.y, valid : false};
        let left   = {x: hold.x, y: hold.y-1, valid : false};
        let right  = {x: hold.x, y: hold.y+1, valid : false};
        try{
            try{
                if(!objs[top["x"]][top["y"]].blocked)
                    objs[top["x"]][top["y"]].coverUp();
            }catch(err){

            }
            try{
                if(!objs[bottom["x"]][bottom["y"]].blocked)
                    objs[bottom["x"]][bottom["y"]].coverUp();
            }catch(err){

            }
            try{
                if(!objs[left["x"]][left["y"]].blocked)
                objs[left["x"]][left["y"]].coverUp();
            }catch(err){

            }
            try{
                if(!right[bottom["x"]][right["y"]].blocked)
                objs[right["x"]][right["y"]].coverUp();
            }catch(err){

            }
            
        }catch (err){

        }
    }
    let t_temporary = setTimeout(redundant, 100);
    
}


function tracePathAni(){
    let final = Spoint[0];
    final = objs[final.xid][final.yid];
    let curr = Epoint[0];
    let temp = objs[curr.xid][curr.yid];

    let interval2 = setInterval(tracePath, 20);
    function tracePath(){
        if(temp == final){
            clearInterval(interval2);
            Spoint[0].draw();
            return;
        }
        let key = String(temp.x) + "," + String(temp.y);
        let pox = parents[key];
        pox = pox.split(",");
        let a = parseInt(pox[0]);
        let b = parseInt(pox[1]);
        temp = objs[a][b];
        // console.log(temp);
        // console.log("Boo");
        fill("#ffff61");
        square((GLOBAL_SHAPE)*temp.x, (GLOBAL_SHAPE)*temp.y, GLOBAL_SHAPE);
    }
}

function isValid(obj){
    if(obj.x >= 0 && obj.x < size){
        if(obj.y >= 0 && obj.y < size_b){
            if(!objs[obj.x][obj.y].blocked && !objs[obj.x][obj.y].visited)
                return obj.valid = true;
        }
    }
    obj.valid = false;
}


function BFS_a(){
    // console.log(q);
    noLoop();
    for(let i=0;i<Spoint.length;i++){
        Spoint[i].draw();
    }
    if(q.length == 0){
        clearInterval(interval);
        if(!found){
            console.log("Not found");
            changeData("Path not found!")
        }else{
            tracePathAni();
            changeData("Path found!")
            
        }
        for(let i=0;i<Spoint.length;i++){
            Spoint[i].draw();
        }
        // let rat = (GLOBAL_SHAPE);
        // for(let i=0;i<size;i++){
        //     stroke("#8086ff");
        //     line(i*rat, 0, i*rat, height);
        //     line(0, i*rat, width,i*rat);
        // }
        clearInterval(interval);
        DONE = false;
        return;
    }
    let hold = q[0];
    q.shift();
    if(hold.x == endP.xid && hold.y == endP.yid){
        console.log("Found", hold.x, hold.y)
        noLoop();
        found = true;
        q = [];
        return;
    }

    if(!hold.visited){
        // console.log(hold.x, hold.y);
        objs[hold.x][hold.y].visited = true;
        
        // objs[hold.x][hold.y].col = "#f403fc";
        let xpos = hold.x*(GLOBAL_SHAPE);
        let ypos = hold.y*(GLOBAL_SHAPE);
        fill("#00fae4");
        square(xpos,ypos,GLOBAL_SHAPE);

        let Pvalue = String(hold.x) + "," + String(hold.y);
        
        objs[hold.x][hold.y].level++;
        let top    = {x: hold.x-1, y: hold.y, valid : false};
        let bottom = {x: hold.x+1, y: hold.y, valid : false};
        let left   = {x: hold.x, y: hold.y-1, valid : false};
        let right  = {x: hold.x, y: hold.y+1, valid : false};
        isValid(top); isValid(bottom); isValid(left); isValid(right);

        if(top["valid"]) {
            q.push(objs[top["x"]][top["y"]]);
            let Pkey = String(top["x"])+ "," + String(top["y"])
            parents[Pkey] = Pvalue;

            objs[top["x"]][top["y"]].shDraw();
        }
        if(bottom["valid"]) {
            q.push(objs[bottom["x"]][bottom["y"]]);
            let Pkey = String(bottom["x"])+ "," + String(bottom["y"])
            parents[Pkey] = Pvalue;
            objs[bottom["x"]][bottom["y"]].shDraw();
        
        }
        if(left["valid"]) {
            q.push(objs[left["x"]][left["y"]]);
            let Pkey = String(left["x"])+ "," + String(left["y"])
            parents[Pkey] = Pvalue;
            objs[left["x"]][left["y"]].shDraw();
    
        }
        if(right["valid"]){
            q.push(objs[right["x"]][right["y"]]);
            let Pkey = String(right["x"])+ "," + String(right["y"])
            parents[Pkey] = Pvalue;
            objs[right["x"]][right["y"]].shDraw();
        
        }
    }
    
    
}



