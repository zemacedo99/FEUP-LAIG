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
    }

  
    update(time) { 
        this.gameBoard.update(time);
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


    display() 
    {
        this.gameBoard.display();
        this.scene.clearPickRegistration();
    }



}