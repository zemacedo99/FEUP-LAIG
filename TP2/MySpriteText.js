class MySpriteText extends CGFobject  {
    constructor(scene, text){
        super(scene);
        this.text = text;
        this.retangle = new MyRectangle(scene,0,0,1,1);


    }

    display(){
        this.retangle.display();
    }
}