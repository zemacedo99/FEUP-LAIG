/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene,height,topRadius,bottomRadius,stacks,slices) {
        super(scene);
        this.height = height;
        this.topRadius = topRadius;
        this.bottomRadius = bottomRadius;
        this.stacks = stacks;
        this.slices = slices;

        this.base = new MyCircle(scene, slices);
        this.initBuffers();
    }


    initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let div = 2*Math.PI/this.slices;
		let div_radius = (this.topRadius - this.bottomRadius)/this.stacks;
		let div_stack = this.height/this.stacks;

		// Cylinder
		for(let i = 0; i <= this.slices; ++i) {

			for(let j = 0; j <= this.stacks; ++j) {

				this.vertices.push((this.bottomRadius + div_radius*j) * Math.cos(div*i), (this.bottomRadius + div_radius*j) * Math.sin(div*i),j*div_stack);

				this.texCoords.push(i*1/this.slices,1 - (j*1/this.stacks));

				this.normals.push(Math.cos(div*i), Math.sin(div*i),0);

			}

		}

		for (let i = 0; i < this.slices; ++i) {
			for(let j = 0; j < this.stacks; ++j) {
                this.indices.push(  (i+1)*(this.stacks+1) + j, 
                                     i*(this.stacks+1) + j+1, i*(this.stacks+1) + j,i*(this.stacks+1) + j+1,
                                    (i+1)*(this.stacks+1) + j, (i+1)*(this.stacks+1) + j+1);
			}
		}	

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
    



    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

	display() {

		//Base Bottom
		this.scene.pushMatrix();
		this.scene.scale(this.bottomRadius, this.bottomRadius, 1);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.base.display();
		this.scene.popMatrix();
        this.display();  // display the cylinder himself
        
		//Base Top
		this.scene.pushMatrix();
		this.scene.translate(0, 0, this.height);
		this.scene.scale(this.topRadius, this.topRadius, 1);
		this.circle.display();
		this.scene.popMatrix();
	}
}

