class Shape{
    constructor(x=0,y=0,r=width/size){
        this.x = x;
        this.y = y;
        this.r = r;
        this.start = false;
        this.end = false;
        this.blocked = false;
        this.level = 0;
        this.visited = false;
        this.visited2 = false;
        this.h = 1024;
        this.weight = 1;
        this.f = 1024;
        this.col = "#ffffff";
        this.cirR = 15;
    }

    draw(){
        if(this.visited) this.col = "#ff70f5";
        let xpos = this.x*(GLOBAL_SHAPE);
        let ypos = this.y*(GLOBAL_SHAPE);
        noStroke();
        fill(this.col);
        square(xpos,ypos,GLOBAL_SHAPE);
    }

    shDraw(){
        
        let xpos = this.x*(GLOBAL_SHAPE);
        let ypos = this.y*(GLOBAL_SHAPE);
        xpos += GLOBAL_SHAPE/2; ypos += GLOBAL_SHAPE/2;
        fill("#73fff3");
        noStroke();
        circle(xpos, ypos, this.cirR);
    
    }

    bDraw(){
        let xpos = this.x*(GLOBAL_SHAPE);
        let ypos = this.y*(GLOBAL_SHAPE);
        // fill("#291710");
        fill("#000000");
        square(xpos,ypos,GLOBAL_SHAPE);
    }

    coverUp(){
        let xpos = this.x*(GLOBAL_SHAPE);
        let ypos = this.y*(GLOBAL_SHAPE);
        fill("#00fae4");
        square(xpos,ypos,GLOBAL_SHAPE);
    }
}

class anoShape{
    constructor(x,y, xid = 0, yid= 0, col="#344891", r=width/size){
        this.x = x;
        this.y = y;
        this.r = r;
        this.col = col;
        this.xid = xid;
        this.yid = yid;
    }

    draw(){
        fill(this.col);
        noStroke();
        square(this.x,this.y,GLOBAL_SHAPE);
    }
}