/**
 * GameOrchestrator
 * @constructor
 * @param scene - Reference to MyScene object
 */

class GameOrchestrator {
    constructor(scene) {
        this.scene = scene;
        this.previousPick = null;
        this.previousObj = null;

        this.prolog = new MyProlog(this);
        this.response = null;

        this.gameBoard = null;
        this.auxBoard = [];
        this.gameMoves = [];
    }

    update(time) {
        if (this.gameBoard !== null) {
            this.gameBoard.update(time);
        }
        for (let auxB of this.auxBoard) {
            auxB.update(time);
        }
    }

    initBoards() {
        this.gameBoard = new MyMainBoard(this.scene, this.theme);
        let curr_id = this.gameBoard.tiles.length
        this.auxBoard.push(
            new MyAuxBoard(this.scene, this.theme.materials['greenPiece'], this.theme.pieces['greenPiece'], this.theme.textures['tileGreenAuxBoard'], curr_id + 1)
        );
        curr_id += this.auxBoard[0].tiles.length;
        this.auxBoard.push(
            new MyAuxBoard(this.scene, this.theme.materials['purplePiece'], this.theme.pieces['purplePiece'], this.theme.textures['tilePurpleAuxBoard'], curr_id + 1)
        );
        curr_id += this.auxBoard[1].tiles.length;
        this.auxBoard.push(
            new MyAuxBoard(this.scene, this.theme.materials['orangePiece'], this.theme.pieces['orangePiece'], this.theme.textures['tileOrangeAuxBoard'], curr_id + 1)
        );

        let matrixRotation2d = function (angle) {
            return [[Math.cos(angle), -Math.sin(angle)], [Math.sin(angle), Math.cos(angle)]]
        }

        let coordsRotation = function (oldCoords, angle) {
            let rotationMatrix = matrixRotation2d(angle);
            return [
                oldCoords[0] * rotationMatrix[0][0] + oldCoords[1] * rotationMatrix[0][1],
                oldCoords[0] * rotationMatrix[1][0] + oldCoords[1] * rotationMatrix[1][1]
            ]
        }

        let positionAuxBoards = {
            0: {
                translate: [0, 16, 0],
                rotate: 0
            },
            1: {
                translate: [14, -10, 0],
                rotate: Math.PI / 3
            },
            2: {
                translate: [-14, -10, 0],
                rotate: -Math.PI / 3
            },
        }

        for (let key in this.auxBoard) {
            for (let tile of this.auxBoard[key].tiles) {
                let pos = coordsRotation(tile.position, positionAuxBoards[key].rotate);
                tile.position[0] = pos[0];
                tile.position[1] = pos[1];
                tile.position[0] += positionAuxBoards[key].translate[0]
                tile.position[1] += positionAuxBoards[key].translate[1]
                tile.position[2] += positionAuxBoards[key].translate[2]
            }
        }
    }

    setTheme(theme) {
        this.theme = theme;
        this.initBoards();
    }

    // changeMode(mode){

    // }


    saveMovement(piece){
        this.gameMoves.push(piece);
    }   


    undo() {
        console.log("UNDO")
        // console.log(this.gameMoves);
        if(this.gameMoves.length != 0){
            let i = this.gameMoves.length -1;   // last piece moved
            
            // this.gameMoves[i].pieceMovement.startMovement(this.gameMoves[i].pieceMovement.totile, this.gameMoves[i].pieceMovement.mytile);

            this.gameBoard.tiles[this.gameMoves[i].pieceMovement.totile.id].setPiece(null);
            // this.auxBoard.tiles[this.gameMoves[i].id].setPiece(this.gameMoves[i]);

            console.log(this.auxBoard.tiles[this.gameMoves[i].id])
            // console.log(this.gameBoard.tiles[this.gameMoves[i].pieceMovement.totile.id])
    
            // this.gameMoves[i].pick();

            this.gameMoves.pop();
        }
    }


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

        if (obj instanceof MyTile) 
        {
            if (!obj.isPicked() && this.previousPick == null) // first object
            {
                console.log("You select tile w/ id "+ (customId - 1)+ " Please, select a piece");
            } 
            else if (!obj.isPicked() && obj.getPiece() === null) { //second object, move the piece to the tile destination (current obj)
                let fromBoard;
                let maxIdBoard = this.gameBoard.tiles.length;
                if (this.previousPick <= maxIdBoard) {
                    fromBoard = this.gameBoard;
                    console.log("Main BOARD")
                } else if (this.previousPick < this.auxBoard[0].id) { // termina em id++
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

                if (this.gameBoard.tiles[customId - 1] !== undefined) {
                    obj.pick();

                    
                    for(let r = 0; r < this.gameBoard.board.length; r++)
                    {
                        for(let c = 0; c < this.gameBoard.board[r].length ;c++)
                        {
                            if (this.gameBoard.board[r][c] == obj)
                            {
                                let RowIndex = r;
                                let SpaceIndex = c;
                                let Space = "'X'";
                                let Player = 1;
                                let Mode = 1;
                            
                                this.prolog.validMove(RowIndex, SpaceIndex, this.gameBoard.board, Space , Player, Mode)
                            }
                        }
                    }

                    // console.log(this.response)
                    fromBoard.tiles[this.previousPick - 1].startMovement(this.gameBoard.tiles[customId - 1])//creates animation of the piece. customId is the id of the tile
                    this.saveMovement(this.previousObj);
                    console.log(this.gameMoves);
                    this.previousPick = null;
                    this.response = null;
                }

            } 
            else 
            { // reset
                if (obj.isPicked()) obj.pick(); // effect of unpick
                this.previousObj = null;
                this.previousPick = null;
            }
        } 
        else if (obj instanceof MyPiece) 
        {

            if (!obj.isPicked() && this.previousPick == null) // first object, select piece
            {
                this.previousPick = customId;
                this.previousObj = obj;
                obj.pick();
                console.log("Piece has been picked:");
                console.log(obj);
            } 
            else 
            { // reset
                if (obj.isPicked()) 
                {
                    obj.pick(); //effect of unpick
                    console.log("Piece has been unpicked.");
                    this.previousObj = null;
                    this.previousPick = null;
                }
                else
                {
                    console.log("Please select a Tile, or select your already chosen piece");
                }
            }

        } 
        else
        {
            console.log("error selection object");
        }
    }

    display() {

        if(this.scene.startGame)
        {        
            this.scene.pushMatrix();
            for (let key in this.auxBoard) {
                this.auxBoard[key].display();
            }
            if (this.gameBoard !== null)
                this.gameBoard.display();
            this.scene.popMatrix();
            this.scene.clearPickRegistration();
        }
    }


}