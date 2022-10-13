let sp, ep, inA_star = false;
let pq;
function A_star(){
    noLoop();
    console.log("Commencing A*")
    pq = new Priority_Queue();
  
    DONE = true;
    found = false;
    if(!DONE){
        alert("Choose an Algorithm");
        return;
    }
    inA_star = true;
    if(Spoint.length == 0 || Epoint.length == 0){
        return;
    }
    sp = Spoint[0];
    ep = Epoint[0];
    sp = objs[sp.xid][sp.yid];
    ep = objs[ep.xid][ep.yid];
    console.log(sp);
    ep.f = 0;
    sp.f = 0;
    sp.weight = 0;
    pq.insert(sp);
    console.log(pq);
    console.log("after")
    
    interval = setInterval(A_star_a, 30);
}

function A_star_b(){
    pq = new Priority_Queue();
    console.log(pq);
    
}
function A_star_a(){
    for(let i=0;i<Spoint.length;i++){
        Spoint[i].draw();
    }
    if(pq.empty()){
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

        clearInterval(interval);
        DONE = false;
        return;
    }
    let hold = pq.top();
    pq.pop();
    if(hold.x == ep.x && hold.y == ep.y){
        console.log("Found", hold.x, hold.y)
        found = true;
        pq = new Priority_Queue();
        return;
    }
    if(!hold.visited){
        objs[hold.x][hold.y].visited = true;
        let xpos = hold.x*(GLOBAL_SHAPE);
        let ypos = hold.y*(GLOBAL_SHAPE);
        fill("#00fae4");
        square(xpos,ypos,GLOBAL_SHAPE);

        let Pvalue = String(hold.x) + "," + String(hold.y);
        let top    = {x: hold.x, y: hold.y-1, valid : false};
        let bottom = {x: hold.x, y: hold.y+1, valid : false};
        let left   = {x: hold.x-1, y: hold.y, valid : false};
        let right  = {x: hold.x+1, y: hold.y, valid : false};
        isValid(top); isValid(bottom); isValid(left); isValid(right);
        if(top["valid"]) {
            let a = objs[top["x"]][top["y"]];
            let Pkey = String(top["x"])+ "," + String(top["y"])
            let hue = manhatten_dist(a,ep);
            if((Pkey in parents)){
                let pox = parents[Pkey];
                pox = pox.split(",");
                let aa = parseInt(pox[0]);
                let b = parseInt(pox[1]);

                if(objs[aa][b].f > objs[hold.x][hold.y].weight+1+hue){
                    a.h = hue;
                    a.f = objs[hold.x][hold.y].weight + hue;
                    a.weight = objs[hold.x][hold.y].weight+1;
                    parents[Pkey] = Pvalue;
                    pq.insert(a);
                    a.shDraw();
                }
            }else{
                a.h = hue;
                a.f = objs[hold.x][hold.y].weight+ 1 + hue;
                a.weight = objs[hold.x][hold.y].weight+1;
                parents[Pkey] = Pvalue;
                pq.insert(a);
                a.shDraw();
            }
            
        }
        if(bottom["valid"]) {
            let a = objs[bottom["x"]][bottom["y"]];
            let Pkey = String(bottom["x"])+ "," + String(bottom["y"])
            let hue = manhatten_dist(a,ep);
            if((Pkey in parents)){
                let pox = parents[Pkey];
                pox = pox.split(",");
                let aa = parseInt(pox[0]);
                let b = parseInt(pox[1]);

                if(objs[aa][b].f > objs[hold.x][hold.y].weight+1+hue){
                    a.h = hue;
                    a.f = objs[hold.x][hold.y].weight + hue;
                    a.weight = objs[hold.x][hold.y].weight+1;
                    parents[Pkey] = Pvalue;
                    pq.insert(a);
                    a.shDraw();
                }
            }else{
                a.h = hue;
                a.f = objs[hold.x][hold.y].weight+ 1 + hue;
                a.weight = objs[hold.x][hold.y].weight+1;
                parents[Pkey] = Pvalue;
                pq.insert(a);
                a.shDraw();
            }
        
        }
        if(left["valid"]) {
            let a = objs[left["x"]][left["y"]];
            let Pkey = String(left["x"])+ "," + String(left["y"])
            let hue = manhatten_dist(a,ep);
            if((Pkey in parents)){
                let pox = parents[Pkey];
                pox = pox.split(",");
                let aa = parseInt(pox[0]);
                let b = parseInt(pox[1]);

                if(objs[aa][b].f > objs[hold.x][hold.y].weight+1+hue){
                    a.h = hue;
                    a.f = objs[hold.x][hold.y].weight + hue;
                    a.weight = objs[hold.x][hold.y].weight+1;
                    parents[Pkey] = Pvalue;
                    pq.insert(a);
                    a.shDraw();
                }
            }else{
                a.h = hue;
                a.f = objs[hold.x][hold.y].weight+ 1 + hue;
                a.weight = objs[hold.x][hold.y].weight+1;
                parents[Pkey] = Pvalue;
                pq.insert(a);
                a.shDraw();
            }
    
        }
        if(right["valid"]){
            let a = objs[right["x"]][right["y"]];
            let Pkey = String(right["x"])+ "," + String(right["y"])
            let hue = manhatten_dist(a,ep);
            if((Pkey in parents)){
                let pox = parents[Pkey];
                pox = pox.split(",");
                let aa = parseInt(pox[0]);
                let b = parseInt(pox[1]);

                if(objs[aa][b].f > objs[hold.x][hold.y].weight+1+hue){
                    a.h = hue;
                    a.f = objs[hold.x][hold.y].weight + hue;
                    a.weight = objs[hold.x][hold.y].weight+1;
                    parents[Pkey] = Pvalue;
                    pq.insert(a);
                    a.shDraw();
                }
            }else{
                a.h = hue;
                a.f = objs[hold.x][hold.y].weight+ 1 + hue;
                a.weight = objs[hold.x][hold.y].weight+1;
                parents[Pkey] = Pvalue;
                pq.insert(a);
                a.shDraw();
            }
        }
    }

}

function manhatten_dist(a,b){
    return (abs(b.x - a.x) + abs(b.y - a.y));
}