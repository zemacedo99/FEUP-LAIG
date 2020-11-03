class MySpritesheet extends CGFobject  {
    constructor(scene, texture, sizeM, sizeN){
        super(scene);
        this.texture = texture;
        this.sizeM = sizeM;
        this.sizeN = sizeN;

        this.shader = new CGFshader(this.scene.gl, "./shaders/spritesheet.vert", "./shaders/spritesheet.frag");
    }

    activateCellMN(m, n){
        this.shader.setUniformsValues({sizeM : this.sizeM,
                                       sizeN: this.sizeN,
                                       m: m,
                                       n: n});

                                       
        this.scene.setActiveShader(this.shader);
    }
}