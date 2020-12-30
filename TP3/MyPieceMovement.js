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
    }

    getPosition(time) {
        return [
            this.maxDesloc[0] * time / (this.dist / this.VELOCIDADE),
            this.maxDesloc[1] * time / (this.dist / this.VELOCIDADE)
        ]
    }

    startMovement(from, to) {
        this.toPosition = to;
        this.maxDesloc = [this.toPosition[0] - from[0], this.toPosition[1] - from[1]]
        this.dist = Math.sqrt((this.maxDesloc[0] * this.maxDesloc[0]) + (this.maxDesloc[1] * this.maxDesloc[1]))
        this.active = true;
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
                    this.position[2] += 0.5;
                    this.hookspendTime = this.spendTime;
                    break;
                case (Math.floor(this.position[0]) !== this.toPosition[0] && Math.floor(this.position[1]) !== this.toPosition[1]):
                    let pos = this.getPosition(this.spendTime - this.hookspendTime);
                    this.position[0] = pos[0]
                    this.position[1] = pos[1]
                    break;
                default:
                    this.position[2] -= 0.5;
                    if (this.position[2] <= 0) {
                        this.position = 0;
                        this.active = false
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