class MyTile {
    constructor(scene, id, position, texture) {
        this.scene = scene;
        this.id = id;
        this.position = position;
        this._piece = null;

        this.form = new MyHexagon(scene);
        this.texture = texture;
        this.picked = false;

        this.initMaterials();
    }

    initMaterials() {
        this.whiteMaterial = new CGFappearance(this.scene);
        this.whiteMaterial.setAmbient(1, 1, 1, 1.0);
        this.whiteMaterial.setDiffuse(1, 1, 1, 1.0);
        this.whiteMaterial.setSpecular(1, 1, 1, 1.0);
        this.whiteMaterial.setEmission(1, 1, 1, 1.0);

        this.defaultMaterial = new CGFappearance(this.scene);
    }

    getPiece() {
        return this._piece;
    }

    setPiece(value) {
        this._piece = value;
    }

    removePiece() {
        this._piece = null;
    }

    isPicked() {
        return this.picked;
    }

    pick() {
        this.picked = !this.picked;
    }

    startMovement(toTile) {
        // this piece is the same of fromTile
        /*if(toTile.getPiece().isPicked()) toTile.getPiece().pick(); // effect of unpick
        if(toTile.isPicked()) toTile.pick(); // effect of unpick*/
        if(this.getPiece().isPicked()) this.getPiece().pick(); // effect of unpick
        if(this.isPicked()) this.pick(); // effect of unpick

        let pieceAux = new MyPiece(this.scene, 0, "", "")
        pieceAux.clone(this._piece);

        // prepare to undo
        pieceAux.pieceMovement.mytile = toTile;
        pieceAux.pieceMovement.totile = this;

        toTile.setPiece(pieceAux);
        toTile.getPiece().waitingMovement = true;
        this._piece.pieceMovement.startMovement(this, toTile)
    }

    update(time) {
        if (this._piece !== null)
            this._piece.update(time);
    }

    display() {
        this.scene.gl.enable(this.scene.gl.BLEND); // enables blending
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);// defines the blending function

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        // if (this.picked) {
        //     this.scene.translate(0, 0, 1);
        // }
        this.whiteMaterial.apply();
        this.texture.bind();
        this.form.display();
        if (this._piece != null) this._piece.display();
        this.defaultMaterial.apply();
        this.scene.popMatrix();

        this.scene.gl.disable(this.scene.gl.BLEND);
    }
}