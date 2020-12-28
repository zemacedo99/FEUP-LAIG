/**
 * GameOrchestrator
 * @constructor
 * @param scene - Reference to MyScene object
 */

class GameOrchestrator {
    constructor(scene) {
        this.scene = scene;
        let filename = getUrlVars()['file'] || "LAIG_TP3_XML_T1_G11_v01.xml";
        this.scene.graph = new MySceneGraph(filename, scene);
       
        this.previousPick = null;
        this.previousObj = null

        this.gameBoard = new MyMainBoard(this.scene);
        this.auxBoard = [];
        this.positionAuxBoards = [];
        this.initPieceColorsMaterials();
        this.initAuxBoards();
    }

    update(time) {
        this.gameBoard.update(time);
    }

    initAuxBoards() {
        this.auxBoard.push(new MyAuxBoard(this.scene,this.greenMaterial,122));
        this.auxBoard.push(new MyAuxBoard(this.scene,this.purpleMaterial,122+43));
        this.auxBoard.push(new MyAuxBoard(this.scene,this.orangeMaterial,122+43+43));

        this.positionAuxBoards[0] = [];
        this.positionAuxBoards[1] = [];
        this.positionAuxBoards[2] = [];

        this.positionAuxBoards[0]["translate"] = [0, 16, 0];
        this.positionAuxBoards[0]["rotate"] = [0, 0, 0, 1];

        this.positionAuxBoards[1]["translate"] = [14, -10, 0];
        this.positionAuxBoards[1]["rotate"] = [Math.PI / 3, 0, 0, 1];

        this.positionAuxBoards[2]["translate"] = [-14, -10, 0];
        this.positionAuxBoards[2]["rotate"] = [-Math.PI / 3, 0, 0, 1];
    }

    generateMaterial(red, green, blue, alpha = 1.0){
        let r = red > 1   ? Math.min(red/256, 1) : red;
        let g = green > 1 ? Math.min(green/256, 1) : green;
        let b = blue > 1  ? Math.min(blue/256, 1) : blue;
        let mat = new CGFappearance(this.scene);
        mat.setAmbient(r, g, b, alpha);
        mat.setDiffuse(r, g, b, alpha);
        mat.setSpecular(r, g, b, alpha);
        mat.setEmission(r, g, b, alpha);

        return mat;
    }


    initPieceColorsMaterials(){
        this.whiteMaterial = this.generateMaterial(256, 256, 256);
        this.greenMaterial = this.generateMaterial(4, 128, 57);
        this.purpleMaterial = this.generateMaterial(96, 40, 129);
        this.orangeMaterial = this.generateMaterial(237, 92, 47);
    }

    // setTheme(){
    //     this.gameBoard.changeTheme(this.theme.board);
    // }

    // changeTheme(theme){
    //     this.theme = theme;
    //     this.gameBoard.changeTheme(theme.board);
    // }

    // changeMode(mode){

    // }

    // undo() {

    // }


    // gameMovie() {

    // }


    managePickRequest(mode, results) 
    {
        if (mode == false) {
			if (results != null && results.length > 0) {
				for (var i = 0; i < results.length; i++) {
					var obj = results[i][0];
					if (obj) {
						var customId = results[i][1];
                        console.log("Picked object: ");
                        console.log(obj);
                        console.log("with pick id: " + customId);
                        this.pickObj(obj, customId);						
					}
				}
				results.splice(0, results.length);
			}
		}
    }


    pickObj(obj, customId) 
    {
        
        if (obj instanceof MyTile) 
        {
            console.log("Tile with id: " + customId + " selected")

            if (!obj.isPicked() && this.previousPick == null) // first object
            {
                console.log("pls select a piece");
            }
            else if (!obj.isPicked() ) { //second object, move the piece to the tile destination (current obj)
                obj.pick();

                this.previousObj.startMovement(this.gameBoard.tiles[this.previousPick-1],this.gameBoard.tiles[customId-1])//creates animation of the piece. customId is the id of the tile
                this.previousPick = null;
                console.log("tile destination selected");
            }
            else { // reset 
                obj.pick();
                this.previousObj = null;
                this.previousPick = null;
            }
        }
        else if (obj instanceof MyPiece) 
        {
            console.log("Piece with id: " + customId + " selected")
            if (!obj.isPicked() && this.previousPick == null) // first object, select piece
            {
                this.previousPick = customId;
                this.previousObj = obj;
                obj.pick();
                console.log("piece selected");
            }
            else { // reset 
                obj.pick();
                this.previousObj = null;
                this.previousPick = null;
            }
        }
        else {
            console.log("error selection object");
        }
    }


    display() {
        this.scene.pushMatrix();
        this.whiteMaterial.apply();
        for (let key in this.auxBoard) {
            this.scene.pushMatrix();
            let myCoord = [
                this.positionAuxBoards[key].translate,
                this.positionAuxBoards[key].rotate,
            ];
            if (myCoord[0] !== undefined && myCoord[0].length === 3)
                this.scene.translate(myCoord[0][0], myCoord[0][1], myCoord[0][2])
            if (myCoord[1] !== undefined && myCoord[1].length === 4)
                this.scene.rotate(myCoord[1][0], myCoord[1][1], myCoord[1][2], myCoord[1][3])

            this.auxBoard[key].display();
            this.scene.popMatrix();
        }
        this.gameBoard.display();
        this.scene.popMatrix();
        this.scene.clearPickRegistration();
    }


}