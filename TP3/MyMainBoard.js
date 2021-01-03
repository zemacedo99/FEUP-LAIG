class MyMainBoard {
    constructor(scene, theme) {
        this.scene = scene;
        this.tiles = [];
        this.translate = [-4, 1.5 * 6, 0]
        this.row0 = [];
        this.row1 = [];
        this.row2 = [];
        this.row3 = [];
        this.row4 = [];
        this.row5 = [];
        this.row6 = [];
        this.row7 = [];
        this.row8 = [];
        this.row9 = [];
        this.row10 = [];
        this.row11= [];
        this.row12 = [];
        this.board = [  this.row0,
                        this.row1,
                        this.row2,
                        this.row3,
                        this.row4,
                        this.row5,
                        this.row6,
                        this.row7,
                        this.row8,
                        this.row9,
                        this.row10,
                        this.row11,
                        this.row12];
        this.theme = theme;
        this.tileTexture = this.theme.textures['tileMainBoard'];
        this.fillBoard();
    }

    update(time) {
        for (let tile of this.tiles)
            tile.update(time);
    }

    fillBoard() {
        let id = 1;
        // for (let c = 0; c < 5; c++) {
        //     this.tiles.push(new MyTile(this.scene, id, [(c * 2), 0, 0], this.tileTexture));
        //     id++;
        //     this.tiles.push(new MyTile(this.scene, id, [(c * 2), -18, 0], this.tileTexture));
        //     id++;
        // }

        // for (let c = 0; c < 8; c++) {
        //     this.tiles.push(new MyTile(this.scene, id, [-3 + (c * 2), -1.5, 0], this.tileTexture));
        //     id++;
        //     this.tiles.push(new MyTile(this.scene, id, [-3 + (c * 2), -1.5 * 11, 0], this.tileTexture));
        //     id++;
        // }

        // for (let c = 0; c < 9; c++) {
        //     this.tiles.push(new MyTile(this.scene, id, [-4 + (c * 2), -3, 0], this.tileTexture));
        //     id++;
        //     this.tiles.push(new MyTile(this.scene, id, [-4 + (c * 2), -1.5 * 10, 0], this.tileTexture));
        //     id++;
        // }

        // for (let c = 0; c < 10; c++) {
        //     this.tiles.push(new MyTile(this.scene, id, [-5 + (c * 2), -4.5, 0], this.tileTexture));
        //     id++;
        //     this.tiles.push(new MyTile(this.scene, id, [-5 + (c * 2), -1.5 * 9, 0], this.tileTexture));
        //     id++;
        // }

        // for (let c = 0; c < 11; c++) {
        //     this.tiles.push(new MyTile(this.scene, id, [-6 + (c * 2), -6, 0], this.tileTexture));
        //     id++;
        //     this.tiles.push(new MyTile(this.scene, id, [-6 + (c * 2), -1.5 * 6, 0], this.tileTexture));
        //     id++;
        //     this.tiles.push(new MyTile(this.scene, id, [-6 + (c * 2), -1.5 * 8, 0], this.tileTexture));
        //     id++;
        // }

        // for (let c = 0; c < 12; c++) {
        //     this.tiles.push(new MyTile(this.scene, id, [-7 + (c * 2), -7.5, 0], this.tileTexture));
        //     id++;
        //     this.tiles.push(new MyTile(this.scene, id, [-7 + (c * 2), -1.5 * 7, 0], this.tileTexture));
        //     id++;
        // }

        for( let c = 0; c<5 ;c++)
        {
            this.row0[c] = new MyTile(this.scene, id, [(c * 2), 0, 0], this.tileTexture); id++;
            this.row12[c] = new MyTile(this.scene, id, [(c * 2), -18, 0], this.tileTexture); id++;
            this.tiles.push(this.row0[c]);
            this.tiles.push(this.row12[c]);
        }

        for( let c = 0; c<8 ;c++)
        {
            this.row1[c] = new MyTile(this.scene, id, [-3 + (c * 2), -1.5, 0], this.tileTexture); id++;
            this.row11[c] = new MyTile(this.scene, id, [-3 + (c * 2), -1.5 * 11, 0], this.tileTexture); id++;
            this.tiles.push(this.row1[c]);
            this.tiles.push(this.row11[c]);
        }

        for( let c = 0; c<9 ;c++)
        {
            this.row2[c] = new MyTile(this.scene, id, [-4 + (c * 2), -3, 0], this.tileTexture); id++;
            this.row10[c] = new MyTile(this.scene,id, [ -4 + (c*2)  ,-1.5*10,0], this.tileTexture); id++;
            this.tiles.push(this.row2[c]);
            this.tiles.push(this.row10[c]);
        }

        for( let c = 0; c<10 ;c++)
        {
            this.row3[c] = new MyTile(this.scene,id, [ -5 + (c*2)  ,-4.5,0],this.tileTexture); id++;
            this.row9[c] = new MyTile(this.scene,id, [ -5 + (c*2)  ,-1.5*9,0],this.tileTexture); id++;
            this.tiles.push(this.row3[c]);
            this.tiles.push(this.row9[c]);
        }

        for( let c = 0; c<11 ;c++)
        {
            this.row4[c] = new MyTile(this.scene,id,[ -6 + (c*2)  ,-6,0],this.tileTexture); id++;
            this.row6[c] = new MyTile(this.scene,id,[ -6 + (c*2)  ,-1.5*6,0],this.tileTexture); id++;
            this.row8[c] = new MyTile(this.scene,id,[ -6 + (c*2)  ,-1.5*8,0],this.tileTexture); id++;
            this.tiles.push(this.row4[c]);
            this.tiles.push(this.row6[c]);
            this.tiles.push(this.row8[c]);
        }

        for( let c = 0; c<12 ;c++)
        {
            this.row5[c] = new MyTile(this.scene,id,[ -7 + (c*2)  ,-7.5,0],this.tileTexture); id++;
            this.row7[c] = new MyTile(this.scene,id,[ -7 + (c*2)  ,-1.5*7,0],this.tileTexture); id++;
            this.tiles.push(this.row5[c]);
            this.tiles.push(this.row7[c]);
        }

        // console.log(this.board)
        

        for (let tile of this.tiles) {
            tile.position[0] += this.translate[0];
            tile.position[1] += this.translate[1];
            tile.position[2] += this.translate[2];
        }
    }

    display() {
        this.scene.pushMatrix();
        for (var i = 0; i < this.tiles.length; i++) {
            //Id for pickable objects must be >= 1
            this.scene.registerForPick(i + 1, this.tiles[i]);
            this.tiles[i].display();
            this.scene.clearPickRegistration();
        }
        this.scene.popMatrix();
    }

}