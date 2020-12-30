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
        for(let auxB of this.auxBoard){
            auxB.update(time);
        }
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
        for(let tile of this.auxBoard[0].tiles){
            tile.position[0] += this.positionAuxBoards[0]["translate"][0];
            tile.position[1] += this.positionAuxBoards[0]["translate"][1];
            tile.position[2] += this.positionAuxBoards[0]["translate"][2];
        }

        this.positionAuxBoards[1]["translate"] = [14, -10, 0];
        this.positionAuxBoards[1]["rotate"] = [Math.PI / 3, 0, 0, 1];
        for(let tile of this.auxBoard[1].tiles){
            tile.position[0] += this.positionAuxBoards[1]["translate"][0];
            tile.position[1] += this.positionAuxBoards[1]["translate"][1];
            tile.position[2] += this.positionAuxBoards[1]["translate"][2];
        }

        this.positionAuxBoards[2]["translate"] = [-14, -10, 0];
        this.positionAuxBoards[2]["rotate"] = [-Math.PI / 3, 0, 0, 1];
        for(let tile of this.auxBoard[2].tiles){
            tile.position[0] += this.positionAuxBoards[2]["translate"][0];
            tile.position[1] += this.positionAuxBoards[2]["translate"][1];
            tile.position[2] += this.positionAuxBoards[2]["translate"][2];
        }
    }

    setTheme(theme) {
        this.theme = theme;
        this.initAuxBoards();
    }

    // changeMode(mode){

    // }

    // undo() {

    // }


    // gameMovie() {

    // }


    managePickRequest(mode, results) {
        if (mode === false) {
            if (results != null && results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    let obj = results[i][0];
                    if (obj) {
                        let customId = results[i][1];
                        this.pickObj(obj, customId);
                    }
                }
                results.splice(0, results.length);
            }
        }
    }


    pickObj(obj, customId) {

        if (obj instanceof MyTile) {
            if (!obj.isPicked() && this.previousPick == null) // first object
            {
                console.log("Please, select a piece");
            } else if (!obj.isPicked() && obj.getPiece() === null) { //second object, move the piece to the tile destination (current obj)
                let fromBoard;
                let maxIdBoard = this.gameBoard.tiles.length;
                if (this.previousPick <= maxIdBoard) {
                    fromBoard = this.gameBoard;
                    console.log("Main BOARD")
                } else if (this.previousPick < this.auxBoard[0].id ) { // termina em id++
                    fromBoard = this.auxBoard[0];
                    this.previousPick -= maxIdBoard
                    console.log("Green BOARD")
                } else if (this.previousPick < this.auxBoard[1].id) {
                    fromBoard = this.auxBoard[1];
                    this.previousPick -= (this.auxBoard[0].id - 1)
                    console.log("Purple BOARD")
                } else {
                    console.log("Orange BOARD")
                    fromBoard = this.auxBoard[2];
                    this.previousPick -= (this.auxBoard[1].id - 1)
                }

                if(this.gameBoard.tiles[customId - 1] !== undefined){
                    obj.pick();
                    fromBoard.tiles[this.previousPick - 1].startMovement(this.gameBoard.tiles[customId - 1])//creates animation of the piece. customId is the id of the tile
                    this.previousPick = null;
                    console.log("Tile has been picked:");
                    console.log(obj);
                }

            } else { // reset
                if(obj.isPicked()) obj.pick(); // effect of unpick
                this.previousObj = null;
                this.previousPick = null;
                console.log("Tile has been unpicked.");
            }
        } else if (obj instanceof MyPiece) {

            if (!obj.isPicked() && this.previousPick == null) // first object, select piece
            {
                this.previousPick = customId;
                this.previousObj = obj;
                obj.pick();
                console.log("Piece has been picked:");
                console.log(obj);
            } else { // reset
                if(obj.isPicked()) obj.pick(); //effect of unpick
                console.log("Piece has been unpicked.");
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
            this.auxBoard[key].display();
        }
        this.gameBoard.display();
        this.scene.popMatrix();
        this.scene.clearPickRegistration();
    }


}