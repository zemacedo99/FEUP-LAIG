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
        this.side = new MyCylinderSide(scene,height,topRadius,bottomRadius,stacks,slices);
        this.base = new MyCircle(scene, slices);
	}
	
	display() {
		
		this.side.display();  // display the cylinder side
		
		//Base Bottom
		this.scene.pushMatrix();
		this.scene.scale(this.bottomRadius, this.bottomRadius, 1);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.rotate(Math.PI, 0, 0, 1);
		this.base.display();
		this.scene.popMatrix();
        
		//Base Top
		this.scene.pushMatrix();
		this.scene.translate(0, 0, this.height);
		this.scene.scale(this.topRadius, this.topRadius, 1);
		this.scene.rotate(Math.PI, 0, 0, 1);
		this.base.display();
		this.scene.popMatrix();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.side.updateTexCoords(coords);
		this.base.updateTexCoords(coords);
	}
}

