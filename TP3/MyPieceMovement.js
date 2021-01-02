class MyPieceMovement {

    VELOCIDADE = 4.0

    constructor(scene, piece) {
        this.scene = scene;
        this.piece = piece;
        this.maxDesloc = [0, 0]
        this.dist = 0;

        this.position = [0, 0, 0]
        this.active = false;
        this.startTime = null;
        this.spendTime = 0;
        this.hookspendTime = 0;
        this.mytile = null;
    }

    getPosition(time) {
        return [
            this.maxDesloc[0] * time / (this.dist / this.VELOCIDADE),
            this.maxDesloc[1] * time / (this.dist / this.VELOCIDADE)
        ]
    }

    startMovement(fromTile, toTile) {
        this.toPosition = toTile.position;
        this.mytile = fromTile;
        this.totile = toTile;
        let from = fromTile.position;
        //this.position = Object.values(Object.assign(Object.create(Object.getPrototypeOf(from)), from))
        this.maxDesloc = [this.toPosition[0] - from[0], this.toPosition[1] - from[1]]
        this.dist = Math.sqrt((this.maxDesloc[0] * this.maxDesloc[0]) + (this.maxDesloc[1] * this.maxDesloc[1]))
        this.active = true;
        console.log(from)
        console.log(toTile.position)
        console.log(this.maxDesloc)
    }

    update(t) {
        let time = t / 1000; // time in seconds
        if (this.active === false)
            this.startTime = time; // always updating
        else{
            if(this.startTime === null) this.startTime = time
            this.spendTime = time - this.startTime;
        }
        if (this.active === true) {
            switch (true) {
                case (this.spendTime < 2.0):
                    this.position[2] += 0.1;
                    this.hookspendTime = this.spendTime;
                    break;
                case (this.spendTime < 22 // not higher than 20s
                    && !( // nao é maior que o maximo desloc em X
                        (this.maxDesloc[0] > 0 &&  this.position[0] > this.maxDesloc[0])
                        || (this.maxDesloc[0] < 0 &&  this.position[0] < this.maxDesloc[0])
                    )
                    && !( // nao é maior que o maximo desloc em y
                        (this.maxDesloc[1] > 0 &&  this.position[1] > this.maxDesloc[1])
                        || (this.maxDesloc[1] < 0 &&  this.position[1] < this.maxDesloc[1])
                    )
                ):

                    console.log("("+ Math.round(this.position[0]*10)/10 + ", " + Math.round(this.position[1]*10)/10 + ") != ("+Math.round(this.maxDesloc[0]*10)/10+ ", " + Math.round(this.maxDesloc[1]*10)/10 + ")")
                    let pos = this.getPosition(this.spendTime - this.hookspendTime);
                    this.position[0] = pos[0]
                    this.position[1] = pos[1]
                    break;
                default:
                    this.position[2] -= 0.1;
                    if (this.position[2] <= 0) {
                        this.position = 0;
                        this.mytile.setPiece(null)
                        this.totile.getPiece().waitingMovement = false;
                        this.active = false;
                    }
                    break;
            }
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.piece.display();
        this.scene.popMatrix();
    }
}