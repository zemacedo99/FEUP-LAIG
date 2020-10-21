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
		this.vertices = 
		[
            this.x1, this.y1, 0, 
            this.x2, this.y2, 0,
            this.x3, this.y3, 0
        ]

        this.indices = [2,1,0]

        this.normals = [
			0, 0, 1,
			0, 0, 1,
            0, 0, 1
		]
        
        var a = Math.sqrt(Math.pow(this.x2-this.x1, 2) + Math.pow(this.y2-this.y1, 2));
        var b = Math.sqrt(Math.pow(this.x3-this.x2, 2) + Math.pow(this.y3-this.y2, 2));
        var c = Math.sqrt(Math.pow(this.x1-this.x3, 2) + Math.pow(this.y1-this.y3, 2));
     
        var cos = (Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2))/(2*a*c);
        var sin = Math.sqrt(1 - Math.pow(cos, 2)); 

        this.texCoords = [
            0, 0,
            a, 0,
            c*cos, c*sin
        ]
		
        this.primitiveType = this.scene.gl.TRIANGLES
        this.initGLBuffers()
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

