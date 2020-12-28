class MyPiece {
    constructor(scene,id,color,owership)
    {   
        this.id = id;
        this.scene = scene;
        this.color = color;
        this.player = owership;
        this.piece = new MyCylinder(scene,0.25,0.25,0.25,16,16);
        this.picked = false;
        this.pieceMovement = new MyPieceMovement(scene, this.piece);
    }
    
    update(time){
        this.pieceMovement.update(time);
    }

    startMovement(fromTile, toTile){
        this.pieceMovement.startMovement(fromTile.position, toTile.position)
    }

    clone(piece){
        this.id = piece.id;
        this.scene = piece.scene;
        this.color = piece.color;
        this.player = piece.owership;
        this.piece = piece.piece;
        this.picked = piece.picked;
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
        
        this.color.apply();
        this.scene.pushMatrix();

            if(this.picked)
            {
                this.scene.scale(1.5,1.5,1);
                this.piece.display();
            }

            else if(this.pieceMovement.active)
            {
                this.pieceMovement.display();
            }
            else
            {
                this.piece.display();
            }

        this.scene.popMatrix();
    }
}