class MyTile {
    constructor(scene, position, texture) {
        this.scene = scene;
        this.position = position;
        this._piece = new MyPiece(scene, 1, "", "");
        this.form = new MyHexagon(scene);
        this.texture = texture;
    }

    get piece() {
        return this._piece;
    }

    set piece(value) {
        this._piece = value;
    }

    display() {
        this.scene.gl.enable(this.scene.gl.BLEND); // enables blending
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);// defines the blending function

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.texture.bind();
        this.form.display();
        this._piece.display();
        this.scene.popMatrix();

        this.scene.gl.disable(this.scene.gl.BLEND);
    }
}