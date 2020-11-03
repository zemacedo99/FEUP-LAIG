class MySpriteText extends CGFobject  {
    constructor(scene, text, ss ){
        super(scene);
        this.text = text;
        this.retangle = new MyRectangle(scene,0,0,1,1);

        this.ss = ss;

    }

    display(){

        this.retangle.display();
    }
}