class MyPiece {
    constructor(scene, id, color, owership, structure = null) {
        this.id = id;
        this.scene = scene;
        this.color = color;
        this.player = owership;
        this.piece = structure || new MyCylinder(scene, 0.25, 0.25, 0.25, 16, 16);
        this.picked = false;
        this.waitingMovement = false;
        this.pieceMovement = new MyPieceMovement(scene, this.piece);
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