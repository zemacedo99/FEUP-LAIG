class KeyframeAnimation extends Animation {
    constructor(scene,animationId){
        super(scene,animationId);

        this.keyframes = [];

        this.inicialTime = 0;
        this.endTime;
        this.elapsedTime;

  
    }

    addKeyFrame(keyFrame){
        this.keyframes.push(keyFrame);

        // this.keyframes.sort(function(x, y){return x.instant - y.instant});
        
        // this.inicialTime = this.keyframes[0].instant;
        // this.endTime = this.keyframes[this.keyframes.length-1].instant;
    }

    update(currentTime){
        super.update(currentTime);

        if( this.inicialTime == 0)
        {
            this.inicialTime = currentTime;
        }
        else
        {
            this.elapsedTime = (currentTime-this.inicialTime) / 1000 ;  //ms
        }

    }
}