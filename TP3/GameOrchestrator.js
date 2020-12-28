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
    }

    update(time) {
        this.gameBoard.update(time);
    }

    initAuxBoards() {
        let curr_id = this.gameBoard.tiles.length
        this.auxBoard.push(
            new MyAuxBoard(this.scene, this.theme.materials['greenPiece'], curr_id + 1)
        );
        curr_id += this.auxBoard[0].tiles.length;
        this.auxBoard.push(
            new MyAuxBoard(this.scene, this.theme.materials['purplePiece'], curr_id + 1)
        );
        curr_id += this.auxBoard[1].tiles.length;
        this.auxBoard.push(
            new MyAuxBoard(this.scene, this.theme.materials['orangePiece'], curr_id + 1)
        );

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

    setTheme(theme) {
        this.theme = theme;
        console.log(this.theme.materials['greenPiece'])
        this.initAuxBoards();
    }

    // changeMode(mode){

    // }

    // undo() {

    // }


    // gameMovie() {

    // }


    managePickRequest(mode, results) {
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


    pickObj(obj, customId) {

        if (obj instanceof MyTile) {
            console.log("Tile with id: " + customId + " selected")

            if (!obj.isPicked() && this.previousPick == null) // first object
            {
                console.log("pls select a piece");
            } else if (!obj.isPicked()) { //second object, move the piece to the tile destination (current obj)
                obj.pick();

                this.previousObj.startMovement(this.gameBoard.tiles[this.previousPick - 1], this.gameBoard.tiles[customId - 1])//creates animation of the piece. customId is the id of the tile
                this.previousPick = null;
                console.log("tile destination selected");
            } else { // reset
                obj.pick();
                this.previousObj = null;
                this.previousPick = null;
            }
        } else if (obj instanceof MyPiece) {
            console.log("Piece with id: " + customId + " selected")
            if (!obj.isPicked() && this.previousPick == null) // first object, select piece
            {
                this.previousPick = customId;
                this.previousObj = obj;
                obj.pick();
                console.log("piece selected");
            } else { // reset
                obj.pick();
                this.previousObj = null;
                this.previousPick = null;
            }
        } else {
            console.log("error selection object");
        }
    }


    display() {
        this.scene.pushMatrix();
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