/**
 * GameOrchestrator
 * @constructor
 * @param scene - Reference to MyScene object
 */

class GameOrchestrator {
    constructor(theme, scene) {
        this.scene = scene;
        this.theme = new MySceneGraph('LAIG_TP3_XML_T1_G11_v01.xml', scene);
       
        this.previousPick = null;
        this.previousObj = null

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

                // this.previousObj.createAnimation(this.gameBoard.tiles[this.previousPick-1],this.gameBoard.tiles[customId-1])//creates animation of the piece. customId is the id of the tile
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


    display() 
    {
        this.gameBoard.display();
        this.scene.clearPickRegistration();
    }



}