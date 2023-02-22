    
class MyTorus extends CGFobject {
	constructor(scene, inner, outer, slices, loops) {
		super(scene);
		this.inner = inner;
		this.outer = outer;
		this.slices = slices;
        this.loops = loops;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];
    
        
		for(var n = 0; n <= this.slices; n++){
			var theta = n*2*Math.PI/this.slices;

			for(var s=0; s <= this.loops; s++){
				var phi = s*2*Math.PI/this.loops;
				var x = (this.outer + (this.inner * Math.cos(phi))) * Math.cos(theta);
				var y = (this.outer + (this.inner * Math.cos(phi))) * Math.sin(theta);
				var z = this.inner * Math.sin(phi);

				var k  = n/this.loops;
				var t  = s/this.slices;	

				this.vertices.push(x,y,z);
				this.normals.push(Math.cos(theta)*Math.cos(phi),Math.sin(theta)*Math.cos(phi),Math.sin(phi));
				this.texCoords.push(t,k);
			}
			
		}
		
		for(var s=0; s < this.slices; s++){	
			for(var n=0; n < this.loops; n++){
				var i = s*(this.loops+1) + n;
				var j = i + this.loops + 1;

				this.indices.push(i+1, i, j);
				this.indices.push(i+1, j, j+1);
			}
			
		}
		
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