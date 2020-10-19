class MyNode extends CGFobject {
	constructor(scene, id, material, texture,matrix,descendants) {
		super(scene);
		this.id = id;
		this.material = material;
		this.texture = texture;
		this.matrix = matrix;
		this.descendants = descendants;
	}
	
}
