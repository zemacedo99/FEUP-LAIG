class MyDefbarrel {
	constructor(scene,base,middle,height, slices,stacks) {
        this.scene = scene;
        this.base = base;
        this.middle = middle;
		this.height = height;
        this.slices = slices;
        this.stacks = stacks;
        

        this.h = (4/3)*this.base;
        this.H = (4/3)*(this.middle-this.base);

        this.controlvertexes = 
        [
            [ //P4
                [this.base, 0, 0, 1],//Q1
                [this.base + this.H, 0, this.height/3, 1],//Q2
                [this.base + this.H, 0, 2*this.height/3, 1],//Q3
                [this.base, 0, this.height, 1],//Q4

            ],
            [ //P3
                [this.base, this.h, 0, 1],
                [this.base + this.H, (4/3)*(this.base + this.H),  this.height/3,1],
                [this.base + this.H, (4/3)*(this.base + this.H), 2 * this.height/3,1],
                [this.base, this.h, this.height, 1],
            ],
            [ //P2
                [-this.base, this.h, 0, 1],
                [-this.base - this.H, (4/3)*(this.base + this.H), this.height/3, 1],
                [-this.base - this.H, (4/3)*(this.base + this.H),2 *  this.height/3, 1],
                [-this.base, this.h, this.height, 1],

            ],
            [ //P1
                [-this.base, 0, 0, 1],//Q1
                [-this.base - this.H, 0,  this.height/3, 1],//Q2
                [-this.base - this.H, 0, 2*  this.height/3 , 1],//Q3
                [-this.base, 0, this.height, 1],//Q4

            ],
        ];

        this.barrel = new MyPatch(this.scene,4,4,this.slices,this.stacks,this.controlvertexes);
	}


	display() 
	{
        this.barrel.display();

        this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 0.0, 0.0, 1.0);
            this.barrel.display();
        this.scene.popMatrix();
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

