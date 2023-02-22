class MyCylinderSide extends CGFobject {
    constructor(scene,height,topRadius,bottomRadius,stacks,slices) {
        super(scene);
        this.height = height;
        this.topRadius = topRadius;
        this.bottomRadius = bottomRadius;
        this.stacks = stacks;
        this.slices = slices;

        this.initBuffers();
    }


initBuffers()
{
        this.vertices = [];
        this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var div = 2.0 * Math.PI / this.slices;



        for (var stack = 0; stack <= this.stacks; stack++) 
        {

            var temp_div = 0.0;
            var r = (this.topRadius - this.bottomRadius) * (stack / this.stacks) + this.bottomRadius;
			var z = this.height * stack / this.stacks;
			
            for (slice = 0; slice <= this.slices; slice++) 
            {
                var x = Math.cos(temp_div) * r;
				var y = Math.sin(temp_div) * r;
				
                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0);
                temp_div += div;
			}
			
        }
    
        for (var stack = 0; stack < this.stacks; stack++) 
        {
            for (var slice = 0; slice < this.slices; slice++) 
            {
                var i1 = slice + stack * (this.slices + 1);
                var i2 = slice + stack * (this.slices + 1) + 1;
                var i3 = slice + (stack + 1) * (this.slices + 1);
                var i4 = slice + (stack + 1) * (this.slices + 1) + 1;
                this.indices.push(i4, i3, i1);
                this.indices.push(i1, i2, i4);
            }
		}

        for(var stack = 0; stack<=this.stacks; stack++)
        {
            for(var slice=0; slice<=this.slices; slice++)
            {
				this.texCoords.push(1-slice/this.slices, 1-stack/this.stacks);
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
