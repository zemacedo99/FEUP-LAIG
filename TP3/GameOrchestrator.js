/**
 * GameOrchestrator
 * @constructor
 * @param scene - Reference to MyScene object
 */

class GameOrchestrator {
    constructor(theme, scene) {
        this.scene = scene;
        this.theme = new MySceneGraph('LAIG_TP3_XML_T1_G11_v01.xml', scene);

        this.gameBoard = new MyMainBoard(this.scene);
        this.auxBoard = [];
        this.positionAuxBoards = [];
        this.initAuxBoards();
        this.trash = null;
    }

    update(time) {
        this.gameBoard.update(time);
        if(this.trash === null){
            this.gameBoard.tiles[5].piece.startMovement(this.gameBoard.tiles[5], this.gameBoard.tiles[30])
            this.trash = true;
        }
    }

    initAuxBoards() {
        this.auxBoard.push(new MyAuxBoard(this.scene));
        this.auxBoard.push(new MyAuxBoard(this.scene));
        this.auxBoard.push(new MyAuxBoard(this.scene));

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


    managePickRequest(mode, results) {
        console.log("manage pick request...")
    }


    pickedPiece(obj, customId) {
        console.log("Picked Piece -> obj: " + obj + "customId: " + customId)
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