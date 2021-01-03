/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MySquare(scene);
    }

    display = function() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.updateTexCoords([0.5, 0.664, 0.5, 0.335, 0.25, 0.335, 0.25, 0.664  ]);
        this.quad.display();
        this.scene.popMatrix();


        // BASE
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.updateTexCoords([0.26, 0.664, 0.26, 1.0, 0.49, 1.0, 0.49, 0.664 ]);
        this.quad.display();
        this.scene.popMatrix();

        // CEU
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.updateTexCoords([0.251, 0.002, 0.251, 0.332, 0.49, 0.332, 0.49, 0.002 ]);
        this.quad.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.updateTexCoords([0.75, 0.664, 0.75, 0.335, 0.50, 0.335, 0.50, 0.664  ]);
        this.quad.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI, 0, 1, 0);
        this.quad.updateTexCoords([0.01, 0.335, 0.01, 0.663, 0.25, 0.664, 0.25, 0.335  ]);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.updateTexCoords([0.75, 0.335, 0.75, 0.664, 1.0, 0.664, 1.0, 0.335  ]);
        this.quad.display();
        this.scene.popMatrix();

    };
}