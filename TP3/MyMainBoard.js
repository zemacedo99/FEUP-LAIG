class MyMainBoard {
    constructor(scene)
    {
        this.scene = scene;
        this.pieces = [];
        this.tiles = [];

        this.tileTexture = new CGFtexture(this.scene, "./scenes/images/tile.png");
    
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

        this.fillBoard();
    }

    fillBoard(){
        // let tile = new MyTile(this.scene,[0,0,0]);
        // this.tiles.push(tile);

        for( let c = 0; c<5 ;c++)
        {
            this.row0[c] = new MyTile(this.scene,[(c*2),0,0],this.tileTexture);
            this.row12[c] = new MyTile(this.scene,[(c*2),-18,0],this.tileTexture);
            this.tiles.push(this.row0[c]);
            this.tiles.push(this.row12[c]);
        }

        for( let c = 0; c<8 ;c++)
        {
            this.row1[c] = new MyTile(this.scene,[ -3 + (c*2)  ,-1.5,0],this.tileTexture);
            this.row11[c] = new MyTile(this.scene,[ -3 + (c*2)  ,-1.5*11,0],this.tileTexture);
            this.tiles.push(this.row1[c]);
            this.tiles.push(this.row11[c]);
        }

        for( let c = 0; c<9 ;c++)
        {
            this.row2[c] = new MyTile(this.scene,[ -4 + (c*2)  ,-3,0],this.tileTexture);
            this.row10[c] = new MyTile(this.scene,[ -4 + (c*2)  ,-1.5*10,0],this.tileTexture);
            this.tiles.push(this.row2[c]);
            this.tiles.push(this.row10[c]);
        }

        for( let c = 0; c<10 ;c++)
        {
            this.row3[c] = new MyTile(this.scene,[ -5 + (c*2)  ,-4.5,0],this.tileTexture);
            this.row9[c] = new MyTile(this.scene,[ -5 + (c*2)  ,-1.5*9,0],this.tileTexture);
            this.tiles.push(this.row3[c]);
            this.tiles.push(this.row9[c]);
        }

        for( let c = 0; c<11 ;c++)
        {
            this.row4[c] = new MyTile(this.scene,[ -6 + (c*2)  ,-6,0],this.tileTexture);
            this.row6[c] = new MyTile(this.scene,[ -6 + (c*2)  ,-1.5*6,0],this.tileTexture);
            this.row8[c] = new MyTile(this.scene,[ -6 + (c*2)  ,-1.5*8,0],this.tileTexture);
            this.tiles.push(this.row4[c]);
            this.tiles.push(this.row6[c]);
            this.tiles.push(this.row8[c]);
        }

        for( let c = 0; c<12 ;c++)
        {
            this.row5[c] = new MyTile(this.scene,[ -7 + (c*2)  ,-7.5,0],this.tileTexture);
            this.row7[c] = new MyTile(this.scene,[ -7 + (c*2)  ,-1.5*7,0],this.tileTexture);
            this.tiles.push(this.row5[c]);
            this.tiles.push(this.row7[c]);
        }

        // console.log(this.board)
   

    }

    display()
    {
        for (var i = 0; i < this.tiles.length; i++){
            this.tiles[i].display();
        }
    }
    
}