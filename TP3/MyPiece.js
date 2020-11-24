class MyPiece {
    constructor(scene,color,owership)
    {   
        this.scene = scene;
        this.color = color;
        this.player = owership;

        this.piece = new MyCylinder(scene,0.25,0.25,0.25,16,16);
    }

    display()
    {
        this.piece.display();
    }
}