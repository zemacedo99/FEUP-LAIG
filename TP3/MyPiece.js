class MyPiece {
    constructor(scene, id, color, owership, structure = null) {
        this.id = id;
        this.scene = scene;
        this.color = color;
        this.player = owership;
        this.piece = this.switchStructure(structure);
        this.picked = false;
        this.waitingMovement = false;
        this.pieceMovement = new MyPieceMovement(scene, this.piece);
    }

    switchStructure(structure){
        let standart = new MyCylinder(this.scene, 0.5, 0.3, 0.3, 16, 16);
        if(structure === null) return standart;
        switch (structure){
            case 'cylinder':
                return standart;
            case 'sphere':
                return new MySphere(this.scene, 0.4, 16, 16);
            default:
                return standart;
        }
    }

    clone(piece) {
        this.id = piece.id
        this.scene = piece.scene
        this.color = piece.color
        this.player = piece.player
        this.picked = false;
        this.waitingMovement = false;
        this.piece = Object.assign(Object.create(Object.getPrototypeOf(piece.piece)), piece.piece)
        this.pieceMovement = Object.assign(Object.create(Object.getPrototypeOf(piece.pieceMovement)), piece.pieceMovement)
    }

    update(time) {
        this.pieceMovement.update(time);
    }

    isPicked() {
        return this.picked;
    }

    pick() {
        this.picked = !this.picked;
    }

    display() {
        this.scene.registerForPick(this.id, this);
        this.scene.clearPickRegistration();

        this.color.apply();
        this.scene.pushMatrix();
        if(this.piece instanceof MySphere)
            this.scene.translate(0, 0, 0.2);
        if (!this.waitingMovement) {
            if (this.pieceMovement.active) {
                this.pieceMovement.display();
            } else if (this.picked) {
                this.scene.scale(1.5, 1.5, 1);
                this.piece.display();
            } else {
                this.piece.display();
            }
        }

        this.scene.popMatrix();
    }
}