class MySpriteAnimation extends Animation  {
    constructor(scene,ssid,startCell,endCell,duration){
        super(scene);
        this.ssid = ssid;
        this.startCell = startCell;
        this.endCell = endCell;
        this.duration = duration;

        this.retangle = new MyRectangle(scene,0,0,1,1);


        this.spritesheet = this.scene.graph.spritesheets[ssid];
        this.frameIndex;
        this.frameTime;

        this.inicialTime = 0;
        this.elapsedTime;
        this.p;
    }

    update(currentTime) 
    {
        super.update(currentTime);
        this.lastTime = currentTime;

        this.frameInstant = this.lastTime % this.duration                    // index of the current frame 
        this.frameTime = this.duration / (this.endCell - this.startCell + 1) // duration / n of frames to display


        this.p = Math.floor(this.frameInstant / this.frameTime);             // position of the frame

        if(this.startTime != 0)
        {
            this.p = this.p + this.startCell;
        }
    }

    display()
    {
        this.scene.gl.enable(this.scene.gl.BLEND); // enables blending
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);// defines the blending function

        this.spritesheet.activateShader();
        this.scene.pushMatrix();
        this.spritesheet.activateCellP(this.p);
        this.retangle.display();
        this.scene.popMatrix();
        
        this.scene.setActiveShaderSimple(this.scene.defaultShader); 
        
        this.scene.gl.disable(this.scene.gl.BLEND);        // disables blending
    }
}