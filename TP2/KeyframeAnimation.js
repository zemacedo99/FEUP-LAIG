class KeyframeAnimation extends Animation {
    constructor(scene,animationId){
        super(scene,animationId);

        this.keyframes = [];

        this.inicialTime = 0;
        this.endTime;
        this.elapsedTime;

        this.translation = vec3.create();
        this.rotation = vec3.create();
        this.scale = vec3.fromValues(1,1,1);
  
        this.active = true;
    }

    addKeyframe(keyFrame){
        this.keyframes.push(keyFrame);
        this.keyframes.sort(
            function(x, y){
                return x.instant - y.instant
            }
        );
        
        this.inicialTime = this.keyframes[0].instant;
        this.endTime = this.keyframes[this.keyframes.length-1].instant;
    }

    update(currentTime){
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
            this.elapsedTime = (currentTime-this.inicialTime) / 1000 ;  //ms
        }


        if(this.elapsedTime >= this.endTime)
        {
            this.active = false;
        }

        //calculate current values for each transformation
        
        for(let i = 0; i < this.keyframes.length; i++)
        {
            let previousKeyframe,nextKeyframe;
            if(this.keyframes[i].instant == this.currentTime )
            {
                this.translation = this.keyframes[i].translation;
                this.rotation = this.keyframes[i].rotation;
                this.scale = this.keyframes[i].scale;
            }
            else if(this.keyframes[i].instant < this.elapsedTime)
            {
                previousKeyframe = this.keyframes[i];
            }
            else if(this.keyframes[i].instant > this.elapsedTime)
            {
                nextKeyframe = this.keyframes[i];
            }
        }

        //Interpolation Amount
        let t  = (this.elapsedTime - previousKeyframe.instant) / (nextKeyframe.instant-previousKeyframe.instant);

        vec3.lerp(this.translation,this.previousKeyframe.translation, this.nextKeyframe.translation,t);
        vec3.lerp(this.rotation,this.previousKeyframe.rotation, this.nextKeyframe.rotation,t);
        vec3.lerp(this.scale,this.previousKeyframe.scale, this.nextKeyframe.scale,t);
    }

    apply()
    {
        this.scene.translate(this.translation[0],this.translation[1],this.translation[2]);
        this.scene.rotate(this.rotation[0],1,0,0); //x
        this.scene.rotate(this.rotation[1],0,1,0); //y
        this.scene.rotate(this.rotation[2],0,0,1); //z
        this.scene.scale(this.scale[0],this.scale[1],this.scale[2]); 

    }
    
}