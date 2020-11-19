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

        this.active = true;
        this.inicialTime = 0;
        this.elapsedTime;
        this.p;
    }

    update(currentTime) 
    {
        super.update(currentTime);
        //check if the animation is active
        if(!this.active)
        {
            return;
        }

        if( this.inicialTime == 0)
        {
            this.inicialTime = currentTime;
        }
        else
        {
            //calculate animation's elapsedTime
            this.elapsedTime = currentTime-this.inicialTime ;
        }

        if(this.elapsedTime >= this.duration)
        {
            this.active = false;
            return;
        }

        
        
        this.frameTime = this.duration / (this.endCell - this.startCell) // duration / n of frames to display
        this.frameIndex = Math.floor(currentTime % this.duration)        // index of the current frame 


        if(this.frameTime < 1)
        {
            this.p = Math.floor(this.frameIndex);           // position of the frame
        }
        else
        {
            this.p = Math.floor(this.frameIndex / this.frameTime);           // position of the frame
        }
        

        console.log(this.p)
        if(this.startTime != 0)
        {
            this.p = this.p + this.startCell;
        }
    }
    display()
    {
        this.spritesheet.activateShader();
        this.scene.pushMatrix();
            this.spritesheet.activateCellP(this.p);
            this.retangle.display();
        this.scene.popMatrix();

        this.scene.setActiveShaderSimple(this.scene.defaultShader); 
    }
}