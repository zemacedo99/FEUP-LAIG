class MyTriangle extends CGFobject {
	constructor(scene, x1, y1, x2, y2,x3,y3) {
		super(scene);
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;

		this.initBuffers();
	}
	
	initBuffers() {
		
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

