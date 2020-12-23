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
    constructor(scene) {
        this.scene = scene;
        this.tiles = [];
        this.tileTexture = new CGFtexture(this.scene, "./scenes/images/tile.png");
        this.fillBoard();
    }

    fillBoard() {
        for (let i = 0; i < 7; i++) // 7 linhas
            for (let j = 0; j < 6; j++) // 6 colunas
                if (i % 2) // linha impar
                    this.tiles.push(
                        new MyTile(this.scene, [j * 2 - 1, i * 1.5, 0], this.tileTexture)
                    )
                else
                    this.tiles.push(
                        new MyTile(this.scene, [j * 2, i * 1.5, 0], this.tileTexture)
                    )
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(2 - ((13) / 2), -1.5 * 3, 0);
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].display();
        }
        this.scene.popMatrix();
    }
}