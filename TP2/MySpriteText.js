class MySpriteText extends CGFobject  {
    constructor(scene, text, spritesheet){
        super(scene);
        this.text = text;
        this.retangle = new MyRectangle(scene,0,0,1,1);

        this.spritesheet = spritesheet;

    }

    display(){

        //TO DO: aplicar a spritesheet com a função .bind()

        this.retangle.display();



    }
}