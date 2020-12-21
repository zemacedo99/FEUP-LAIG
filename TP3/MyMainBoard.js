class MyMainBoard {
    constructor(scene)
    {
        this.scene = scene;
        this.pieces = [];
        this.tiles = [];

        this.fillBoard();
    }

    fillBoard(){
        let tile0 = new MyTile(this.scene);
        this.tiles.push(tile0);

        
    }

    display()
    {
        for (var i = 0; i < this.tiles.length; i++){
            this.tiles[i].display();
        }
    }
    
}