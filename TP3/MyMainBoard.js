class MyMainBoard {
    constructor(scene) {
        this.scene = scene;
        this.tiles = [];

        this.tileTexture = new CGFtexture(this.scene, "./scenes/images/tile.png");


        this.fillBoard();
    }

    fillBoard() {

        for (let c = 0; c < 5; c++) {
            this.tiles.push(new MyTile(this.scene, [(c * 2), 0, 0],this.tileTexture));
            this.tiles.push(new MyTile(this.scene, [(c * 2), -18, 0],this.tileTexture));
        }

        for (let c = 0; c < 8; c++) {
            this.tiles.push(new MyTile(this.scene, [-3 + (c * 2), -1.5, 0],this.tileTexture));
            this.tiles.push(new MyTile(this.scene, [-3 + (c * 2), -1.5 * 11, 0],this.tileTexture));
        }

        for (let c = 0; c < 9; c++) {
            this.tiles.push(new MyTile(this.scene, [-4 + (c * 2), -3, 0],this.tileTexture));
            this.tiles.push(new MyTile(this.scene, [-4 + (c * 2), -1.5 * 10, 0],this.tileTexture));
        }

        for (let c = 0; c < 10; c++) {
            this.tiles.push(new MyTile(this.scene, [-5 + (c * 2), -4.5, 0],this.tileTexture));
            this.tiles.push(new MyTile(this.scene, [-5 + (c * 2), -1.5 * 9, 0],this.tileTexture));
        }

        for (let c = 0; c < 11; c++) {
            this.tiles.push(new MyTile(this.scene, [-6 + (c * 2), -6, 0],this.tileTexture));
            this.tiles.push(new MyTile(this.scene, [-6 + (c * 2), -1.5 * 6, 0],this.tileTexture));
            this.tiles.push(new MyTile(this.scene, [-6 + (c * 2), -1.5 * 8, 0],this.tileTexture));
        }

        for (let c = 0; c < 12; c++) {
            this.tiles.push(new MyTile(this.scene, [-7 + (c * 2), -7.5, 0],this.tileTexture));
            this.tiles.push(new MyTile(this.scene, [-7 + (c * 2), -1.5 * 7, 0],this.tileTexture));
        }
    }

    display() {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].display();
        }
    }

}