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

    isPicked(){
        return this.picked;
    }

    pick()
    {
        if(this.picked) this.picked = false;
        else this.picked = true;
    }


    display()
    {
        this.scene.registerForPick( this.id, this);
        this.scene.clearPickRegistration();
        if(this.picked)
        {
            this.scene.pushMatrix();
                this.scene.scale(1.5,1.5,1);
                this.piece.display();
            this.scene.popMatrix();
        }
        this.piece.display();

    }
}