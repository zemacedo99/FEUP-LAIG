class MyPieceMovement {
    constructor(scene, piece) {
        this.scene = scene;
        this.piece = piece;
        this.position = [0, 0, 0]

        this.active = false;
        this.startTime = null;
        this.spendTime = 0;
    }

    startMovement(from, to) {
        this.fromPosition = from;
        //this.position[0] = from[0]
        //this.position[1] = from[1]
        //this.position[2] = from[2]
        this.toPosition = to;
        this.active = true;
    }

    update(t) {
        let time = t / 1000; // time in seconds
        if (this.active === false)
            this.startTime = time; // always updating
        else
            this.spendTime = time - this.startTime;

        if (this.active === true) {
            switch (true) {
                case (this.spendTime < 2):
                    this.position[2] += 0.5;
                    break;
                case (this.spendTime < 4):
                    console.log("MENOS QUE 4")
                    break;
                case (this.spendTime < 6):
                    this.position[2] -= 0.5;
                    if(this.position[2] <= 0){
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