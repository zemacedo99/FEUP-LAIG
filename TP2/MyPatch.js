class MyPatch {
	constructor(scene,npointsU, npointsV, npartsU,npartsV,controlpoints) {
        this.scene = scene;
		this.npartsU = npartsU;
        this.npartsV = npartsV;
        this.npointsU = npointsU;
        this.npointsV = npointsV;
        this.controlpoints = controlpoints;

		console.log(scene)
		console.log(npartsU)
		console.log(npartsV)
		console.log(npointsU)
		console.log(npointsV)
		console.log(controlpoints)
		let nurbsSurface = new CGFnurbsSurface(this.npointsU-1, this.npointsV-1, this.controlpoints);
		this.obj = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, nurbsSurface );
	
	}




	display() 
	{
		this.obj.display();
	};

}

