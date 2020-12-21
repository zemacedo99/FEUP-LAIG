class MyTile{
    constructor(scene,position)
    {
        this.scene = scene;
        this.position = position;
        this._piece = new MyPiece(scene, "", "")

        this.form = new MyHexagon(scene);
    }

    get piece() {
        return this._piece;
    }

    set piece(value) {
        this._piece = value;
    }

    display()
    {   
        this.scene.pushMatrix();
            // this.scene.multMatrix(this.position);
            this.form.display();
        this.scene.popMatrix();
    }
}