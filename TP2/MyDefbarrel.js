class MyDefbarrel extends CGFobject {
	constructor(scene,base,middle,height, slices,stacks) {
        super(scene);
        this.base = base;
        this.middle = middle;
		this.height = height;
        this.slices = slices;
        this.stacks = stacks;
        
        this.r = base;
        this.R = middle;

        this.h = (4/3)*this.r;
        this.H = (4/3)*(this.R-this.r);
        this.L = height;

        this.controlvertexes = 
        [
            [   //P4
                [this.r,0,0,1],  //Q1
                [this.r + this.H,0,this.H/Math.tan(30*DEGREE_TO_RAD),1], //Q2
                [this.r + this.H,0,this.L-this.H/Math.tan(30*DEGREE_TO_RAD),1], //Q3
                [this.r,0,this.L,1] //Q4
            ],
            [   //P3
                [this.r,this.h,0,1],
                [this.r + this.H, this.h, this.H/Math.tan(30*DEGREE_TO_RAD),1],
                [this.r + this.H, this.h, this.L - this.H/Math.tan(30*DEGREE_TO_RAD),1],
                [this.r, this.h, this.L, 1]
            ],
            [   //P2
                [-this.r,this.h,0,1],
                [-this.r - this.H, this.h , this.H/Math.tan(30*DEGREE_TO_RAD),1],
                [-this.r - this.H, this.h , this.L - this.H/Math.tan(30*DEGREE_TO_RAD),1],
                [-this.r, this.h, this.L, 1]
            ],
            [   //P1
                [-this.r,0,0,1],
                [-this.r - this.H,0,this.H/Math.tan(30*DEGREE_TO_RAD),1],
                [-this.r - this.H,0,this.L - this.H/Math.tan(30*DEGREE_TO_RAD),1],
                [-this.r,0,this.L,1]
            ]
        ]

        // console.log([
        //     [   //P4
        //         [this.r,0,0,1],  //Q1
        //         [this.r + this.H,0,this.H/Math.tan(30*DEGREE_TO_RAD),1], //Q2
        //         [this.r + this.H,0,this.L-this.H/Math.tan(30*DEGREE_TO_RAD),1], //Q3
        //         [this.r,0,this.L,1] //Q4
        //     ],
        //     [   //P3
        //         [this.r,this.h,0,1],
        //         [this.r + this.H, this.h, this.H/Math.tan(30*DEGREE_TO_RAD),1],
        //         [this.r + this.H, this.h, this.L - this.H/Math.tan(30*DEGREE_TO_RAD),1],
        //         [this.r , this.h, this.L, 1]
        //     ],
        //     [   //P2
        //         [-this.r,this.h,0,1],
        //         [-this.r - this.H, this.h , this.H/Math.tan(30*DEGREE_TO_RAD),1],
        //         [-this.r - this.H, this.h , this.L - this.H/Math.tan(30*DEGREE_TO_RAD),1],
        //         [-this.r, this.h, this.L, 1]
        //     ],
        //     [   //P1
        //         [-this.r,0,0,1],
        //         [-this.r - this.H,0,this.H/Math.tan(30*DEGREE_TO_RAD),1],
        //         [-this.r - this.H,0,this.L - this.H/Math.tan(30*DEGREE_TO_RAD),1],
        //         [-this.r,0,this.L,1]
        //     ]
        // ])

        // this.half = new MyPatch(scene,4,4,this.slices,this.stacks,this.controlvertexes);

        // this.barrel = new MyPatch(scene,4,4,slices,stacks,this.controlpoints)
        // this.halfLeft = new MyPatch(scene,4,4,this.slices,this.stacks,this.controlpoints)

	}


	display() 
	{
		// this.halfRight.display();
    };
    
    
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

