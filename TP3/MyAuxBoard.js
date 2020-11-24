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
    constructor(scene) 
    {
        this.scene = scene;
        this.pieces = [];
        this.npieces = this.pieces.length;
        this.tiles = [];
        
        this.texture = new CGFtexture(this.scene, "./scenes/images/demoTexture.png");
        this.board = new MyRectangle(scene,0,0,50,50);
    }

    fillBoard()
    {
        
    }

    display()
    {
        this.texture.bind();
        this.board.display();
    }
}