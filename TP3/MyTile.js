class MyTile{
    constructor(scene)
    {
        this._piece = new MyPiece(scene, "", "")
        this.scene = scene;
    }

    get piece() {
        return this._piece;
    }

    set piece(value) {
        this._piece = value;
    }

    display()
    {
        this._piece.display();
    }
}