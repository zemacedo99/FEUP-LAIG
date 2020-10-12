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
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

      

        for(var i = 0; i <= this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            
            
            this.vertices.push(ca, 0, -sa);
            this.texCoords.push(i/this.slices,1); //baixo esquerdo
            
            this.vertices.push(caa, 0, -saa);
            this.texCoords.push((i+1)/this.slices,1); //baixo direito
            
            this.vertices.push(ca, 1, -sa);
            this.texCoords.push(i/this.slices,0); //topo esquerdo
            
            this.vertices.push(caa, 1, -saa);
            this.texCoords.push((i+1)/this.slices,0); //topo direito
            
            /*
            Texture coords (s,t)
            +----------> s
            |
            |
            |
            v
            t
            */

        

            // this.texCoords.push(ca,-sa); //baixo esquerdo
            // this.texCoords.push(caa,-saa); //baixo direito
            // this.texCoords.push(ca,-sa); //topo esquerdo
            // this.texCoords.push(caa,-saa); //topo direito

            
            this.normals.push(ca, 0, -sa);
            this.normals.push(caa, 0, -saa);
            this.normals.push(ca, 0, -sa);
            this.normals.push(caa, 0, -saa);


            this.indices.push(4*i, (4*i+1) , (4*i+2) );
            this.indices.push((4*i+1), (4*i+3) , (4*i+2) );

            // baixo
            this.indices.push((4*i*this.slices)%this.slices, (4*i+1) , (4*i) );

            //cima
            this.indices.push( (4*i+2), (4*i+3), (4*i*this.slices+2)%this.slices );


 
    
            ang+=alphaAng;
        }




        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    



    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


/*
Codigo antigo de cgra,
TO DO: atualizar! 
*/ 