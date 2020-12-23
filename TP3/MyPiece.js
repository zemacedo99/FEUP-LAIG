class MyPiece {
    constructor(scene,id,color,owership)
    {   
        this.id = id;
        this.scene = scene;
        this.color = color;
        this.player = owership;

        this.piece = new MyCylinder(scene,0.25,0.25,0.25,16,16);
        this.picked = false;
    }

    display()
    {
        if(this.picked)
        {
            this.scene.pushMatrix();
                this.scene.scale(1,1,2);
                this.piece.display();
            this.scene.popMatrix();
        }
        this.piece.display();

    }
}