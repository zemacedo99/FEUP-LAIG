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

        let slices_angle = 0;
        let loops_angle = 0;
        let slices_delta = (2 * Math.PI) / this.slices;
        let loops_delta = (2 * Math.PI) / this.loops;

        while (slices_angle < 2 * Math.PI + slices_delta) {
            let cos_slices = Math.cos(slices_angle);
            let sin_slices = Math.sin(slices_angle);
            let cos_loops = Math.cos(loops_angle);
            let sin_loops = Math.sin(loops_angle);

            while (loops_angle < 2 * Math.PI + loops_delta) {

                let x = (this.outer + this.inner * cos_slices) * cos_loops;
                let y = (this.outer + this.inner * cos_slices) * sin_loops;
                let z = this.inner * sin_slices;

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                loops_angle += loops_delta;
            }

            slices_angle += slices_delta;
        }

        for (var i = 0; i < this.loops; i++) {
            let v1 = i * (this.slices + 1);
            let v2 = v1 + this.slices + 1;

            for (var j = 0; j < this.slices; j++) {

                this.indices.push(v1);
                this.indices.push(v2);
                this.indices.push(v1 + 1);

                this.indices.push(v1 + 1);
                this.indices.push(v2);
                this.indices.push(v2 + 1);

                v1++;
                v2++;
            }
        }
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

