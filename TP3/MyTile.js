class MyTile{
    constructor(scene,id,position,texture)
    {
        this.scene = scene;
        this.id = id;
        this.position = position;
        // this._piece = new MyPiece(scene,this.id , "", "");
        this._piece = null;

        this.form = new MyHexagon(scene);
        this.texture = texture;
        this.picked = false;
    }

    getPiece() {
        return this._piece;
    }

    setPiece(value) {
        this._piece = value;
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
        this.scene.gl.enable(this.scene.gl.BLEND); // enables blending
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);// defines the blending function

        this.scene.pushMatrix();
        this.scene.translate(this.position[0],this.position[1],this.position[2]);
            if(this.picked)
            {
                this.scene.pushMatrix();
                    this.scene.translate(0,0,1);
                    this.form.display();
                this.scene.popMatrix();
            }
            this.texture.bind();
            this.form.display();
            if(this._piece != null) this._piece.display();
        this.scene.popMatrix();

        this.scene.gl.disable(this.scene.gl.BLEND);
    }
}