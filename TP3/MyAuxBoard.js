/**
 * MyAuxBoard
 * holds pieces before entering the main board
 * @constructor
 * @param npieces - number of pieces
 * @param pieces - pieces of auxiliar board
 * @param tiles - tiles of auxiliar board
 * @param board - the board form
 */
class MyAuxBoard {
    constructor(scene, pieceColor, id) {
        this.scene = scene;
        this.id = id;
        this.pieceColor = pieceColor;
        this.tiles = [];
        this.tileTexture = new CGFtexture(this.scene, "./scenes/images/tile.png");
        this.fillBoard();
    }

    fillBoard() {
        let tempTile;
        for (let i = 0; i < 7; i++) // 7 linhas
            for (let j = 0; j < 6; j++) // 6 colunas
            {
                if (i % 2) // linha impar
                {
                    tempTile = new MyTile(this.scene, this.id, [j * 2 - 1, i * 1.5, 0], this.tileTexture);
                } else {
                    tempTile = new MyTile(this.scene, this.id, [j * 2, i * 1.5, 0], this.tileTexture);
                }

                let tempPiece = new MyPiece(this.scene, tempTile.id, this.pieceColor, "");
                tempTile.setPiece(tempPiece);
                this.tiles.push(tempTile);
                this.id++;
            }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(2 - ((13) / 2), -1.5 * 3, 0);
        for (let i = 0; i < this.tiles.length; i++) {
            this.scene.registerForPick(this.tiles[i].id, this.tiles[i]);
            this.tiles[i].display();
            this.scene.clearPickRegistration();
        }
        this.scene.popMatrix();
    }
}