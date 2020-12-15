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
        
        // instantes iguais cuidado
        this.inicialTime = this.keyframes[0].instant;
        this.endTime = this.keyframes[this.keyframes.length-1].instant;
    }

    update(currentTime){
        super.update(currentTime);
        if(currentTime === 0) this.active = true;

        //check if the animation is active
        if(!this.active) return;

        // cicle
        if( this.inicialTime == 0) this.inicialTime = currentTime;
        else this.elapsedTime = currentTime-this.inicialTime ;

        if(this.elapsedTime >= this.endTime)
        {
            this.active = false;
            return;
        }

        //calculate current values for each transformation
        let previousKeyframe = this.keyframes[0];
        let nextKeyframe = this.keyframes[0];

    
        for(let i = 0; i < this.keyframes.length; i++)
        {
            // console.log("current time: "+ currentTime)
            // console.log("keyframe[i] instant: " + this.keyframes[i].instant)
            if(this.keyframes[i].instant == this.elapsedTime)
            {
                this.translation = this.keyframes[i].translation;
                this.rotation = this.keyframes[i].rotation;
                this.scale = this.keyframes[i].scale;
                return;
            }
            else if(this.keyframes[i].instant < this.elapsedTime)
            {
                previousKeyframe = this.keyframes[i];
                // console.log(previousKeyframe.instant)
            }
            else if(this.keyframes[i].instant > this.elapsedTime)
            {
                // console.log("elapsed time: "+ this.elapsedTime)
                // console.log(this.keyframes[i])  
                nextKeyframe = this.keyframes[i];
                break;
            }
        }
        
        // console.log("elapsed time: "+ this.elapsedTime)
        // console.log("previous: ")
        // console.log(previousKeyframe.instant)
        // console.log("next: ")
        // console.log(nextKeyframe.instant)

        //Interpolation Amount
        let t  = (this.elapsedTime - previousKeyframe.instant) / ( nextKeyframe.instant - previousKeyframe.instant);
        
        vec3.lerp(this.translation, previousKeyframe.translation, nextKeyframe.translation,t);
        vec3.lerp(this.rotation, previousKeyframe.rotation, nextKeyframe.rotation,t);
        vec3.lerp(this.scale, previousKeyframe.scale, nextKeyframe.scale,t);
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