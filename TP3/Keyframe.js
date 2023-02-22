class Keyframe {
    constructor(instant,translation,rotationX, rotationY, rotationZ,scale){
        this.instant = instant;
        this.translation = translation;
        this.rotation = new vec3.fromValues(rotationX,rotationY,rotationZ);
        this.scale = scale;          
    }
}