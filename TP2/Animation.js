class Animation {
	constructor(timeStart,timeEnd,transformationStart,transformationEnd) {
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.transformationStart = transformationStart;
        this.transformationEnd = transformationEnd;
        
	}
    
  update(deltaTime) {
    this.timeStart += deltaTime;
		return 0;
  }
    
  apply() {
    return 0;
  }
}
