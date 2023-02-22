class MyCircle extends CGFobject {
	constructor(scene, sides) {
		super(scene);

		this.sides = sides;

		this.initBuffers();
	};

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

        let div = 2*Math.PI/this.sides;
        
  
        this.vertices.push (0, 0, 0)
        this.normals.push  (0, 0, 1)
        this.texCoords.push(0.5, 0.5)


        for(let i = 0; i <= this.sides; ++i) 
        {
            this.vertices.push(Math.cos(div*i), Math.sin(div*i), 0);

            this.normals.push(0, 0, 1);

            this.texCoords.push((Math.cos(div*i)+1)/2, 1 - (Math.sin(div*i)+1)/2);
		}

		for (let j = 1; j <= this.sides; ++j) {
            this.indices.push(0, j, j+1);
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};