class MySpritesheet {
    constructor(scene, texture, sizeM, sizeN){
        this.scene = scene;
        this.texture = texture;
        this.sizeM = sizeM;
        this.sizeN = sizeN;

        this.shader = new CGFshader(this.scene.gl, "./shaders/spritesheet.vert", "./shaders/spritesheet.frag");
    }

    activateShader()
    {
        
        this.scene.setActiveShaderSimple(this.shader);
        this.texture.bind();

    }

    activateCellMN(m, n)
    {
        this.shader.setUniformsValues({sizeM : this.sizeM,
                                       sizeN : this.sizeN,
                                       m: m / this.sizeM,
                                       n: n / this.sizeN});
    }

    activateCellP(p)
    {
        let m = p % this.sizeM;               /* m (column) is the rest of the division of the p for the number of columns*/
        let n = Math.floor( p / this.sizeN ); /* n (row) is the division of the p for the number of columns, rounded down */
    
        this.activateCellMN(m,n);
    }


      
}