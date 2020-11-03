class MySpriteAnimation extends CGFobject  {
    constructor(scene,ssid,startCell,endCell,duration){
        super(scene);
        this.ssid = ssid;
        this.startCell = startCell;
        this.endCell = endCell;
        this.duration = duration;

        this.retangle = new MyRectangle(scene,0,0,1,1);

    }

    update(){
        return null;
    }

    display(){
        this.retangle.display();
    }
}