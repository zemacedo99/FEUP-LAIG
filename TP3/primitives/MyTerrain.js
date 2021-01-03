
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class MyTerrain extends CGFobject{
    constructor(scene, npartsU,npartsV) {
        super(scene);
        this.plane = new MyPlane(this.scene, npartsU,npartsV);
        this.initMaterials();

        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShader.setUniformsValues({terrainMap: 1});
        this.terrainShader.setUniformsValues({terrainTex: 2});
    }

    initTexture(image, wrap1 = 'REPEAT', wrap2 = wrap1) {
        let t = new CGFtexture(this.scene, image);
        return t;
    }

    initMaterials() {
        this.terrainMap = this.initTexture("scenes/images/heightmap.jpg");
        this.terrainTex = this.initTexture("scenes/images/terrain.jpg");
    }

    display = function() {
        this.scene.setActiveShader(this.terrainShader);
        this.scene.pushMatrix();

        this.terrainMap.bind(1);
        this.terrainTex.bind(2);

        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}

