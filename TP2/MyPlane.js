class MyPlane extends CGFobject {
	constructor(scene,npartsU,npartsV) {
		super(scene);
		this.npartsU = npartsU;
		this.npartsV = npartsV;


		this.init();
	}

	init() 
	{
		let controlvertexes = 	[	
									[ // U = 0
											[-1.0, 0.0 , 1.0, 1 ],// V = 0
											[-1.0, 0.0 , -1.0, 1 ] // V = 1
										
									],
									
									[ // U = 1
											[ 1.0, 0.0, 1.0, 1 ], // V = 0
											[ 1.0, 0.0,-1.0, 1 ]  // V = 1					 
									]
								]; 

		let nurbsSurface = new CGFnurbsSurface(1, 1, controlvertexes);

		this.obj = new CGFnurbsObject(this.scene, this.npartsU, this.npartsV, nurbsSurface ); // must provide an object with the function getPoint(u, v) (CGFnurbsSurface has it)	
	};


	display() 
	{
		this.obj.display();
	};

}

