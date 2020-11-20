class MyPatch extends CGFobject {
	constructor(scene,npartsU,npartsV,npointsU, npointsV,controlpoints) {
        super(scene);
        this.npointsU = npointsU;
        this.npointsV = npointsV;
		this.npartsU = npartsU;
        this.npartsV = npartsV;
        this.controlpoints = controlpoints;



		this.init();
	}

	init() 
	{
		console.log(this.controlpoints)
		console.log(this.npointsU)
		console.log(this.npointsV)
		let nurbsSurface = new CGFnurbsSurface(this.npointsU-1, this.npointsV-1, this.controlpoints);
		console.log("here")

		this.obj = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, nurbsSurface ); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)	
	};


	display() 
	{
		this.obj.display();
	};

}

