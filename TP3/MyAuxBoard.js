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
    constructor(scene, pieceColor, pieceStructure ,tileTexture, id) {
        this.scene = scene;
        this.id = id;
        this.pieceColor = pieceColor;
        this.pieceStructure = pieceStructure;
        this.tiles = [];
        this.tileTexture = tileTexture;
        this.translate = [2 - ((13) / 2), -1.5 * 3, 0]
        this.fillBoard();
    }

    update(time) {
        for (let tile of this.tiles)
            tile.update(time);
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

                let tempPiece = new MyPiece(this.scene, tempTile.id, this.pieceColor, "", this.pieceStructure);
                tempTile.setPiece(tempPiece);
                this.tiles.push(tempTile);
                this.id++;
            }
        for (let tile of this.tiles) {
            tile.position[0] += this.translate[0];
            tile.position[1] += this.translate[1];
            tile.position[2] += this.translate[2];
        }
    }

    display() {
        this.scene.pushMatrix();
        for (let i = 0; i < this.tiles.length; i++) {
            this.scene.registerForPick(this.tiles[i].id, this.tiles[i]);
            this.tiles[i].display();
            this.scene.clearPickRegistration();
        }
        this.scene.popMatrix();
    }
}