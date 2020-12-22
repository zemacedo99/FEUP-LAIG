/**
 * MyHexagon
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHexagon extends CGFobject {
	constructor(scene) {
		super(scene);
		this.width = Math.sqrt(3);
		this.height = 2; 
		this.initBuffers();
	}
	
	initBuffers() {


        // this.vertices = [    
        //     0.0,   0.0, 0.0,    // center
        //     0.0,   1.0, 0.0,    // top
        //     1.0,   0.5, 0.0,    // right top
        //     1.0,   -0.5, 0.0,   // right bottom
        //     0.0,   -1.0, 0.0,   //  bottom
        //     -1.0,   -0.5, 0.0,   // left bottom
        //     -1.0,   0.5, 0.0,   // left top
		// ];
		
		this.vertices = [     
			0.0,   0.0, 0.0,    //center
			0.0,   1.0, 0.0,    // top
		   -1.0,   0.5, 0.0,    // left top
		   -1.0,  -0.5, 0.0,    // left bottom
			0.0,  -1.0, 0.0,    // bottom
			1.0,  -0.5, 0.0,    // right bottom
			1.0,  0.5,  0.0];   // right top

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2,
            0, 2, 3,
            0, 3, 4,
            0, 4, 5,
            0, 5, 6,
            0, 6, 1,
            0, 2, 1,
            0, 3, 2,
            0, 4, 3,
            0, 5, 4,
            0, 6, 5,
            0, 1, 6
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
            0, 0, 1,
            0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0.5, 0.5,
			0.5, 0.0,
			0.0, 0.0,
			0.0, 1.0,
			0.5, 1.0,
			1.0, 1.0,
			1.0, 0.0,
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
    }
    
}

